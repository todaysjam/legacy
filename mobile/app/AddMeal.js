import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions} from 'react-native';
import MealTile from './MealTile';
import Searchbar from './Searchbar';
import LogoDisplay from './LogoDisplay';
import InfoDisplay from './InfoDisplay';
import HeadBuffer from './HeadBuffer';
import Buttony from './Button'
import { Container, Content, FooterTab, Button, Title } from 'native-base';
import Drawer from 'react-native-drawer';
import ControlPanel from './ControlPanel';

const width = Dimensions.get('window').width;
const recipeUrl = 'https://mealdotlegacy.herokuapp.com/api/recipe/';
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  searchItemBorder:{
    borderRadius: 8,
    backgroundColor:'#1e90ff',
    borderColor: '#1e90ff',
    marginBottom: 5
  },
  break:{
    marginTop: 30
  },
  smallBreak: {
    marginTop: 5
  },
  Button: {
    backgroundColor: 'white',
    marginBottom: 5,
  },
  Title: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize:24
  },
  drawer: {
    shadowColor: '#000000', 
    shadowOpacity: 0.3, 
    shadowRadius: 15
  }

});

export default class AddMeal extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.state={
      drawerOpen: false,
      drawerDisabled: false,
    }
  }


  closeDrawer() {
    this.refs.drawer.close()
  }

  openDrawer() {
    this.refs.drawer.open()
  }
  getData(searchString) {
    fetch(recipeUrl + searchString, {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      if (data) {
        this.props.updateSearchRecipes(data);
      }
    }).done();
  }

  postMeal(recipeId) {
    fetch(mealUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': this.props.getToken(),
      },
      body: JSON.stringify({
        userId: this.props.getUserId(),
        recipeId,
      }),
    })
    .then(() => {
    })
  }

  gotoNext(recipe) {
    const nutrients = recipe.digest.map(nutrient => [nutrient.label, nutrient.total])
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        nutrients,
        postMeal: this.postMeal,
        text: 'Add',
      },
    });
  }

  render() {
    return (
       <Drawer
        ref="drawer"
        type="overlay"
        content={
          <ControlPanel closeDrawer={this.closeDrawer.bind(this)} />
        }
        //need to think what is the best way to close it;
        acceptTap={true}
        tapToClose={true}
        captureGestures={true}
        style={styles.drawer}
        onOpen={() => {
          console.log('onopen')
          this.setState({drawerOpen: true})
        }}
        onClose={() => {
          console.log('onclose')
          this.setState({drawerOpen: false})
        }}
        
        tweenDuration={100}
        panThreshold={0.08}
        disabled={this.state.drawerDisabled}
        openDrawerOffset={() => width *.5}
        closedDrawerOffset={() => 0}
        panOpenMask={0.2}
        panCloseMask={0.2}
        negotiatePan
        >
          <View style={styles.container}>
            <HeadBuffer />
            <LogoDisplay style={styles.marginBottom} />
            <Text style={styles.Title}>Add a Meal!</Text>
            <Searchbar style={styles.search} enter={this.getData} />
            <View style={styles.break}></View>
            <ScrollView
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              alwaysBounceVertical

            >
              {this.props.getSearchRecipes().map((meal, i) => (
                <View style={styles.searchItemBorder} key={i}>
                  <MealTile
                    recipe={meal}
                    showInfo={this.gotoNext}
                    />
                    <Container style={styles.smallBreak}>
                      <Content>
                        <Button 
                          Primary
                          rounded
                          block
                          onPress={() => { this.postMeal(meal._id, this.mealId); }}
                          style={styles.Button}
                          textStyle={{color: '#1e90ff',fontWeight: 'bold', fontSize: 20}}
                          > Add
                        </Button>
                      </Content>
                    </Container>
                   
                </View>
              ))}
            </ScrollView>
          </View>
        </Drawer>
    );
  }
}

