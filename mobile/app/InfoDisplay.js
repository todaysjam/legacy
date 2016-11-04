import React from 'react';
import {
  ScrollView,
  View,
  Image,
  Dimensions,
  StyleSheet,
  Text
} from 'react-native';
import HeaderDisplay from './HeaderDisplay';
import Button from './Button';
import Column from './Column';
import HeadBuffer from './HeadBuffer';
import Chart from 'react-native-chart';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: width * 0.9,
    marginTop: 10,
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  picture: {
    width: width * 0.9,
    height: 250,
    opacity: 1,
    borderRadius: 5,
    marginTop: 10,
  },
  click: { fontSize: 30 },
  table: {
    width: width * 0.9,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  scroller: {
    marginBottom: 50,
  },
  caloriesB: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  calories: {
    fontSize: 20,
  },
  chart: {
      width: width * 0.75,
      height: 300,
  },
});

export default class InfoDisplay extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   data: []  
    // }
  }

  /* eslint-disable no-param-reassign */
  compileNutrition(data) {
    const result = [];
    data.forEach((item, i) => {
      if(i < 6){
        result.push(item);
        if (item.sub) {
          item.sub.forEach((subItem) => {
            subItem.label = ` ${subItem.label}`;
            result.push(subItem);
          });
        } 
      }
    });
    result.forEach((item) => {
      const totalUnit = Math.round(Number(Number(item.total).toFixed(2)).toString()) + item.unit;
      item.totalUnit = totalUnit;
      const dailyPercent = `${Math.round(Number(Number(item.daily).toFixed(1)).toString())}%`;
      item.dailyPercent = dailyPercent;
    });
    return result;
  }
/* eslint-enable no-param-reassign */

  getMacro (macro) {
    this.compileNutrition(this.props.recipe.digest
      .filter(item => item.label === macro)
      .map(nutrient => nutrient.total)
    )
  }

  // componentDidMount() {
  //   const fat = Math.round(this.getMacro('Fat'))
  //   const carbs = Math.round(this.getMacro('Carbs'))
  //   const protein = Math.round(this.getMacro('Protein'))
  //   this.setState({data: [[0, fat], [fat, carbs], [carbs, protein]]});
  // }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <HeaderDisplay recipe={this.props.recipe} />
        <ScrollView contentContainerStyle={styles.scroller}>
          <Image
            style={styles.picture}
            source={{ uri: this.props.recipe.image }}
          />
          <View style={styles.buttonContainer}>
            <Button
              onclick={() => { this.props.postMeal(this.props.recipe._id, this.props.mealId); }} // eslint-disable-line
              text={this.props.text}
            />
            <Button
              onclick={() => { this.props.navigator.pop(); }}
              text="Back"
            />
          </View>
          
          <View style={styles.table}>
            <Text style={styles.caloriesB}>Calories:</Text>
            <Text style={styles.calories}>{Math.round(this.props.recipe.calories)}</Text>
          </View>

      <View style={styles.buttonContainer}>
        <Button
          onclick={() => { 
            props.postMeal(props.recipe._id, props.mealId);
           }} // eslint-disable-line
          text={props.text}
        />
        <Button
          onclick={() => { props.navigator.pop(); }}
          text="Back"
        />
      </View>
      
      <View style={styles.table}>
        <Text style={styles.caloriesB}>Calories:</Text>
        <Text style={styles.calories}>{Math.round(props.recipe.calories)}</Text>
      </View>
          <View style={styles.table}>
            <Column
              data={this.props.recipe.ingredients}
              name="Ingredients"
              index="food"
            />
            <Column
              data={this.props.recipe.ingredients}
              name="Qty"
              index="quantity"
              alignRight
            />
            <Column
              data={this.props.recipe.ingredients}
              name="Unit"
              index="measure"
              alignRight
            />
          </View>

          <View style={styles.table}>
            <Column
              data={this.compileNutrition(this.props.recipe.digest)}
              name="Nutrition"
              index="label"
            />
            <Column
              data={this.compileNutrition(this.props.recipe.digest)}
              name="Qty"
              index="totalUnit"
              alignRight
            />
            <Column
              data={this.compileNutrition(this.props.recipe.digest)}
              name="Daily%"
              index="dailyPercent"
              alignRight
            />
          </View>

          <View style={styles.container}>
              <Chart
                  style={styles.chart}
                  // data={this.state.data}
                  data={[
                    [0, this.getMacro('Fat')],
                    [this.getMacro('Fat'), this.getMacro('Carbs')],
                    [this.getMacro('Carbs'), this.getMacro('Protein')]
                  ]}
                  type="pie"
                  showDataPoint={true}
               />
          </View>

        </ScrollView>
      </View>
    );
  }
}



