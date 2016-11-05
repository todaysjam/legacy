import React, { Component } from 'react';
import { PropTypes, ScrollView, StyleSheet, Text, TextInput, Dimensions } from 'react-native'

const width = Dimensions.get('window').width;
export default class ControlPanel extends Component {
  // static propTypes = {
  //   closeDrawer: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Close Drawer</Text>
        <TextInput
        placeholder='Enter your calories'    
        style={{height: 40, width: width * .4}}
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#E8E8EE',
    borderColor: 'black',
    borderWidth: 2
  },
  controlText: {
    color: 'white',
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
  }
})
