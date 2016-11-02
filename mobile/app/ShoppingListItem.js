import React from 'react';
import { StyleSheet, Dimensions, AsyncStorage } from 'react-native';
import { Container, Content, List, ListItem, Text, CheckBox } from 'native-base';

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
});

export default class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.setCheck = this.setCheck.bind(this)
    this.state = {
      checked: false
    }
  }
  componentDidMount() {
    AsyncStorage.getItem(this.props.item[3]).then( (value) => {
      console.log('value', value)
      this.setState({checked: value})
      console.log('state', this.state.checked)
    })
  }

  setCheck () {
    AsyncStorage.setItem(this.props.item[3], JSON.stringify(!this.state.checked))
    .then(console.log(!this.state.checked))
    .then(console.log(AsyncStorage.getItem(this.props.item[3])))
    .then(this.setState({checked: !this.state.checked}))
    .then(console.log(this.state.checked))
  }

  render() {
    return (
      <ListItem style={styles.table}>
        <CheckBox 
          checked={this.state.checked}
          onPress={this.setCheck}/>
        <Text>{this.props.item[0]} {this.props.item[1]} {this.props.item[2]}</Text>
      </ListItem>
    );
  }
}