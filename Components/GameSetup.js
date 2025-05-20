import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';

const arrowImg = require('../assets/arrow.png');

const CATEGORIES = [
  { key: 'war',     label: 'WAR',     icon: '⚔️' },
  { key: 'love',    label: 'LOVE',    icon: '💔' },
  { key: 'power',   label: 'POWER',   icon: '👑' },
  { key: 'faith',   label: 'FAITH',   icon: '🪶' },
  { key: 'treason', label: 'TREASON', icon: '🐍' },
];

const GameSetup = ({ navigation }) => {
  // step=1 => Выбор режима игры
  // step=2 => Выбор категорий (общий для solo/group)
  // step=3 => Настройка группы (только для group)
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [questionsPerPlayer, setQuestionsPerPlayer] = useState(1);
  const [players, setPlayers] = useState(['Player 1', 'Player 2']);

  // ---------- ШАГ 1: выбор режима ----------
  const handleChooseMode = (chosenMode) => {
    setMode(chosenMode);
    setStep(2);
  };

  // ---------- ШАГ 2: выбор категорий ----------
  const handleToggleCategory = (key) => {
    setSelectedCategories((prev) => {
      if (prev.includes(key)) {
        return prev.filter((catKey) => catKey !== key);
      } else {
        if (prev.length < 3) {
          return [...prev, key];
        } else {
          return prev;
        }
      }
    });
  };

  const canGoNextCategories =
    selectedCategories.length >= 1 && selectedCategories.length <= 3;

  const handleNextFromCategories = () => {
    if (!canGoNextCategories) return;
    if (mode === 'solo') {
      navigation.navigate('GameQuiz', {
        mode: 'solo',
        players: ['Player 1'],
        questionsPerPlayer: 1,
        categories: selectedCategories,
      });
    } else {
      setStep(3);
    }
  };

  // ---------- ШАГ 3: настройка группы ----------
  const handleChangeQuestions = (delta) => {
    setQuestionsPerPlayer((prev) => {
      let nextVal = prev + delta;
      if (nextVal < 1) nextVal = 1;
      if (nextVal > 3) nextVal = 3;
      return nextVal;
    });
  };

  const handleAddPlayer = () => {
    if (players.length < 5) {
      setPlayers((prev) => [...prev, `Player ${prev.length + 1}`]);
    }
  };

  const handleRemovePlayer = () => {
    if (players.length > 2) {
      setPlayers((prev) => prev.slice(0, prev.length - 1));
    }
  };

  const canStartGame =
    players.length >= 2 &&
    selectedCategories.length >= 1 &&
    questionsPerPlayer >= 1 &&
    questionsPerPlayer <= 3;

  const handleStartGame = () => {
    if (!canStartGame) return;
    navigation.navigate('GameQuiz', {
      mode: 'group',
      questionsPerPlayer,
      players,
      categories: selectedCategories,
    });
  };

  // ---------- Кнопка "назад" ----------
  const handleGoBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
      setSelectedCategories([]);
    } else {
      navigation?.goBack?.();
    }
  };

  // Заголовок экрана
  let headerTitle;
  if (step === 1) {
    headerTitle = 'CHOOSE GAME MODE';
  } else if (step === 2) {
    headerTitle = 'SELECT CATEGORIES';
  } else {
    headerTitle = 'GROUP SETUP';
  }

  // Рендер элемента списка категорий
  const renderCategoryItem = ({ item }) => {
    const isSelected = selectedCategories.includes(item.key);
    return (
      <TouchableOpacity
        style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
        onPress={() => handleToggleCategory(item.key)}
      >
        <View style={styles.categoryLeft}>
          <Text style={styles.categoryIcon}>{item.icon}</Text>
          <Text
            style={[
              styles.categoryText,
              isSelected && styles.categoryTextSelected,
            ]}
          >
            {item.label}
          </Text>
        </View>
        <Text style={styles.categoryArrow}>›</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={handleGoBack} style={styles.headerContent}>
          <Image source={arrowImg} style={styles.arrowImage} />
          <Text style={styles.headerTitle}>{headerTitle}</Text>
        </TouchableOpacity>
      </View>

      {/* Шаг 1: выбор режима */}
      {step === 1 && (
        <View style={styles.stepOneContainer}>
          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => handleChooseMode('group')}
          >
            <View style={styles.modeButtonLeft}>
              <Text style={styles.modeIcon}>👥</Text>
              <Text style={styles.modeText}>GROUP MODE</Text>
            </View>
            <Text style={styles.modeArrow}>›</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.modeButton}
            onPress={() => handleChooseMode('solo')}
          >
            <View style={styles.modeButtonLeft}>
              <Text style={styles.modeIcon}>🤔</Text>
              <Text style={styles.modeText}>SOLO MODE</Text>
            </View>
            <Text style={styles.modeArrow}>›</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Шаг 2: выбор категорий */}
      {step === 2 && (
        <View style={{ flex: 1 }}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.key}
            renderItem={renderCategoryItem}
            style={{ width: '100%', marginTop: 10 }}
          />

          <TouchableOpacity
            style={[styles.nextButton, !canGoNextCategories && styles.nextButtonDisabled]}
            disabled={!canGoNextCategories}
            onPress={handleNextFromCategories}
          >
            <Text style={styles.nextButtonText}>NEXT</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Шаг 3: настройка группы */}
      {step === 3 && (
        <View style={{ flex: 1 }}>
          <View style={styles.questionsRow}>
            <Text style={styles.questionsLabel}>Questions per Player</Text>
            <View style={styles.questionsControls}>
              <TouchableOpacity
                style={styles.qButton}
                onPress={() => handleChangeQuestions(-1)}
              >
                <Text style={styles.qButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.qValue}>{questionsPerPlayer}</Text>
              <TouchableOpacity
                style={styles.qButton}
                onPress={() => handleChangeQuestions(1)}
              >
                <Text style={styles.qButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {players.map((pName, idx) => (
            <View key={idx} style={styles.playerSlot}>
              <Text style={styles.playerSlotText}>{pName}</Text>
              {idx === players.length - 1 && players.length > 2 && (
                <TouchableOpacity style={styles.removeButton} onPress={handleRemovePlayer}>
                  <Text style={styles.removeButtonText}>-</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity style={styles.addPlayerButton} onPress={handleAddPlayer}>
            <Text style={styles.addPlayerButtonText}>+</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.startButton, !canStartGame && styles.startButtonDisabled]}
            disabled={!canStartGame}
            onPress={handleStartGame}
          >
            <Text style={styles.startButtonText}>START GAME</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default GameSetup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27',
    paddingTop: 90,
    paddingHorizontal: 16,
  },
  headerContainer: {
    backgroundColor: '#2D2C30',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    width: 15,
    height: 15,
    marginRight: 8,
    resizeMode: 'contain',
  },
  headerTitle: {
    fontSize: 18,
    color: '#fff',
  },
  stepOneContainer: {
    marginTop: 20,
  },
  modeButton: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modeButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  modeText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  modeArrow: {
    fontSize: 20,
    color: '#000',
  },
  categoryButton: {
    backgroundColor: '#2F2D36',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryButtonSelected: {
    backgroundColor: '#F7F0CE',
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
  },
  categoryTextSelected: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  categoryArrow: {
    fontSize: 20,
    color: '#fff',
  },
  nextButton: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:40,
    
  },
  nextButtonDisabled: {
    opacity: 0.4,
  },
  nextButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  questionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2F2D36',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  questionsLabel: {
    fontSize: 16,
    color: '#fff',
  },
  questionsControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qButton: {
    backgroundColor: '#403D47',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
  },
  qButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  qValue: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    width: 24,
    textAlign: 'center',
  },
  playerSlot: {
    backgroundColor: '#2F2D36',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  playerSlotText: {
    fontSize: 16,
    color: '#999',
  },
  removeButton: {
    backgroundColor: '#403D47',
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  addPlayerButton: {
    backgroundColor: '#F7F0CE',
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addPlayerButtonText: {
    color: '#3E2C2C',
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom:40,
  },
  startButtonDisabled: {
    opacity: 0.4,
  },
  startButtonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
});
