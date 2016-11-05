import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import LogoDisplay from './LogoDisplay';
import Column from './Column';
import HeadBuffer from './HeadBuffer';
import ShoppingListItem from './ShoppingListItem';
import { Container, Content, List } from 'native-base';
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';
const width = Dimensions.get('window').width;


const compileList = (meals) => {
  const result = {};
  const list = [];
  const recipes = meals.map(meal => meal.recipe);

  recipes.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (ingredient.food in result) {
        result[ingredient.food].quantity += ingredient.quantity;
      } else {
        result[ingredient.food] = {
          quantity: ingredient.quantity,
          measure: ingredient.measure,
          checked: ingredient._id
        };
      }
    });
  });

  Object.entries(result).forEach(([ingredient, amount]) => {
    list.push([amount.quantity, amount.measure, ingredient, amount.checked]);
  });
  return list;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
  },
  Title: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize:24
  },
  drawer: {
    shadowColor: '#000000', 
    shadowOpacity: 0.3, 
    shadowRadius: 15
  }
});

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.shoppingList = compileList(this.props.getMealList());
    this.state={
      drawerOpen: false,
      drawerDisabled: false,
    }
  }

  closeDrawer() {
    this.refs.drawer.close()
  }

  openDrawer() {
    this.refs.drawer.open()
  }
  render() {
    return (
      <Drawer
        ref="drawer"
        type="overlay"
        content={
          <ControlPanel closeDrawer={this.closeDrawer.bind(this)} />
        }
        //need to think what is the best way to close it;
        acceptTap={true}
        tapToClose={true}
        captureGestures={true}
        style={styles.drawer}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={() => width *.5}
        closedDrawerOffset={() => 0}
        panOpenMask={0}
        panCloseMask={0.5}
        negotiatePan
        >
          <View style={styles.container}>
            <HeadBuffer />
            <LogoDisplay openDrawer={this.openDrawer.bind(this)}/>
            <Text style={styles.Title}>Weekly Ingredients!</Text>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
            >
              <Container>
                <Content>
                    <List>
                      {this.shoppingList.map((item, i) => (
                        <ShoppingListItem key={i} item={item} />
                        ))}
                    </List>
                </Content>
              </Container>
            </ScrollView>
          </View>
        </Drawer>
      );
  }
}

