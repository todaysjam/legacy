import React from 'react';
import { StyleSheet, View, ScrollView,Text } from 'react-native';
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
    marginTop: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingBottom: 60,
  },
  searchItemBorder:{
    borderRadius: 8,
    backgroundColor: '#1e90ff',
    padding: 5,
    marginBottom: 5,
  },
  Button: {
    backgroundColor: '#1e90ff',
  },
  Title: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize:24
  }
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
    .then(res => res.json())
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
        <Text style={styles.Title}>Weekly Meals!</Text>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getMealList().map((meal, i) => (
                        <View style={styles.searchItemBorder} key={i}>

            <MealTile
              recipe={meal.recipe}
              showInfo={this.gotoNext}
              key={i}
              mealId={meal._id} // eslint-disable-line no-underscore-dangle
              style={styles.Button}
              textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
            />
          </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

