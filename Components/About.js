import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const backIcon = require('../assets/arrowb.png');
const helpIcon = require('../assets/question.png');

const About = ({ navigation }) => {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleHelp = () => {
    console.log('Help pressed');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerSide} onPress={handleGoBack}>
          <Image source={backIcon} style={styles.headerIcon} />
          <Text style={styles.headerTitle}>ABOUT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerSide} onPress={handleHelp}>
          <Image source={helpIcon} style={styles.headerIcon1} />
        </TouchableOpacity>
      </View>

      {/* Прокручиваемая зона */}
      <ScrollView contentContainerStyle={styles.scrollArea}>
        <Text style={styles.paragraph}>
          Dilemma of the Crown is a storytelling and decision-making experience inspired by real and imagined royal challenges from history. Each dilemma places you in the seat of power, where every choice can shift the fate of a kingdom.
        </Text>
        <Text style={styles.paragraph}>
          Discuss, reflect, and see how closely your choices align with the canonical decisions once made by monarchs, legends, or historical figures.
        </Text>
        <Text style={[styles.paragraph, { marginBottom: 24 }]}>
          Whether you seek quiet contemplation or shared counsel, the Crown offers two distinct paths:
        </Text>

        {/* SOLO MODE Container */}
        <View style={styles.modeContainer}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeEmoji}>🤔</Text>
            <Text style={styles.modeTitle}>SOLO MODE</Text>
          </View>
          
        </View>
        <Text style={styles.modeDesc}>
        Explore dilemmas at your own pace.No points, no pressure — just insight and discovery.You can save and share any dilemma that sparks your curiosity.
          </Text>

        <View style={styles.modeContainer}>
          <View style={styles.modeHeader}>
            <Text style={styles.modeEmoji}>👥</Text>
            <Text style={styles.modeTitle}>GROUP MODE</Text>
          </View>
          
        </View>
        
        <Text style={styles.modeDesc}>
        Gather your court and face dilemmas together.Each player takes turns answering, while others join the discussion.After each choice, compare your thinking to the true decision of history — and see who ruled with wisdom.
          </Text>

      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#211F27', // белый фон экрана
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: '#F7F0CE', // светлый фон для шапки
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    marginTop:50,
    marginBottom: -10,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal:10,
  },
  headerSide: {
 
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 8,
    tintColor: '#2D2C30', // тёмный цвет иконок
  },
  headerIcon1: {
    backgroundColor:'#fff',
    padding:5,
    borderRadius:10,
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 8,
    tintColor: '#2D2C30', // тёмный цвет иконок
  },
  headerTitle: {
    fontSize: 19,
    color: '#2D2C30', // тёмный текст
    fontWeight: '700',
  },
  scrollArea: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 30,
  },
  paragraph: {
    color: '#fff',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
    textAlign: 'left',
  },
  // Контейнер для режима (Solo/Group)
  modeContainer: {
    backgroundColor: '#2D2C30', // тёмный фон для контейнера режима
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  modeEmoji: {
    backgroundColor:'#fff',
    borderRadius:5,
    padding:5,
    fontSize: 24,
    marginRight: 8,
  },
  modeTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  modeDesc: {
    color: '#fff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom:10,
  },
});
