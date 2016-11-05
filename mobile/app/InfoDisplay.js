import React from 'react';

// import packages
import { ScrollView, View, Image, Dimensions, StyleSheet, Text } from 'react-native';
import Chart from 'react-native-chart';

// import components
import HeaderDisplay from './HeaderDisplay';
import Button from './Button';
import Column from './Column';
import HeadBuffer from './HeadBuffer';

// establish constants
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// InfoDisplay Component
export default class InfoDisplay extends React.Component {
  constructor(props) {
    super(props);
  } // end constructor

  /* eslint-disable no-param-reassign */
  // grabs nutrition data and compiles into human friendly format
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
  } // end compileNutrition

/* eslint-enable no-param-reassign */
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
              onclick={() => { 
                this.props.postMeal(this.props.recipe._id, this.props.mealId);
               }} // eslint-disable-line
              text={this.props.text}
            />
            <Button
              onclick={() => { this.props.navigator.pop(); }}
              text="Back"
            />
          </View>
          
          <View style={styles.table}>
            <View style={styles.calorieRow}>
              <Text style={styles.caloriesText}>Calories:</Text>
              <Text style={styles.calories}>{Math.round(this.props.recipe.calories)}</Text>
            </View>
            <View style={styles.calorieRow}>
              <Text style={styles.fatText}>Fat:</Text>
              <Text style={styles.fat}>{Math.round(this.props.nutrients[0][1])}g</Text>
            </View>
            <View style={styles.calorieRow}>
              <Text style={styles.carbsText}>Carbs:</Text>
              <Text style={styles.carbs}>{Math.round(this.props.nutrients[1][1])}g</Text>
            </View>
            <View style={styles.calorieRow}>
              <Text style={styles.proteinText}>Protein:</Text>
              <Text style={styles.protein}>{Math.round(this.props.nutrients[2][1])}g</Text>
            </View>
          </View>
          <View style={styles.container}>
              <Chart
                  style={styles.chart}
                  data={[
                    [0, this.props.nutrients[0][1]],
                    [this.props.nutrients[0][1], this.props.nutrients[1][1]],
                    [this.props.nutrients[1][1], this.props.nutrients[2][1]]
                  ]}
                  type="pie"
                  showDataPoint={false}
                  showXAxisLabels={false}
                  sliceColors={['#669900', '#ff9933', '#ff6666']}
                  axisLineWidth={0}
                  axisLabelColor={'#fff'}
              />
          </View>
          
          <View style={styles.nutrition}>
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

          <View style={styles.nutrition}>
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

        </ScrollView>
      </View>
    );
  } // end render
} // end InfoDisplay

// stylesheet
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
    flexDirection: 'column',
    borderWidth: 2,
    borderColor: '#1e90ff',
    borderRadius: 5,
    padding: 5,
    marginTop: 10,
  },
  nutrition: {
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
  calorieRow: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  caloriesText: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  calories: {
    fontSize: 20,
  },
  protein: {
    color: '#ff6666'
  },
  proteinText: {
    color: '#ff6666',
    fontWeight: 'bold'
  },
  fat: {
    color: '#669900'
  },
  fatText: {
    color: '#669900',
    fontWeight: 'bold'
  },
  carbs: {
    color: '#ff9933'
  },
  carbsText: {
    color: '#ff9933',
    fontWeight: 'bold',
  },
  chart: {
    width: width * 0.7,
    height: height * 0.35,
    justifyContent: 'center',
    padding: 10,
    marginRight: 25,
    paddingRight: 25
  },
}); //end styles
