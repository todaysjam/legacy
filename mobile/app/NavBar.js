import React from 'react';

// import packages
import { StyleSheet, View, Dimensions, Text, AsyncStorage } from 'react-native';
import { Button, Container, Content, Footer, FooterTab, Icon, Header } from 'native-base';

// import components
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';

//the css property of the components within Footer FooterTab can't be 
//set by the props of each single item
//they are all set throught a Theme file, which is the value of the props.theme of Footer, FooterTab
import Theme from './Theme';

// establish constants
const width = Dimensions.get('window').width;

// NavBar Component
export default class NavBar extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      buttonState: [true, false, false]
    };
  } // end constructor

  calorieCounter() {
    var calor = 0;
    AsyncStorage.getItem('userId', (err,value) => {
      AsyncStorage.getItem(value, (err, calorie) => {
        if(calorie !== null){
        global._count = JSON.parse(calorie);
      }
      global._cals = ('Weekly Calories Consumed: ' + Math.round(calor) + '/' + (global._count || 14000));
      });
    });
  } // end CalorieCounter

  // for navigation within navBar
  moveTo(navigator, component, index) {
    if (index === 0 ) {
      this.setState({buttonState: [true, false, false]});
    } else if (index === 1 ) {
      this.setState({buttonState: [false, true, false]});
    } else if (index === 2 ) {
      this.setState({buttonState: [false, false, true]});
    }
    const self = this;
    AsyncStorage.getItem('userId', (error, userId) => {
      navigator.replace({ 
        component: component,
        passProps: {
          userId: userId,
          updateCalories: self.calorieCounter
        }
      });
    });
  } // end moveTo

  render() {
    if (this.props.navigator.getCurrentRoutes().length > 1) {
      return (
        <Container style={styles.nothing}>
          <Footer theme={Theme}>
            <FooterTab theme={Theme}>
              <Button active={this.state.buttonState[0]} onPress={this.moveTo.bind(this, this.props.navigator, MealList, 0)}>
                meals
                <Icon name="heart"/>
              </Button>
              <Button active={this.state.buttonState[1]} onPress={this.moveTo.bind(this, this.props.navigator, ShoppingList, 1)}>
                grocery
                <Icon name="shopping-cart"/>
              </Button>
              <Button active={this.state.buttonState[2]} onPress={this.moveTo.bind(this, this.props.navigator, AddMeal, 2)}>
                recipes
                <Icon name="bowl"/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
    return null;
  } // end render
} // end NavBar Component

// stylesheet
const styles = StyleSheet.create({
  nothing: {
    flex: 0,
    backgroundColor: '#1e90ff'
  }
}); //end styles
