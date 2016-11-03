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
      width: 200,
      height: 200,
  },
});

/* eslint-disable no-param-reassign */
const compileNutrition = (data) => {
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
};
/* eslint-enable no-param-reassign */
//423
const data = [
    [0, 148.08104399999996], //35%
    [148.08104399999996, 40.361999999999995], //9.5%
    [40.361999999999995, 235.76718799999998] //55
];

const InfoDisplay = props => (
  <View style={styles.container}>
    <HeadBuffer />
    <HeaderDisplay recipe={props.recipe} />
    <ScrollView contentContainerStyle={styles.scroller}>
      <Image
        style={styles.picture}
        source={{ uri: props.recipe.image }}
      />
      {console.log(compileNutrition(props.recipe.digest))}
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
          data={props.recipe.ingredients}
          name="Ingredients"
          index="food"
        />
        <Column
          data={props.recipe.ingredients}
          name="Qty"
          index="quantity"
          alignRight
        />
        <Column
          data={props.recipe.ingredients}
          name="Unit"
          index="measure"
          alignRight
        />
      </View>

      <View style={styles.table}>
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Nutrition"
          index="label"
        />
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Qty"
          index="totalUnit"
          alignRight
        />
        <Column
          data={compileNutrition(props.recipe.digest)}
          name="Daily%"
          index="dailyPercent"
          alignRight
        />
      </View>
      <View style={styles.container}>
          <Chart
              style={styles.chart}
              data={data}
              type="pie"
              showDataPoint={true}
           />
      </View>

    </ScrollView>
  </View>
);

export default InfoDisplay;


