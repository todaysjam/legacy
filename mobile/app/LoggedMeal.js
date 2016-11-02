import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Header, Title } from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  tile: {
    width: width * 0.9,
    height: 90,
    borderRadius: 5,
    marginTop: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 3,
      height: 3,
    },
    borderRightWidth: 3,
    borderBottomWidth: 3,
    borderColor: 'black',
  },
  picture: {
    height: 80,
    width: 80,
    opacity: 0.85,
    borderRadius: 5,
    marginRight: 40,
    justifyContent: 'flex-start',

  },
  textwrap: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    shadowColor: 'black',
  },
  headline: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: .25,
      height: .25,
    },
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});

const LoggedMeal = ({ recipe, mealId, showInfo }) => (
  <TouchableHighlight
    style={styles.tile}
    onPress={() => showInfo(recipe, mealId)}
  >
    <View style={styles.itemContainer}>
      <Image
        style={styles.picture}
        source={{ uri: recipe.image }}
        >
      </Image>
      <View style={styles.textwrap}>
        <Text style={styles.headline}>
          {recipe.label}
        </Text>
        <Text style={styles.headline}>
          {Math.round(recipe.calories) + ' cal'}
        </Text>
        <Text style={styles.headline}>
          {Math.round(recipe.totalWeight) + ' g'}
        </Text>
      </View>
    </View>
  </TouchableHighlight>
);

export default LoggedMeal;
