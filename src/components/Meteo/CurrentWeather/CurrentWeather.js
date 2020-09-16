import React, {Component} from 'react';
import {View, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import {StyleSheet} from 'react-native';

class CurrentWeather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meteo: {
        coord: {lon: null, lat: null},
        weather: [
          {
            id: null,
            main: null,
            description: null,
            icon: '01n',
          },
        ],
        main: {
          temp: null,
          feels_like: null,
          temp_min: null,
          temp_max: null,
          pressure: null,
          humidity: null,
        },
        wind: {
          speed: null,
          deg: null,
        },
        id: null,
        name: '',
      },
    };
  }

  componentDidMount() {
    this.getWeather();
  }

  getWeather = () => {
    const options = {
      method: 'GET',
    };

    fetch(
      'https://api.themoviedb.org/3/search/movie?api_key=4159ad2b376fa3bd4b1ae1ab140e04c9&language=fr&query=harry',
      options,
    )
      .then(response => response.json())
      .then(
        data => {
          this.setState({meteo: data});
        },
        error => {
          console.log(error);
        },
      );
  };

  showMeteo = () => {
    if (this.state.meteo) {
      return (
        <View>
          <Text style={styles.titreCurrent}>{this.state.meteo.name}</Text>
          <Image
            style={styles.iconCurrent}
            source={{
              uri:
                'http://openweathermap.org/img/wn/' +
                this.state.meteo.weather[0].icon +
                '@2x.png',
            }}
          />
          <Text style={styles.mainTemp}>
            {Math.round(this.state.meteo.main.temp - 273.15)} °C
          </Text>

          <Text style={styles.detail}>
            Météo générale: {this.state.meteo.weather[0].description}
          </Text>

          <Text style={styles.detail}>
            T° min : {Math.round(this.state.meteo.main.temp_min - 273.15)}°C ;
            T° max :{Math.round(this.state.meteo.main.temp_max - 273.15)}°C
          </Text>

          <Text style={styles.detail}>
            Vent: {this.state.meteo.wind.speed} km/h direction
            {this.state.meteo.wind.deg} degré.
          </Text>

          <Text style={styles.detail}>
            Taux d'humidité : {this.state.meteo.main.humidity} %
          </Text>

          <Text style={styles.detail}>
            Vent : {this.state.meteo.wind.speed}km/h.
          </Text>
        </View>
      );
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
          {this.showMeteo()}
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  back: {backgroundColor: 'lightblue', flex: 1},

  titreCurrent: {
    marginVertical: 15,
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

  mainTemp: {
    fontSize: 55,
    textAlign: 'center',
    marginTop: -75,
    marginBottom: 20,
  },

  iconCurrent: {
    marginTop: -50,
    height: 300,
    width: 300,
    justifyContent: 'center',
    marginLeft: 30,
  },

  detail: {textAlign: 'center', fontSize: 15},
});

export default CurrentWeather;
