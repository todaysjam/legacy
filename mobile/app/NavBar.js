// https://github.com/facebook/react-native/blob/b998e5a7b74905b30b1137a02e14cd5e6f97fccc/Libraries/CustomComponents/Navigator/Navigator.js
import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MealList from './MealList';
import ShoppingList from './ShoppingList';
import AddMeal from './AddMeal';

import { Container, Content, Footer, FooterTab, Button, Icon } from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    marginTop: 0
  },
});

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

const NavBar = (props) => {
  if (props.navigator.getCurrentRoutes().length > 1) {
    return (
       <Container style={styles.container}>
                <Content />

                <Footer >
                    <FooterTab>
                        <Button
                          icon="md-list-box"
                          onPress={() => moveTo(props.navigator, MealList)} 
                          >
                            Food

                        </Button>
                        <Button
                          icon="md-basket"
                          onPress={() => moveTo(props.navigator, ShoppingList)}
                          >
                            Calories
                        </Button>
                        <Button 
                          icon="md-add-circle"
                          onPress={() => moveTo(props.navigator, AddMeal)}
                          >
                            AddMeal
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
    );
  }
  return null;
};

export default NavBar;