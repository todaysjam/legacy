import React from 'react';
import { View, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Header, Title } from 'native-base';

import { Ionicons } from '@exponent/vector-icons';

// constants definition
const width = Dimensions.get('window').width;

// stylesheet definition
const styles = StyleSheet.create({
  logo: {
    width:width,
    flex: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: (width - 300)/2,

  },
  headline: {
    backgroundColor: '#1E90FF',
  },
  brand: {
    width: 150,
    height: 46
  }
}); // end of stylesheet definition

const LogoDisplay = (props) => (
  <Container style={styles.logo}>
    <Header style={styles.headline}>
      <Button transparent onPress={props.openDrawer}>
        <Ionicons name='ios-body' size={32} color='#F8F8F8'/>
      </Button>   
      <Title style={styles.container}>
        <Image
        // source={{uri: 'https://www.shopify.com/tools/logo-maker/show/YmRaSWk0YWVPenY4ZDh1NHAxMHBXdz09LS1GNUhZaDd2YTFMaHBHNmtGQUJqeWZBPT0=--2c33990e4f83acbff27c5ab8787c2f81e1187508.png'}}
          source={require('../assets/brand.png')}
          style={styles.brand} 
        />
      </Title>
    </Header>
  </Container>
);  // end of LogoDisplay component definition

export default LogoDisplay;
