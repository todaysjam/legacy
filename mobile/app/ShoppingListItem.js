import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Container, Content, List, ListItem, Text, CheckBox, AsyncStorage } from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  table: {
    width: width * 0.9,
    marginBottom: 4,
    flexDirection: 'row',
    borderColor: 'lightblue',
    padding: 5,
    marginTop: 10,
  }
})

export default class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.saveCheck = this.saveCheck.bind(this)
    this.state = {
      checked: false
    }
  }

  render() {
    return (
      <ListItem style={styles.table}>
        <CheckBox 
          checked={this.state.checked}
          onPress={this.saveCheck}/>
        <Text>{this.props.item[0]} {this.props.item[1]} {this.props.item[2]}</Text>
      </ListItem>
    );
  }

  // componentWillMount () {
  //   // AsyncStorage.getItem(this.props.key).then((value) => {
  //   //     this.setState({checked: value});
  //   // }).done();
  // }

  saveCheck () {
    console.log(this.state.checked)
    this.setState({checked: !this.state.checked})
    AsyncStorage.setItem('checked', JSON.stringify(this.state.checked))
    // .then((obj) => if (obj) 
    // if (,
    //   (error) => console.log(error)
    // );
  }
}