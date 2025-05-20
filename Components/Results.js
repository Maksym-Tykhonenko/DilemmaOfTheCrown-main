import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Простые иконки/эмоджи для категорий (можно расширить)
const categoryEmojis = {
  war: '⚔️',
  love: '💔',
  power: '👑',
  faith: '🪶',
  treason: '🐍',
};

// Функция группировки ответов по игрокам
function groupAnswersByPlayer(answers) {
  // Создаём объект вида { "Player 1": [...], "Player 2": [...] }
  const grouped = {};
  answers.forEach((ans) => {
    if (!grouped[ans.player]) {
      grouped[ans.player] = [];
    }
    grouped[ans.player].push(ans);
  });
  // Превращаем объект в массив вида [{ player, answers }, ...]
  return Object.entries(grouped).map(([player, ans]) => ({
    player,
    answers: ans,
  }));
}

// Функция для вычисления среднего значения по процентам
const computeAverage = (answers) => {
  const total = answers.reduce((acc, item) => acc + (item.chosenPercent || 0), 0);
  return answers.length ? (total / answers.length).toFixed(0) : 0;
};

const Results = ({ route, navigation }) => {
  // Из GameQuiz получаем массив answers и (при необходимости) список игроков
  const { answers = [] } = route.params || {};

  // Группируем ответы по игрокам
  const playersAnswers = groupAnswersByPlayer(answers);

  // Обработчик нажатия кнопки MENU для возврата на главный экран
  const handleMenuPress = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>THE VERDICTS ARE IN!</Text>
      <ScrollView style={{ width: '100%' }} contentContainerStyle={{ paddingBottom: 40 }}>
        {playersAnswers.map((pa) => {
          // Вычисляем общий средний результат для игрока
          const overallAverage = computeAverage(pa.answers);

          // Группируем ответы игрока по категориям — по каждой теме будет один контейнер
          const categoryGroups = {};
          pa.answers.forEach((ans) => {
            const catKey = ans.category.toLowerCase();
            if (!categoryGroups[catKey]) {
              categoryGroups[catKey] = {
                category: ans.category,
                answers: [],
              };
            }
            categoryGroups[catKey].answers.push(ans);
          });
          const categoriesArr = Object.values(categoryGroups);

          return (
            <View key={pa.player} style={styles.playerBlock}>
              {/* Имя игрока */}
              <Text style={styles.playerTitle}>{pa.player}</Text>

              {/* Отдельный контейнер для общего результата */}
              <View style={styles.overallContainer}>
                <Text style={styles.overallText}>Overall Average: {overallAverage}%</Text>
              </View>

              {/* Контейнеры для каждой темы */}
              {categoriesArr.map((catItem, idx) => {
                const avgCategory = computeAverage(catItem.answers);
                const emoji = categoryEmojis[catItem.category.toLowerCase()] || '❓';
                return (
                  <View key={idx} style={styles.categoryRow}>
                    <View style={styles.categoryInfo}>
                      {/* Обёртка для эмодзи */}
                      <View style={styles.emojiContainer}>
                        <Text style={styles.emojiText}>{emoji}</Text>
                      </View>
                      <Text style={styles.categoryText}>{catItem.category.toUpperCase()}</Text>
                    </View>
                    <Text style={styles.percentText}>{avgCategory}%</Text>
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Кнопка MENU для возврата на главный экран */}
        <TouchableOpacity style={styles.menuButton} onPress={handleMenuPress}>
          <Text style={styles.menuButtonText}>MENU</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27',
    paddingTop: 60,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  title: {
    color: '#F7F0CE',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  // Блок отдельного игрока
  playerBlock: {
    backgroundColor: '#2D2C30',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    width: '100%',
  },
  playerTitle: {
    color: '#F7F0CE',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  // Отдельный контейнер для общего результата
  overallContainer: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  overallText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  // Контейнер для одной темы (категории)
  categoryRow: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  // Группа эмодзи и текста категории
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  // Стиль для контейнера эмодзи: белый фон с borderRadius 15
  emojiContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    marginRight: 8,
  },
  emojiText: {
    fontSize: 18,
  },
  categoryText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  percentText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
  // Кнопка MENU
  menuButton: {
    backgroundColor: '#F7F0CE',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 60,
    alignItems: 'center',
    marginTop: 30,
    alignSelf: 'center',
  },
  menuButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '700',
  },
});
