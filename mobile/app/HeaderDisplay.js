import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';

// establish constants
const width = Dimensions.get('window').width;

// stylesheet
const styles = StyleSheet.create({
  logo: {
    width,
    height: 44,
    backgroundColor: '#1e90ff',
    borderBottomWidth: 2,
    borderColor: '#1e90ff',
    alignItems: 'center',
  },
  headline: {
    fontSize: 30,
    fontFamily: 'Futura',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
}); //end styles

const HeaderDisplay = ({ recipe }) => (
  <View style={styles.logo}>
    <Text style={styles.headline}>
      {recipe.label}
    </Text>
  </View>
); // end HeaderDisplay

export default HeaderDisplay;
