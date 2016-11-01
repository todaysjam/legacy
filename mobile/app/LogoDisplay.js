import React from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Header, Title } from 'native-base';

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  logo: {
    width:width,
    marginBottom: 0
  },
  headline: {
    fontSize: 30,
    fontFamily: 'Futura',
    marginTop: 2,
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white',
  },
});

const LogoDisplay = () => (
  <Container style={styles.logo}>
        <Header>
          <Title>Header</Title>
      </Header>
  </Container>
);

export default LogoDisplay;
