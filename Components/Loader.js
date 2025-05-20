import React, { useEffect, useState, useRef } from 'react';
import { View, Animated, StyleSheet, ImageBackground } from 'react-native';

const images = [
  require('../assets/Mark3.png'),
  require('../assets/Mark4.png'),
];

const Loader = ({ onEnd }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // При первом рендере плавно показываем картинку
    fadeIn();

    // Через 5 секунд завершаем Loader
    const timer = setTimeout(() => {
      onEnd && onEnd();
    }, 5000);

    // Раз в секунду меняем картинку с анимацией
    const interval = setInterval(() => {
      fadeOut(() => {
        // После завершения fadeOut переключаем индекс
        setImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        // Затем снова делаем fadeIn
        fadeIn();
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  // Анимация плавного появления
  const fadeIn = () => {
    opacity.setValue(0);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  // Анимация плавного исчезновения
  const fadeOut = (callback) => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && callback) {
        callback();
      }
    });
  };

  return (
    <ImageBackground
      source={require('../assets/background.png')} // Фоновое изображение
      style={styles.background}
    >
      {/* Полупрозрачная подложка, слегка затемняющая фон */}
      <View style={styles.overlay} />

      <View style={styles.container}>
        <Animated.Image
          source={images[imageIndex]}
          style={[styles.image, { opacity }]}
          resizeMode="contain"
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  // Полупрозрачный слой
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default Loader;
