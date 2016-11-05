import React from 'react';
import {
  View,
  StyleSheet,
  TextInput,
  Dimensions,
} from 'react-native';
import { Container, Content, FooterTab, Button, Title } from 'native-base';

// establish constants
const width = Dimensions.get('window').width;

// stylesheet
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderBottomWidth: 2,
    borderColor: 'gray',
    width: width * 0.9,
    marginBottom: 5
  },
  Button: {
    backgroundColor: '#1e90ff',
    marginBottom: 5,
  }
}); //end styles

export default class Searchbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  } // end constructor

  render() {
    return (
      <View>
        <View style={styles.container}>
          <TextInput
            style={{ height: 40, width: width * 0.9 }}
            underlineColorAndroid="transparent"
            onChangeText={text => this.setState({ text })}
            placeholder="Search..."
          />
        </View>
        <Container >
          <Content>
            <Button  
              style={styles.Button}
              textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
              rounded block 
              onPress={
                () => this.props.enter(this.state.text)
              }> 
              Search 
            </Button>
          </Content>       
        </Container>
      </View>
    );
  } // end render
} // end Searchbar
