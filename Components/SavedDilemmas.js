import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
  ScrollView,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const arrowImg = require('../assets/arrowb.png');
const bookmarkIcon = require('../assets/saved.png');
const shareIcon = require('../assets/share.png');

// Словарь эмодзи для категорий
const categoryEmojis = {
  war: '⚔️',
  love: '💔',
  power: '👑',
  faith: '🪶',
  treason: '🐍',
};

const SavedDilemmas = ({ navigation }) => {
  // Список сохранённых дилемм из AsyncStorage
  const [savedDilemmas, setSavedDilemmas] = useState([]);
  // Выбранная дилемма для детального просмотра; если null — отображается список
  const [selectedDilemma, setSelectedDilemma] = useState(null);

  // При каждом входе на экран загружаем сохранённые данные
  useFocusEffect(
    useCallback(() => {
      const loadSaved = async () => {
        try {
          const stored = await AsyncStorage.getItem('savedQuestions');
          const list = stored ? JSON.parse(stored) : [];
          setSavedDilemmas(list);
        } catch (error) {
          console.log('Error loading saved dilemmas: ', error);
        }
      };

      loadSaved();
    }, [])
  );

  // Удаляет вопрос из сохранённых и обновляет AsyncStorage
  const handleRemoveBookmark = async (item) => {
    try {
      const newList = savedDilemmas.filter(q => q.id !== item.id);
      await AsyncStorage.setItem('savedQuestions', JSON.stringify(newList));
      setSavedDilemmas(newList);
      Alert.alert('Removed', `Removed: ${item.title}`);
    } catch (error) {
      Alert.alert('Error', 'Could not remove the question.');
    }
  };

  // Шаринг вопроса
  const handleShareItem = async (item) => {
    try {
      await Share.share({
        message: `${item.title}\n\n${item.scenario}\n\nCategory: ${item.category}\nYear: ${item.year}`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleGoBack = () => {
    if (selectedDilemma) {
      setSelectedDilemma(null);
    } else {
      navigation.goBack();
    }
  };

  // При нажатии на элемент списка устанавливаем выбранную дилемму для детального просмотра
  const handlePressItem = (item) => {
    setSelectedDilemma(item);
  };

  // Если детальный просмотр выбран, отображаем подробное представление с ScrollView
  if (selectedDilemma) {
    const { title, category, year, scenario, options } = selectedDilemma;
    const emoji = categoryEmojis[category?.toLowerCase()] || '❓';

    return (
      <View style={styles.container}>
        {/* Шапка с кнопкой Back */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerLeft} onPress={handleGoBack}>
            <Image source={arrowImg} style={[styles.arrowImage, { tintColor: '#fff' }]} />
            <Text style={styles.headerTitle}>BACK</Text>
          </TouchableOpacity>
          <View style={styles.headerRight} />
        </View>
        <ScrollView contentContainerStyle={styles.detailScroll}>
          <Text style={styles.detailEmoji}>{emoji}</Text>
          <Text style={styles.detailTitle}>{title}</Text>
          <Text style={styles.detailCategory}>Category: {category}</Text>
          <Text style={styles.detailYear}>Year: {year}</Text>
          <Text style={styles.detailScenario}>{scenario}</Text>
          {options && options.length > 0 && (
            <>
              <Text style={styles.optionsTitle}>Options:</Text>
              {options.map((opt, idx) => (
                <View key={idx} style={styles.optionItem}>
                  <Text style={styles.optionText}>
                    {`${idx + 1}. ${opt.text}${opt.popularity ? ` - ${opt.popularity}%` : ''}`}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
      </View>
    );
  }

  // Отображаем список сохранённых дилемм
  const renderDilemmaItem = ({ item }) => {
    const categoryKey = item.category?.toLowerCase();
    const emoji = categoryEmojis[categoryKey] || '❓';
    return (
      <TouchableOpacity onPress={() => handlePressItem(item)}>
        <View style={styles.dilemmaItem}>
          <View style={styles.leftRow}>
            <Text style={styles.categoryEmoji}>{emoji}</Text>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
          {/* Ряд с кнопками Share и Remove */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleShareItem(item)}
            >
              <Image
                source={shareIcon}
                style={[styles.smallIcon, { tintColor: '#fff' }]}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.smallButton}
              onPress={() => handleRemoveBookmark(item)}
            >
              <Image
                source={bookmarkIcon}
                style={[styles.smallIcon, { tintColor: '#fff' }]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.headerLeft} onPress={handleGoBack}>
          <Image source={arrowImg} style={[styles.arrowImage, { tintColor: '#fff' }]} />
          <Text style={styles.headerTitle}>SAVED DILEMMAS</Text>
        </TouchableOpacity>
        <View style={styles.headerRight} />
      </View>
      {savedDilemmas.length === 0 ? (
        <Text style={styles.emptyText}>
          YOU HAVEN'T SAVED ANY ROYAL DILEMMAS
        </Text>
      ) : (
        <FlatList
          data={savedDilemmas}
          keyExtractor={(item, index) => `dilemma-${item.id || index}`}
          renderItem={renderDilemmaItem}
          contentContainerStyle={{ paddingBottom: 20 }}
          style={{ width: '100%', marginTop: 10 }}
        />
      )}
    </View>
  );
};

export default SavedDilemmas;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27',
    paddingTop: 90,
    paddingHorizontal: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2D2C30',
    borderRadius: 12,
    marginBottom: 16,
    paddingVertical: 18,
    paddingHorizontal: 16,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowImage: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 16,
    color: '#F7F0CE',
    fontWeight: '700',
  },
  headerRight: {},
  emptyText: {
    marginTop: 80,
    color: '#FFF',
    fontSize: 16,
    textAlign: 'center',
  },
  dilemmaItem: {
    backgroundColor: '#2F2D36',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '70%',
  },
  categoryEmoji: {
    backgroundColor:'#fff',
    borderRadius:10,
    padding:6,
   height:40,
    width:40,
    fontSize: 25,
    marginRight: 12,
  },
  titleText: {
    color: '#F7F0CE',
    fontSize: 15,
    fontWeight: '600',
    flexShrink: 1,
  },
  buttonRow: {
    flexDirection: 'row',
  },
  smallButton: {
    backgroundColor: '#3E3E3E',
    borderRadius: 6,
    padding: 6,
    marginLeft: 6,
  },
  smallIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  // Стили для детального экрана (ScrollView)
  detailScroll: {
    paddingBottom: 20,
  },
  detailEmoji: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  detailTitle: {
    color: '#F7F0CE',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  detailCategory: {
    color: '#F7F0CE',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
  },
  detailYear: {
    color: '#F7F0CE',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  detailScenario: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsTitle: {
    color: '#F7F0CE',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionItem: {
    backgroundColor: '#F7F0CE',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    color: '#2F2D36',
    fontSize: 16,
  },
});
