import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  Alert,
  Share,
  Pressable,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import QUESTIONS from '../questions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pauseIcon = require('../assets/pause.png');
const saveIcon = require('../assets/saved.png'); // Иконка для сохранения
const shareIcon = require('../assets/share.png');  // Иконка для шаринга

// Отдельный компонент таймера
const Timer = ({ initialTime, onTimeUp }) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [onTimeUp, initialTime]);

  return <Text style={styles.timeText}>{time}</Text>;
};

const GameQuiz = ({ route, navigation }) => {
  const { categories, players, questionsPerPlayer, mode } = route.params || {};
  // Состояние для сохранённых вопросов (здесь только для демонстрации)
  const [savedQuestions, setSavedQuestions] = useState([]);

  // Вычисляем итоговый массив вопросов один раз
  const finalQuestions = useMemo(() => {
    let questions = [];
    if (categories.length > 1) {
      const questionsPerCategory = 4;
      categories.forEach((cat) => {
        const catQuestions = QUESTIONS.filter(
          (q) => q.category.toLowerCase() === cat.toLowerCase()
        );
        questions = questions.concat(catQuestions.slice(0, questionsPerCategory));
      });
    } else {
      const filteredQuestions = QUESTIONS.filter((q) =>
        categories.includes(q.category.toLowerCase())
      );
      if (mode === 'group') {
        questions = filteredQuestions.slice(0, Math.max(players.length * questionsPerPlayer, 4));
      } else {
        questions = filteredQuestions.slice(0, Math.max(questionsPerPlayer, 4));
      }
    }
    return questions.sort(() => Math.random() - 0.5);
  }, [categories, players, questionsPerPlayer, mode]);

  // ==== State ====
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [pauseModalVisible, setPauseModalVisible] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = finalQuestions[questionIndex];
  let currentPlayerName = players[questionIndex % players.length];

  useEffect(() => {
    setSelectedOptionIndex(null);
  }, [questionIndex]);

  const handleTimeUp = () => {
    setShowAnswers(true);
  };

  const handlePause = () => {
    setPauseModalVisible(true);
  };

  const resumeCountdown = () => {
    setPauseModalVisible(false);
  };

  const handleExit = () => {
    setPauseModalVisible(false);
    navigation.goBack();
  };

  const handleFinishEarly = () => {
    setShowAnswers(true);
  };

  // Обработчик для кнопки Save: сохраняем вопрос, если его ещё нет, и показываем уведомление.
  const handleSave = async () => {
    try {
      // Получаем существующие сохранённые вопросы из AsyncStorage
      const stored = await AsyncStorage.getItem('savedQuestions');
      const savedList = stored ? JSON.parse(stored) : [];
  
      if (!savedList.find((q) => q.id === currentQuestion.id)) {
        const newSaved = [...savedList, currentQuestion];
        await AsyncStorage.setItem('savedQuestions', JSON.stringify(newSaved));
        Alert.alert('Saved', 'Question saved for later!');
      } else {
        Alert.alert('Notice', 'This question is already saved.');
      }
    } catch (error) {
      console.log('Error saving question: ', error);
      Alert.alert('Error', 'Could not save question.');
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: `${currentQuestion.title}\n\n${currentQuestion.scenario}\n\nCategory: ${currentQuestion.category}\nYear: ${currentQuestion.year}`,
      });
      if (result.action === Share.sharedAction) {
        // Пользователь поделился вопросом
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleOptionSelect = index => {
    setSelectedOptionIndex(index);
  };

  const handleNextPress = () => {
    if (selectedOptionIndex === null) return;
    const chosenOption = currentQuestion.options[selectedOptionIndex];
    const isCorrect = chosenOption?.recommended;
    const newAnswer = {
      player: currentPlayerName,
      category: currentQuestion.category,
      questionTitle: currentQuestion.title,
      chosenOption: chosenOption?.text || '',
      chosenPercent: isCorrect ? 100 : (chosenOption?.popularity || 0),
    };
    setAnswers(prev => [...prev, newAnswer]);

    const nextIndex = questionIndex + 1;
    if (nextIndex >= finalQuestions.length) {
      navigation.navigate('Results', { answers, players });
    } else {
      setQuestionIndex(nextIndex);
    }
  };

  if (!finalQuestions.length) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestions}>
          No questions found. Not enough questions in chosen categories.
        </Text>
      </View>
    );
  }

  if (!currentQuestion) {
    return (
      <View style={styles.container}>
        <Text style={styles.noQuestions}>Quiz finished!</Text>
      </View>
    );
  }

  // Определяем, сохранён ли уже текущий вопрос
  const isSaved = !!savedQuestions.find(q => q.id === currentQuestion.id);

  const categoryEmoji = {
    war: '⚔️',
    love: '💔',
    power: '👑',
    faith: '🪶',
    treason: '🐍',
  }[currentQuestion.category.toLowerCase()] || '❓';

  return (
    <View style={styles.container}>
      <Modal visible={pauseModalVisible} transparent={true} animationType="fade">
        <View style={styles.modalWrapper}>
          <BlurView
            style={StyleSheet.absoluteFill}
            blurType="dark"
            blurAmount={10}
            reducedTransparencyFallbackColor="rgba(0,0,0,0.6)"
          />
          <View style={styles.pauseAlert}>
            <Text style={styles.pauseTitle}>Pause</Text>
            <Text style={styles.pauseSubtitle}>
              You’ve paused your royal journey. You can resume or exit.
            </Text>
            <TouchableOpacity
              style={[styles.alertButton, styles.resumeButton]}
              onPress={resumeCountdown}
            >
              <Text style={[styles.alertButtonText, styles.resumeButtonText]}>
                Resume
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.alertButton, styles.exitButton]}
              onPress={handleExit}
            >
              <Text style={[styles.alertButtonText, styles.exitButtonText]}>
                Exit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Верхняя панель с кнопками */}
      <View style={styles.topPill}>
        <Timer initialTime={120} onTimeUp={handleTimeUp} key={questionIndex} />
        <Text style={styles.playerName}>{currentPlayerName}</Text>
        {mode === 'solo' ? (
          <View style={styles.actionButtons}>
            <Pressable
              style={({ pressed }) => [
                styles.actionButton,
                isSaved && styles.savedActive,
                pressed && styles.buttonPressed,
              ]}
              onPress={handleSave}
            >
              <Image source={saveIcon} style={styles.actionIcon} />
            </Pressable>
            <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
              <Image source={shareIcon} style={styles.actionIcon} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handlePause}>
              <Image source={pauseIcon} style={styles.pauseIcon} />
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            <Image source={pauseIcon} style={styles.pauseIcon} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView style={styles.scrollArea} contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={styles.questionNumber}>
          QUESTION {questionIndex + 1} / {finalQuestions.length}
        </Text>
        <Text style={styles.categoryLine}>
          {categoryEmoji} CATEGORY: {currentQuestion.category.toUpperCase()}
        </Text>
        <Text style={styles.questionTitle}>{currentQuestion.title}</Text>
        <Text style={styles.questionYear}>YEAR: {currentQuestion.year}</Text>
        <Text style={styles.questionScenario}>{currentQuestion.scenario}</Text>
        {!showAnswers && (
          <TouchableOpacity onPress={handleFinishEarly}>
            <Text style={styles.finishEarly}>TAP TO FINISH EARLY</Text>
          </TouchableOpacity>
        )}
        {showAnswers && (
          <View style={styles.answersBlock}>
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = idx === selectedOptionIndex;
              return (
                <TouchableOpacity
                  key={idx}
                  style={[styles.answerOption, isSelected && styles.answerOptionSelected]}
                  onPress={() => handleOptionSelect(idx)}
                >
                  <Text
                    style={[
                      styles.answerOptionText,
                      isSelected && styles.answerOptionSelectedText,
                    ]}
                  >
                    {opt.text}
                  </Text>
                </TouchableOpacity>
              );
            })}
            <TouchableOpacity
              style={[styles.nextButton, selectedOptionIndex === null && styles.nextButtonDisabled]}
              onPress={handleNextPress}
              disabled={selectedOptionIndex === null}
            >
              <Text style={styles.nextButtonText}>NEXT</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default GameQuiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27',
    paddingTop: 90,
    paddingHorizontal: 16,
  },
  noQuestions: {
    color: '#fff',
    fontSize: 18,
    marginTop: 50,
    textAlign: 'center',
  },
  topPill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2D2C30',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  timeText: {
    color: '#F7F0CE',
    fontSize: 16,
    fontWeight: '600',
  },
  playerName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: '#FCF9EA',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  // Этот стиль применяется, если кнопка Save нажата и вопрос сохранён
  savedActive: {
    backgroundColor: '#8DD37D',
  },
  // Стиль для состояния "pressed" кнопки
  buttonPressed: {
    opacity: 0.7,
  },
  actionIcon: {
    width: 20,
    height: 30,
    resizeMode: 'contain',
  },
  pauseButton: {
    backgroundColor: '#FCF9EA',
    borderRadius: 8,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  pauseIcon: {
    width: 30,
    height: 30,
    resizeMode: 'cover',
  },
  scrollArea: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  questionNumber: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
  },
  categoryLine: {
    color: '#F7F0CE',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  questionTitle: {
    color: '#F7F0CE',
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionYear: {
    color: '#F7F0CE',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 12,
  },
  questionScenario: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  finishEarly: {
    color: '#666',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 16,
  },
  answersBlock: {
    marginTop: 10,
  },
  answerOption: {
    backgroundColor: '#2F2D36',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  answerOptionText: {
    color: '#F7F0CE',
    fontSize: 15,
    fontWeight: '500',
    textAlign: 'center',
  },
  answerOptionSelected: {
    backgroundColor: '#F7F0CE',
  },
  answerOptionSelectedText: {
    color: '#000',
  },
  nextButton: {
    backgroundColor: '#F7F0CE',
    borderRadius: 20,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pauseAlert: {
    width: '80%',
    backgroundColor: '#2D2C30',
    borderRadius: 14,
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  pauseTitle: {
    color: '#F7F0CE',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  pauseSubtitle: {
    color: '#F7F0CE',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  alertButton: {
    width: '90%',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginBottom: 12,
  },
  alertButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  resumeButton: {
    backgroundColor: '#F7F0CE',
  },
  resumeButtonText: {
    color: '#000',
  },
  exitButton: {
    backgroundColor: '#FC5C5C',
  },
  exitButtonText: {
    color: '#fff',
  },
});
