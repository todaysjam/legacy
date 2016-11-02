// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';

import { Container, Content, Footer, FooterTab, Button, Header } from 'native-base';
import { Entypo, EvilIcons, FontAwesome, Foundation, Ionicons, MaterialIcons, Octicons, Zocial } from '@exponent/vector-icons';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  nothing: {
    flex: 0,
    backgroundColor: '#1e90ff'
  }
});

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const NavBar = (props) => {
  if (props.navigator.getCurrentRoutes().length > 1) {
    return (
      <Container style={styles.nothing}>
        <Footer>
          <FooterTab>
            <Button onPress={() => moveTo(props.navigator, MealList)}>
              <Ionicons name="ios-heart" size={32} color="white" />
            </Button>
            <Button onPress={() => moveTo(props.navigator, ShoppingList)}>
              <Ionicons name="ios-basket" size={32} color="white" />
            </Button>
            <Button onPress={() => moveTo(props.navigator, AddMeal)}>
              <Ionicons name="ios-flower" size={32} color="white" />
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  return null;
};


export default NavBar;