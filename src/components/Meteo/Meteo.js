import React, {Component} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
/** Selection de notre librairie d'icon avec ajout d'une ligne de code dans android/app/build.gradle : 
  - - - - - apply from: "../../node_modules/react-native-vector-icons/fonts.gradle" - - - - - */

import CurrentWeather from './CurrentWeather/CurrentWeather';
import Fivedays from './FiveDays/Fivedays';

const Tabs = createBottomTabNavigator();
const Tab = createMaterialBottomTabNavigator();

class Meteo extends Component {
  render() {
    return (
      <Tab.Navigator
        activeColor="blue"
        inactiveColor="silver"
        barStyle={{backgroundColor: '#DEDEDE'}}>
        <Tab.Screen
          name="Météo du jour"
          component={CurrentWeather}
          options={{
            tabBarLabel: 'Météo du jour',
            tabBarIcon: ({color, size}) => (
              <Icon name="cloud-circle" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Météo sur 5 jours"
          component={Fivedays}
          options={{
            tabBarLabel: 'Météo sur 5 jours',
            tabBarIcon: ({color, size}) => (
              <Icon name="calendar" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}

export default Meteo;
