import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import MealTile from './MealTile';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';
import HeadBuffer from './HeadBuffer';

const userUrl = 'https://mealdotlegacy.herokuapp.com/api/user/';
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
});

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(cb) {
    fetch(userUrl + this.props.getUserId(), {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => {
      console.log('meals', res.json()) 
      res.json()
    })
    .then((data) => {
      this.props.updateMealList(data.mealsObjs);
    }).done(() => {
      if (cb) { cb(); }
    });
  }

  postMeal(recipeId, mealId) {
    fetch(mealUrl + mealId, {
      method: 'DELETE',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(() => {
      this.getData(() => this.props.navigator.pop());
    });
  }

  gotoNext(recipe, mealId) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        mealId,
        postMeal: this.postMeal,
        text: 'Remove',
      },
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay />
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getMealList().map((meal, i) => (
            <MealTile
              recipe={meal.recipe}
              showInfo={this.gotoNext}
              key={i}
              mealId={meal._id} // eslint-disable-line no-underscore-dangle
            />
          ))}
        </ScrollView>
      </View>
    );
  }
}

