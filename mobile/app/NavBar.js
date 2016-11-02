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

const moveTo = (navigator, component) => {
  navigator.replace({ component });
};

// const NavBar = (props) => {
//   if (props.navigator.getCurrentRoutes().length > 1) {
//     return (
//       <Container style={styles.nothing}>
//         <Footer theme={Theme}>
//           <FooterTab theme={Theme}>
//             <Button active={false} onPress={() => moveTo(props.navigator, MealList)}>
//               <Ionicons name="ios-heart"/>
//             </Button>
//             <Button onPress={() => moveTo(props.navigator, ShoppingList)}>
//               <Ionicons name="ios-cart"/>
//             </Button>
//             <Button onPress={() => moveTo(props.navigator, AddMeal)}>
//               <Ionicons name="ios-flower"/>
//             </Button>
//           </FooterTab>
//         </Footer>
//       </Container>
//     );
//   }
//   return null;
// };

// export default NavBar;

export default class NavBar extends React.Component { 
  moveTo(navigator, component) {
    navigator.replace({ component });
  }

  render() {
    if (props.navigator.getCurrentRoutes().length > 1) {
      return (
        <Container style={styles.nothing}>
          <Footer theme={Theme}>
            <FooterTab theme={Theme}>
              <Button active={false} onPress={this.moveTo.bind(this.props.navigator, MealList)}>
                <Ionicons name="ios-heart"/>
              </Button>
              <Button onPress={() => moveTo(props.navigator, ShoppingList)}>
                <Ionicons name="ios-cart"/>
              </Button>
              <Button onPress={() => moveTo(props.navigator, AddMeal)}>
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