import React, {Component} from 'react';
import {View, Text, SafeAreaView, color} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from './src/components/Home/Home';
import Meteo from './src/components/Meteo/Meteo';
import Location from './Localization/Location';
import {StyleSheet} from 'react-native';

const Drawer = createDrawerNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LoggedIn: true,
      splashscreen: true,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({splashscreen: false});
    }, 2000);
  }

  render() {
    if (this.state.splashscreen) {
      return (
        <View
          style={{
            backgroundColor: 'silver',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Icon style={styles.icon} name="sunny" color={color} size={200} />
          </View>

          <View>
            <Text style={styles.txt}> Weather by Saïda</Text>
          </View>
        </View>
      );
    } else if (!this.state.LoggedIn) {
      return (
        <SafeAreaView style={{flex: 1}}>
          <View>
            <Text> Il faut se connecter ! </Text>
          </View>
        </SafeAreaView>
      );
    } else {
      return (
        <NavigationContainer>
          <Drawer.Navigator
            drawerStyle={{
              width: 200,
            }}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Accéder à la météo" component={Meteo} />
            <Drawer.Screen name="Accéder à la géoloc" component={Location} />
          </Drawer.Navigator>
        </NavigationContainer>
      );
    }
  }
}
const styles = StyleSheet.create({
  txt: {
    textAlign: 'center',
    fontSize: 30,
    justifyContent: 'flex-start',
    fontWeight: '300',
  },

  icon: {
    textAlign: 'center',
    color: 'yellow',
  },
});

export default App;
