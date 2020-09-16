import React, {Component} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: null,
      lastPosition: null,
    };
    watchID: number = null;
  }

  componentDidMount() {
    Geolocation.getCurrentPosition(
      position => {
        const initialPosition = JSON.stringify(position);
        this.setState({initialPosition});
      },
      error => Alert.alert('Error', JSON.stringify(error)),
      {enableHighAccuracy: false, timeout: 10000},
      /** enableHigh: rpt l'utilisation (true) ou non (wifi) du gps
       * timeout: durée maximale (en millisecondes) que l'appareil est autorisé à prendre pour retourner une position
       */
    );
    this.watchID = Geolocation.watchPosition(position => {
      const lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }

  componentWillUnmount() {
    this.watchID != null && Geolocation.clearWatch(this.watchID);
  }

  render() {
    return (
      <View>
        <Text>
          <Text style={styles.title}>Position de départ : </Text>
          {this.state.initialPosition}
        </Text>
        <Text>
          <Text style={styles.title}>Dernière position enregistrée: </Text>
          {this.state.lastPosition}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 15,
  },
});

export default Location;
