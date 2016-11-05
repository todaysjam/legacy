import React, { Component } from 'react';
import { PropTypes, ScrollView, StyleSheet, Text, TextInput, Dimensions, View } from 'react-native'
const width = Dimensions.get('window').width;
import { Button } from 'native-base'

export default class ControlPanel extends Component {
  // static propTypes = {
  //   closeDrawer: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.state={
      text: ''
    }
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Enter Your Target Calories</Text>
        <TextInput
        placeholder='Ex: 14000'    
        style={{height: 40, width: width * .4, color: 'black', marginLeft: 5}}
        placeholderTextColor='gray'
        underlineColorAndroid='gray'
        />
        <View>
          <Button
            style={{ width: width * .4}}
            textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
            rounded block 
            onPress={() => this.props.enter(this.state.text)}
            >
            Submit
          </Button>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: 'white',
    borderColor: 'black',
    borderWidth: 2,
    opacity: .9,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
  }
})
