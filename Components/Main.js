import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

const Main = ({ navigation }) => {
  const handlePlayDilemma = () => {
    navigation.navigate('GameSetup');
  };

  const handleSavedDilemmas = () => {
    navigation.navigate('SavedDilemmas');
  };

  const handleAbout = () => {
    navigation.navigate('About');
  };

  const handleSettings = () => {
    navigation.navigate('Settings');
  };

  return (
    <View style={styles.container}>
      {/* Верхняя часть: две картинки */}
      <View style={styles.topImagesContainer}>
        <Image
          source={require('../assets/mark1.png')}
          style={styles.leftImage}
          resizeMode="contain"
        />
        <Image
          source={require('../assets/mark2.png')}
          style={styles.rightImage}
          resizeMode="contain"
        />
      </View>

      {/* Кнопка "PLAY A DILEMMA" */}
      <TouchableOpacity style={[styles.button, styles.bigButton]} onPress={handlePlayDilemma}>
        <Text style={styles.bigButtonText}>PLAY A DILEMMA</Text>
      </TouchableOpacity>

      {/* Кнопка "SAVED DILEMMAS" */}
      <TouchableOpacity style={styles.listButton} onPress={handleSavedDilemmas}>
        <View style={styles.listButtonLeft}>
          <Image
            source={require('../assets/saved.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.listButtonLabel}>SAVED DILEMMAS</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* Кнопка "ABOUT" */}
      <TouchableOpacity style={styles.listButton} onPress={handleAbout}>
        <View style={styles.listButtonLeft}>
          <Image
            source={require('../assets/question.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.listButtonLabel}>ABOUT</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>

      {/* Кнопка "SETTINGS" */}
      <TouchableOpacity style={styles.listButton} onPress={handleSettings}>
        <View style={styles.listButtonLeft}>
          <Image
            source={require('../assets/gear.png')}
            style={styles.iconImage}
            resizeMode="contain"
          />
          <Text style={styles.listButtonLabel}>SETTINGS</Text>
        </View>
        <Text style={styles.arrow}>›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27', // Тёмный фон
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
  },
  topImagesContainer: {
    // Размещаем 2 картинки в строку
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 40,
  },
  leftImage: {
    width: 200,
    height: 200,
    marginLeft:10,
    // Левую картинку не смещаем
  },
  rightImage: {
    width: 200,
    height: 200,
    // Смещаем правую картинку вниз на 20 пикселей
    marginTop: 90,
    marginLeft:-40,
    marginBottom:-20,
  },

  button: {
    width: '100%',
    backgroundColor: '#F7F0CE',
    borderRadius: 50,
    paddingVertical: 16,
    alignItems: 'center',
  },
  bigButton: {
    marginBottom: 20,
  },
  bigButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },

  // Кнопки-список
  listButton: {
    width: '100%',
    backgroundColor: '#F7F0CE',
    borderRadius: 15,
    paddingVertical: 16,
    paddingHorizontal: 16,
   
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Изображение-иконка
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
  listButtonLabel: {
    fontSize: 16,
    color: '#000',
    fontWeight: '500',
  },
  arrow: {
    fontSize: 25,
    color: '#000',
  },
});

export default Main;
