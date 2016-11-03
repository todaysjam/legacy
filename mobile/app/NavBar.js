// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';

import { Button, Container, Content, Footer, FooterTab, Header } from 'native-base';
import { Entypo, EvilIcons, FontAwesome, Foundation, Ionicons, MaterialIcons, Octicons, Zocial } from '@exponent/vector-icons';
//the css property of the components within Footer FooterTab can't be 
//set by the props of each single item
//they are all set throught a Theme file, which is the value of the props.theme of Footer, FooterTab
import Theme from './Theme';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nothing: {
    flex: 0,
    backgroundColor: '#1e90ff'
  }
});

export default class NavBar extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      buttonState: [true, false, false]
    };
  } // end constructor

  moveTo(navigator, component, index) {
    if (index === 0 ) {
      this.setState({buttonState: [true, false, false]});
    } else if (index === 1 ) {
      this.setState({buttonState: [false, true, false]});
    } else if (index === 2 ) {
      this.setState({buttonState: [false, false, true]});
    }
    navigator.replace({ component });
  }

  render() {
    if (this.props.navigator.getCurrentRoutes().length > 1) {
      return (
        <Container style={styles.nothing}>
          <Footer theme={Theme}>
            <FooterTab theme={Theme}>
              <Button active={this.state.buttonState[0]} onPress={this.moveTo.bind(this, this.props.navigator, MealList, 0)}>
                <Ionicons name="ios-heart"/>
              </Button>
              <Button active={this.state.buttonState[1]} onPress={this.moveTo.bind(this, this.props.navigator, ShoppingList, 1)}>
                <Ionicons name="ios-cart"/>
              </Button>
              <Button active={this.state.buttonState[2]} onPress={this.moveTo.bind(this, this.props.navigator, AddMeal, 2)}>
                <Ionicons name="ios-flower"/>
              </Button>
            </FooterTab>
          </Footer>
        </Container>
      );
    }
    return null;
  }
}