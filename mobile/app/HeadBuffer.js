import React from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';

// establish constants
const width = Dimensions.get('window').width;

// stylesheet
const styles = StyleSheet.create({
  buffer: {
    width,
    height: 22,
    backgroundColor: '#1e90ff',
  },
}); // end styles

const HeadBuffer = () => (
  <View style={styles.buffer} />
); // end HeadBuffer

export default HeadBuffer;
