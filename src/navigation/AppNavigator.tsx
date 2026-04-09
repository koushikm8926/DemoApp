import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2196F3',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{title: 'My Home'}}
      />
      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{title: 'Item Details'}}
      />
      <Stack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Your Favorites'}}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
