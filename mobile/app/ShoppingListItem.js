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
});

export default class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.setCheck = this.setCheck.bind(this)
    this.state = {
      checked: false
    }
  }

  render() {
    return (
      <ListItem style={styles.table}>
        <CheckBox 
          className=""
          checked={this.state.checked}
          onPress={this.setCheck}/>
        <Text>{this.props.item[0]} {this.props.item[1]} {this.props.item[2]}</Text>
      </ListItem>
    );
  }

  setCheck () {
    this.setState({checked: !this.state.checked})
  }
  
}