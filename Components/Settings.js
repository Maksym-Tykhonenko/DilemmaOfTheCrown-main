import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Switch,
  ScrollView,
  Alert,
} from 'react-native';
import { useAudio } from '../Components/AudioScript'; // путь к AudioProvider

// Иконки замените на свои пути
const backIcon = require('../assets/arrowb.png');
const gearIcon = require('../assets/gear.png');
const musicIcon = require('../assets/music.png');
const shareIcon = require('../assets/share.png');
const termsIcon = require('../assets/document.png');

const SettingsScreen = ({ navigation }) => {
  // Получаем состояние и управляющую функцию из контекста
  const { isMusicPlaying, setIsMusicPlaying } = useAudio();

  // Обработчик переключения музыки
  const handleToggleMusic = () => {
    setIsMusicPlaying(prevState => !prevState);
  };

  // Обработчик для кнопки Share the App (функция не реализована)
  const handleShareApp = () => {
    Alert.alert('Coming soon', 'This feature will be added soon.');
  };

  // Обработчик для кнопки Terms of Use (функция не реализована)
  const handleTerms = () => {
    Alert.alert('Coming soon', 'This feature will be added soon.');
  };

  // Кнопка «назад»
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Шапка */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerSide} onPress={handleGoBack}>
          <Image source={backIcon} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>SETTINGS</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerSide}>
          <Image source={gearIcon} style={styles.headerIcon1} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
        {/* Блок Music */}
        <View style={styles.settingBlock}>
          <View style={styles.leftPart}>
            <Image source={musicIcon} style={styles.settingIcon} />
            <Text style={styles.settingText}>MUSIC</Text>
          </View>
          {/* Переключатель (Switch) */}
          <Switch 
            trackColor={{ false: '#767577', true: '#F7F0CE' }}
            thumbColor={isMusicPlaying ? '#000' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={handleToggleMusic}
            value={isMusicPlaying}
          />
        </View>

        {/* Блок Share the App */}
        <TouchableOpacity style={styles.settingBlock} onPress={handleShareApp}>
          <View style={styles.leftPart}>
            <Image source={shareIcon} style={styles.settingIcon} />
            <Text style={styles.settingText}>SHARE THE APP</Text>
          </View>
        </TouchableOpacity>

        {/* Блок Terms of Use */}
        <TouchableOpacity style={styles.settingBlock} onPress={handleTerms}>
          <View style={styles.leftPart}>
            <Image source={termsIcon} style={styles.settingIcon} />
            <Text style={styles.settingText}>TERMS OF USE</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27',  // Тёмный фон
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F7F0CE',
    borderRadius: 12,
    marginTop: 50,
    marginBottom: -10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 10,
  },
  headerSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
    tintColor: '#2D2C30',
    marginRight: 10,
  },
  headerIcon1: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
    tintColor: '#6B3C1C',
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 5,
  },
  headerTitle: {
    fontSize: 16,
    color: '#2D2C30',
    fontWeight: '700',
  },
  scrollArea: {
    padding: 16,
  },
  settingBlock: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#F7F0CE',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftPart: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    width: 35,
    height: 35,
    marginRight: 12,
    tintColor: '#6B3C1C',
    resizeMode: 'contain',
    backgroundColor: '#FCF9EA',
    padding: 5,
    borderRadius: 3,
  },
  settingText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#F7F0CE',
  },
});
