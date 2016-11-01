import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
})

export default class ShoppingListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }

  render() {
    return (
      <ListItem style={styles.table}>
        <CheckBox 
          checked={this.state.checked}
          onPress={()=> this.setState({checked: !this.state.checked})}/>
        <Text>{this.props.item[0]} {this.props.item[1]} {this.props.item[2]}</Text>
      </ListItem>
    );
  }
}