import React from 'react';
import { StyleSheet, View, ScrollView,Text, Dimensions, } from 'react-native';
import LoggedMeal from './LoggedMeal';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';
import HeadBuffer from './HeadBuffer';
import Button from './Button';


var calor = 0;
const userUrl = 'https://mealdotlegacy.herokuapp.com/api/user/';
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';
const width = Dimensions.get('window').width;
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
  },
  danger: {
    backgroundColor: 'red'
  },
  container1: {
    width: width * .8,
    height: 50,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 5,
    shadowColor: 'black',
    shadowRadius: 2,
    shadowOpacity: 0.85,
  },
  container2: {
    backgroundColor: '#1e90ff',
    borderRadius: 5,
  },
  text: {
    justifyContent: 'center',
    fontSize: 16,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    borderRadius: 5,
    textAlign: 'center'
  },
});

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.state = {
      style: {
        fontSize: 20,
        textAlign: 'center'
      }
    }
  }
  componentWillMount() {
    var self = this;
    this.getData(this.CalorieCounter.bind(this))
  }

  CalorieCounter(){
    var calor = 0;
    this.props.getMealList().forEach((meal) => {
      calor += meal.recipe.calories
    })
    global._count = Math.round(calor)
    global._cals = ('Weekly Calories Consumed: ' + Math.round(calor) + '/14000')
    if(calor > 14000){
      console.log('toooooo muchhhhh')
      this.setState({
        style:{
          backgroundColor: 'red',
          borderRadius: 10,
          fontSize: 20,
          textAlign: 'center',
          color: 'white'
        },
        view: {
          backgroundColor: 'red',
          borderRadius: 20,
          width: width * .8
        }
      })
    } else{
      this.setState({
        nothin: ''
      })
    }
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
      console.log('sheng wants to console log here')
      this.getData(() => {
        this.props.navigator.pop();
        this.CalorieCounter();
        });
      this.setState({
        refresh: 'true'
      })
    });
  }

  gotoNext(recipe, mealId, getData) {
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        mealId,
        getData: this.CalorieCounter.bind(this),
        postMeal: this.postMeal.bind(this),
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
        <View
          style={styles.container1}
        >
          <View
            style={styles.container2}
            elevation={3}
            >
              <Text style={styles.text}> {global._cals} </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getMealList().map((meal, i) => (
            <View style={styles.searchItemBorder} key={i}>
              <LoggedMeal
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

