import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';
import HeadBuffer from './HeadBuffer';
import AddMealButton from './AddMealButton'
import Button from './Button'
const recipeUrl = 'https://mealdotlegacy.herokuapp.com/api/recipe/';
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchItemBorder:{
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#1e90ff',
    marginBottom: 5
  },
  break:{
    marginBottom: 10
  }
});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  getData(searchString) {
    fetch(recipeUrl + searchString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        this.props.updateSearchRecipes(data);
      }
    }).done();
  }

  postMeal(recipeId) {
    console.log('hello')
    fetch(mealUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.getToken(),
      },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        recipeId,
      }),
    })
    .then(() => {
    });
  }

  gotoNext(recipe) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        postMeal: this.postMeal,
        text: 'Add',
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay style={styles.marginBottom} />
        <Searchbar style={styles.search} enter={this.getData} />
        <View style={styles.break}></View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical

        >
          {this.props.getSearchRecipes().map((meal, i) => (
            <View style={styles.searchItemBorder} key={i}>
              <MealTile
                recipe={meal}
                showInfo={this.gotoNext}
                              />
              <Button
                onclick={() => { this.postMeal(meal._id, this.mealId); }} // eslint-disable-line
                text='Add'
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

