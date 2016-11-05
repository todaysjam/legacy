import React from 'react';

// import packages
import { View, Dimensions, StyleSheet } from 'react-native';

// establish constants
const width = Dimensions.get('window').width;

// HeadBuffer Component
const HeadBuffer = () => (
  <View style={styles.buffer} />
); // end HeadBuffer Component

// stylesheet
const styles = StyleSheet.create({
  buffer: {
    width,
    height: 22,
    backgroundColor: '#1e90ff',
  },
}); // end styles

export default HeadBuffer;
