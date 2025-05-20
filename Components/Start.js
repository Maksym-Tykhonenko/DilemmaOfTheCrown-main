import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const Start = ({ navigation }) => {
  const onExplorePress = () => {
    // Переход на экран "Main" при нажатии
    navigation.navigate('Main');
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Ваше фоновое изображение
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>
          WELCOME TO DILEMMA OF THE CROWN
        </Text>

        <Text style={styles.description}>
          STEP INTO A WORLD WHERE POWER, FATE, AND WISDOM INTERTWINE. 
          HERE, YOU WILL FACE THE SAME IMPOSSIBLE CHOICES THAT ONCE SHAPED KINGDOMS. 
          WILL YOUR JUDGMENT MATCH THAT OF THE MONARCHS OF THE PAST?
          OR WILL YOUR PATH REWRITE HISTORY?
        </Text>

        <TouchableOpacity style={styles.button} onPress={onExplorePress}>
          <Text style={styles.buttonText}>EXPLORE</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    
  },
  overlay: {
    
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  title: {
    marginVertical:300,
    fontSize: 22,
    fontWeight: '700',
    color: '#F7F0CE',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
    textAlign: 'justify',

  },
  button: {
    backgroundColor: '#F7F0CE',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 130,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default Start;
