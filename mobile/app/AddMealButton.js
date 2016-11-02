import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import { Container, Content, FooterTab, Button, Title } from 'native-base';

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 40,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    borderRadius: 5,
    shadowColor: 'black',
    justifyContent: 'center',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 0.85,
  },
  container2: {
    width: 100,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 5,
  },
  text: {
    justifyContent: 'center',
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
    borderRadius: 5,
  },
});

const AddMealButton = ({ text, icon, onclick }) => { 
  return (
      <Container>
        <Content>
          <Button success> Add Me! </Button>
        </Content>       
      </Container>
  ) 
};

export default AddMealButton;
