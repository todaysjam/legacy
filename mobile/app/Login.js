import React from 'react';
import {
  AsyncStorage,
  StyleSheet,
  Text,
  Image,
  View,
  TouchableHighlight,
  Alert,
  Dimensions,
  KeyboardAvoidingView
} from 'react-native';
import t from 'tcomb-form-native';
import MealList from './MealList';
import { Components, Font } from 'exponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'dodgerblue',
  },
  logo: {
    marginTop: 40
  },
  brand: {
    width: width * .87,
    height: height * .15
  },
  KBAVcontainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  container: {
    justifyContent: 'center',
    // alignItems: 'center',
    alignSelf: 'center',
    marginTop: 30,
    width: width * 0.9,
    borderRadius: 15,
    flexDirection: 'column',
    // width: 150,
    // height: 300,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,.85)',
  },
  title: {
    fontSize: 55,
    fontFamily: 'Noteworthy-Bold',
    marginTop: 30,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    marginBottom: 40,
    color: 'white',
    opacity: 1,
    textAlign: 'center',
    textShadowColor: 'black',
    textShadowRadius: 1,
    textShadowOffset: {
      width: 1.5,
      height: 2,
    },
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Futura-CondensedExtraBold',
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: 'dodgerblue',
    borderColor: 'dodgerblue',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  backgroundImage: {
    flex: 1,
    opacity: .95
  },
  footer: {
    marginTop: 50,
    paddingTop: 60
  },
  footerText: {
    color: 'white',
    fontSize: 10
  },
  form: {
    borderColor: 'red'
  }
});
// ENV Variables
const loginUrl = 'https://mealdotlegacy.herokuapp.com/api/user/authenticate';
const signupUrl = 'https://mealdotlegacy.herokuapp.com/api/user';
const Form = t.form.Form;
const Person = t.struct({
  username: t.String,
  password: t.String,
});
const options = {
  fields: {
    username: {
      auto: 'placeholders',
      placeholder: 'Username',
      autoCapitalize: 'none',
    },
    password: {
      secureTextEntry: true,
      auto: 'placeholders',
      error: 'incorrect login information'
    }
  }
};


const onValueChange = async (item, selectedValue) => {
  try {
    await AsyncStorage.setItem(item, selectedValue);
  } catch (error) {
    console.log(`AsyncStorage error: ${error.message}`);
  }
};

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.userInfo = null;
    this.state = {
      behavior: 'padding',
      fontLoaded: false,
    }
  }


  gotoNext() {
    this.props.navigator.push({
      component: MealList,
      passProps: {
      },
    });
  }

  // login() {
  //   AsyncStorage.getItem('userId', (err, result) => {
  //     this.setState( { userId: result });
  //   });
  //   AsyncStorage.getItem('token', (err, result) => {
  //     this.setState( { token: result });
  //   });
  // }

  authUser(url) {
    console.log('I AM HERE');
    const value = this.refs.form.getValue();
    if (value) {
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: value.username,
          password: value.password,
        }),
      })
      .then(response => response.json())
      .then((responseData) => {
        console.log('Sheng: ', responseData);
        const token = responseData.token;
        const userId = responseData.userId;
        onValueChange('token', token);
        onValueChange('userId', userId);
        this.props.updateToken(token);
        this.props.updateUserId(userId);
        this.gotoNext();
      })
      .catch(() => {
        Alert.alert('incorrect login information');
      })
      .done();
    }
  }

  // custom fonts are not importing correctly
  // async ComponentDidMount() {
  //   await Font.loadAsync({
  //     'Courgette-Regular': require('../assets/Courgette-Regular.ttf'),
  //   });
  //   this.setState({ fontLoaded: true });
  // }

// tried to preload the image, this still stutters, but stutters consistenly, versus the other which can potentially be faster, or slower depending on async load in the off-thread
// componentWillMount() {
//   this.image = (<Image source={require('../assets/brand.png')} />);
// }

  render() {
    return (

      <Components.LinearGradient 
        colors={['#1E90FF', '#399af9', '#63b2ff']}
        style={styles.main}>
          <KeyboardAvoidingView behavior={this.state.behavior} style={styles.KBAVcontainer}>
            <View style={styles.logo}>
              <Image
                // source={{uri: 'https://www.shopify.com/tools/logo-maker/show/YmRaSWk0YWVPenY4ZDh1NHAxMHBXdz09LS1GNUhZaDd2YTFMaHBHNmtGQUJqeWZBPT0=--2c33990e4f83acbff27c5ab8787c2f81e1187508.png'}}
                source={require('../assets/brand.png')}
                style={styles.brand}
              >
              </Image>
            </View>
            <View style={styles.container}>
              <View style={styles.form}>
                <Form
                style={styles.form}
                  ref="form"
                  type={Person}
                  options={options}
                />
              </View>
              <View style={styles.row}>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.authUser(loginUrl)}
                  underlayColor="#0876e0"
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={styles.button}
                  onPress={() => this.authUser(signupUrl)}
                  underlayColor="#0876e0"
                >
                  <Text style={styles.buttonText}>Signup</Text>
                </TouchableHighlight>
              </View>
            </View>
          </KeyboardAvoidingView>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Brought to you by Jamz&trade;</Text>
          </View>
      </Components.LinearGradient>
    );
  }
}
