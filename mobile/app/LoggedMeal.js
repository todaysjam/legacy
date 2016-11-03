import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Header, Title } from 'native-base';
import Swipeout from 'react-native-swipeout';

const width = Dimensions.get('window').width;
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  tile: {
    width: width * 0.9,
    height: 100,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff',
  },
  picture: {
    height: 75,
    width: 80,
    opacity: 1,
    borderRadius: 5,
    marginRight: 7,
    marginTop: 3
  },
  textwrap: {
    flexDirection: 'column',
    shadowColor: 'black',
  },
  headline: {
    flexWrap: 'wrap',    
    fontSize: 14,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    width: width * .6
  },
  itemContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  }
});

export default class LoggedMeal extends React.Component {
  constructor(props) {
    super(props);
  }

  postMeal(mealId, token) {
    fetch(mealUrl + mealId, {
      method: 'DELETE',
      headers: { 'x-access-token': token },
    })
    .then(() => {
      this.props.updateMeals();
    })
  }

  render() {
    const swipeoutBtns = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'transparent',
        color: 'white',
        onPress: () => {
          this.postMeal(this.props.mealId, this.props.token);
        }
      }
    ];

    return (
      <Swipeout right={swipeoutBtns} autoClose={true} >
        <TouchableHighlight
          style={styles.tile}
          onPress={() => this.props.showInfo(this.props.recipe, this.props.mealId)}
        >
          <View style={styles.itemContainer}>
            <Image
              style={styles.picture}
              source={{ uri: this.props.recipe.image }}
              >
            </Image>
            <View >
              <Text style={styles.headline}>
                {this.props.recipe.label}
              </Text>
              <Text style={styles.headline}>
                {Math.round(this.props.recipe.calories) + ' cal'}
              </Text>
              <Text style={styles.headline}>
                {Math.round(this.props.recipe.totalWeight) + ' g'}
              </Text>
            </View>
          </View>
        </TouchableHighlight>
      </Swipeout>
    );
  }
}
