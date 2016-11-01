import React from 'react';
import { View, Dimensions, Text, StyleSheet, Image } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Header, Title } from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width:width,
    marginBottom: 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:5,
    marginLeft: (width - 225)/2,

  },
  headline: {
    fontSize: 30,
    fontFamily: 'Futura',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
  brand: {
    width: 150,
    height: 46
  }
});

const LogoDisplay = () => (
  <Container style={styles.logo}>
        <Header>
          <Title style={styles.container}> <Image
              // source={{uri: 'https://www.shopify.com/tools/logo-maker/show/YmRaSWk0YWVPenY4ZDh1NHAxMHBXdz09LS1GNUhZaDd2YTFMaHBHNmtGQUJqeWZBPT0=--2c33990e4f83acbff27c5ab8787c2f81e1187508.png'}}
              source={require('../assets/brand.png')}
              style={styles.brand}
            >
            </Image></Title>
      </Header>
  </Container>
);

export default LogoDisplay;
