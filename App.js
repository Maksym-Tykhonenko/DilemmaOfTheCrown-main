// App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Loader from './Components/Loader';
import Main from './Components/Main';
import { AudioProvider } from './Components/AudioScript';
import Start from './Components/Start';
import GameSetup from './Components/GameSetup';
import GameQuiz from './Components/GameQuiz';
import Results from './Components/Results';
import SavedDilemmas from './Components/SavedDilemmas';
import About from './Components/About';
import Settings  from './Components/Settings';
const Stack = createStackNavigator();

export default function App() {
  const [loaderEnded, setLoaderEnded] = useState(false);

  return (
<AudioProvider>
      <NavigationContainer>
        {!loaderEnded ? (
          <Loader onEnd={() => setLoaderEnded(true)} />
        ) : (
          <Stack.Navigator initialRouteName="Start" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Start" component={Start} />
            <Stack.Screen name="GameSetup" component={GameSetup} />
            <Stack.Screen name="GameQuiz" component={GameQuiz} />
            <Stack.Screen name="Results" component={Results} />
            <Stack.Screen name="SavedDilemmas" component={SavedDilemmas} />
            <Stack.Screen name="About" component={About} />
            <Stack.Screen name="Settings" component={Settings} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
      </AudioProvider>
  );
}