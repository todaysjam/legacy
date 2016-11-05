import React from 'react';

// import packages
import { View, Text, StyleSheet } from 'react-native';

// Column Component
const Column = ({ data, name, index, alignRight }) => (
  <View style={alignRight ? styles.columnRight : styles.columnLeft}>
    <Text style={styles.head}>
      {name}
    </Text>
    {data.map((item, i) => (
      <Text
        key={i}
      >
        {
          !Number(item[index]) ? item[index] :
          Number(item[index]) % 1 === 0 ? item[index] :
          Number(Number(item[index]).toFixed(2)).toString()
        }
      </Text>
    ))}
  </View>
); // end Column Component

// stylesheet
const styles = StyleSheet.create({
  columnLeft: {

  },
  columnRight: {
    alignItems: 'flex-end',
  },
  head: {
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontSize: 18,
  },
}); // end styles

export default Column;
