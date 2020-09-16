import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  RefreshControl,
  Button,
} from 'react-native';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from '@react-native-community/geolocation';

const Separator = () => <View style={styles.separator} />;

class Fivedays extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /*coord:{lat=null, lon= null},*/
      forecast: {},
      refreshing: false /**on initie le refresh de l'ecran a false */,
    };
  }

  componentDidMount() {
    this.getData();
  }

  /** Recuperation des données stockées */
  getData = async () => {
    /** Await : attendre le resultat avant de passer à la suite */
    const dataFromStorageJSON = await AsyncStorage.getItem('forecast');

    /** Si présence de données on les parse sinon Stockage de nouvelles données du forecast */
    if (dataFromStorageJSON) {
      this.setState({forecast: JSON.parse(dataFromStorageJSON)});
    } else {
      this.getForecast();
    }
  };

  getForecast = () => {
    Geolocation.getCurrentPosition(
      position => {
        fetch(
          /* 1er fetch pour une GEOLOCALISATION*/
          'https://api.openweathermap.org/data/2.5/forecast?lat= ' +
            position.coords.latitude +
            '&lon=' +
            position.coords.longitude +
            '&appid=b28f60d3b3f4f0f80e06fa132dfc32db',
          /* 'https://api.openweathermap.org/data/2.5/forecast?q=lille&appid=b28f60d3b3f4f0f80e06fa132dfc32db',
           - -- - -- - - - - - - - - - fetch pour météo by City Name- - - - - - - - - - */
          options,
        )
          .then(response => response.json())
          .then(
            data => {
              this.setState({forecast: data});
              this.storeData('forecast', JSON.stringify(data));
            },
            error => {
              console.log(error);
            },
          )
          .finally(() => {
            this.setState({refreshing: false});
            /** refresh à false (s'arrete) une fois les donnéees recupéré ou alors s'il ya des erreurs */
          });
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 20000, maximumAge: 1000},
    );

    this.setState({refreshing: true});
    /**refresh à true pour la recuperation des nouvelles donnees */

    const options = {
      method: 'GET',
    };
  };

  storeData = async (key, value) => {
    /**try-catch : permet d'afficher une erreur dans le catch si le try ne marche pas et donc on a une alert 
     qui s'affiche au lieu d'un message erreur lambda qui nous perdrait */
    try {
      /**système de stockage non chiffré, asynchrone des données */
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      Alert.alert(
        "Une erreur s'est produite lors de la sauvegarde des données météo",
      );
    }
  };

  showForecast = () => {
    /** Array.isArray : Permet de déterminer si l'objet passé en argument est un objet type tableau */

    if (Array.isArray(this.state.forecast.list)) {
      return this.state.forecast.list.map((element, index) => (
        /*.map créée tableau dans un autre tableau */
        <View style={styles.viewFive}>
          <Image
            style={styles.iconFive}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                element.weather[0].icon +
                '@2x.png',
            }}
          />
          <Text style={styles.tempFive}>
            {Math.round(element.main.temp_min - 273.15)} °C
          </Text>
          <Text style={styles.tempFive}>
            {' '}
            {Math.round(element.main.temp_max - 273.15)} °C
          </Text>
        </View>
      ));
    } else {
      return <Text>Chargement en cours...</Text>;
    }
  };

  render() {
    return (
      <View style={styles.back}>
        <StatusBar />
        <SafeAreaView>
          <Text style={{textAlign: 'center', fontSize: 10}}>
            Weather by Saïda
          </Text>
          <Text style={styles.titreFive}>Prévisions météo</Text>

          <Separator />
          <ScrollView
            style={styles.contentScroll}
            horizontal={true}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.getForecast}
              />
            }>
            {this.showForecast()}
          </ScrollView>
          <Separator />
          <View style={styles.buttonToMenu}>
            <Button
              title="Acces au MENU"
              color="#00bfff"
              onPress={() => this.props.navigation.toggleDrawer()}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  back: {backgroundColor: 'lightblue', flex: 1},

  titreFive: {
    marginTop: 15,
    marginBottom: 80,
    marginHorizontal: 30,
    padding: 4,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 12,
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  contentScroll: {
    paddingBottom: 30,
    paddingTop: 20,
  },

  separator: {
    marginVertical: 8,
    borderColor: '#737373',
    borderWidth: 0.5,
  },

  iconFive: {height: 70, width: 70},

  tempFive: {fontSize: 15},

  buttonToMenu: {
    marginHorizontal: 10,
    marginVertical: 110,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default Fivedays;
