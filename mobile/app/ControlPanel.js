import React, { Component } from 'react';
import { PropTypes, ScrollView, StyleSheet, Text, TextInput, Dimensions, View } from 'react-native'
const width = Dimensions.get('window').width;
import { Button } from 'native-base';
import { Button, Radio, List, ListItem, Container, Content } from 'native-base'

export default class ControlPanel extends Component {
  // static propTypes = {
  //   closeDrawer: PropTypes.func.isRequired
  // };
  constructor(props) {
    super(props);
    this.onGenderSelect = this.onGenderSelect.bind(this);
    this.Calculate = this.Calculate.bind(this);
    this.state={
      text: '',
      age: '',
      weight: '',
      feet: '',
      Inches: '',
      gender: 'male'
    }
  }
  onGenderSelect(e){
    this.setState({
      gender: e.currentTarget.value
    })
  }
  Calculate(){

<<<<<<< 823a9e65c15dad06e49689b9dcb7885236f15233
  changeGlobalCalories() {
    global._globalCaloriesCount = parseInt(this.state.text);
    this.props.updateCalories();
    console.log('global calories: ', global._globalCaloriesCount);
  }

=======
  }
>>>>>>> drawer adds
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Enter Your Calorie Info</Text>
         <TextInput
        placeholder='Enter Age'    
        style={{height: 40, width: width * .4, color: 'black', marginLeft: 5}}
        placeholderTextColor='gray'
        underlineColorAndroid='gray'
        />
         <TextInput
        placeholder='Enter Weight'    
        style={{height: 40, width: width * .4, color: 'black', marginLeft: 5}}
        onChangeText={text => this.setState({ text: text })}
        placeholderTextColor='gray'
        underlineColorAndroid='gray'
        />
        <Text> Enter Height</Text>
        <TextInput
        placeholder='Feet'    
        style={{height: 40, width: width * .2, color: 'black', marginLeft: 5}}
        textStyle={{fontSize: 12}}
        placeholderTextColor='gray'
        underlineColorAndroid='gray'
        />
        <TextInput
        placeholder='Inches'    
        style={{height: 40, width: width * .2, color: 'black', marginLeft: 5}}
        textStyle={{fontSize: 12}}
        placeholderTextColor='gray'
        underlineColorAndroid='gray'
        />
        <Text>Gender</Text>
        <Container>
          <Content>
          <List>
            <ListItem>
              <Radio
                selected={true}
                value='male'
                onPress={this.onGenderSelect}
              />
              <Text>Male</Text>
            </ListItem>
            <ListItem>
              <Radio
              selected={false}
              value='female'
              onPress={this.onGenderSelect}
              />
              <Text>Female</Text>
            </ListItem>
          </List>
          </Content>
        </Container>
        <View>
          <Button
            style={{ width: width * .4, height: 20, backgroundColor: 'gray'}}
            textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
            rounded  
            onPress={() => this.props.enter(this.state.text)}
            >
            Calculate
          </Button>
          <Text style={{marginTop: 20}}>Reccomended Calories</Text>
          <TextInput
            placeholder='Ex:14000'    
            style={{height: 40, width: width * .4, color: 'black', marginLeft: 5}}
            placeholderTextColor='gray'
            underlineColorAndroid='gray'
            />
          <Button
            style={{ width: width * .4, height: 30}}
            textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
<<<<<<< 823a9e65c15dad06e49689b9dcb7885236f15233
            rounded block 
            onPress={() => this.changeGlobalCalories()}
=======
            rounded  
            onPress={() => this.props.enter(this.state.text)}
>>>>>>> drawer adds
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
