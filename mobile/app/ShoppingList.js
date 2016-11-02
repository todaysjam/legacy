import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import LogoDisplay from './LogoDisplay';
import Column from './Column';
import HeadBuffer from './HeadBuffer';
import ShoppingListItem from './ShoppingListItem';
import { Container, Content, List } from 'native-base';

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
          checked: ingredient.checked
        };
      }
    });
  });

  Object.entries(result).forEach(([ingredient, amount]) => {
    console.log(amount.checked)
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
  }
});

export default class ShoppingList extends React.Component {
  constructor(props) {
    super(props);
    this.shoppingList = compileList(this.props.getMealList());
  }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay />
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
    );
  }
}

