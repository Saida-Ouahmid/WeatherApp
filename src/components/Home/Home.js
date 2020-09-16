import React, {Component} from 'react';
import {SafeAreaView, Text, Button, View, TextInput, Alert} from 'react-native';
import {StyleSheet} from 'react-native';

class Home extends Component {
  cacahuete = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    return (
      <View style={styles.back}>
        <SafeAreaView>
          <Text style={{textAlign: 'center', fontSize: 10}}>
            Weather by Saïda
          </Text>
          <Text style={styles.titreHome}>Bienvenue sur Weather by Saïda !</Text>
          <Text style={styles.intro}>
            Prends la liberté de checker la météo de la ville de ton choix !
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Vienne, Montpellier, New-York, Paris, ..."
            placeholderTextColor="lightblack"
          />
          <View style={styles.buttonSearch}>
            <Button
              title="Chercher"
              color="none"
              onPress={() =>
                Alert.alert('Trouvé ! Go actualiser ta page météo !')
              }
            />
          </View>

          <View style={styles.button}>
            <Button
              onPress={() => {
                this.props.navigation.navigate('Accéder à la météo');
              }}
              title="Acces direct à la météo"
              color="#00bfff"
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  back: {backgroundColor: 'lightblue', flex: 1},

  titreHome: {
    marginTop: 15,
    marginBottom: 50,
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

  intro: {
    textAlign: 'center',
    fontSize: 20,
    marginHorizontal: 15,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 40,
    marginBottom: 20,
    marginHorizontal: 50,
  },
  buttonSearch: {
    marginHorizontal: 130,
    padding: 4,
    textAlign: 'center',
    fontSize: 2,
    fontWeight: 'bold',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 145,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
export default Home;
