import React from 'react';
import { StyleSheet, View, ScrollView,Text, Dimensions, ActivityIndicator} from 'react-native';
import LoggedMeal from './LoggedMeal';
import InfoDisplay from './InfoDisplay';
import LogoDisplay from './LogoDisplay';
import HeadBuffer from './HeadBuffer';
import Button from './Button';
import ToggleAnimatingActivityIndicator from './ToggleAnimatingActivityIndicator';
// import CustomedDrawer from './CustomedDrawer';
// import Drawer from 'react-native-drawer';

var calor = 0;
const userUrl = 'https://mealdotlegacy.herokuapp.com/api/user/';
const mealUrl = 'https://mealdotlegacy.herokuapp.com/api/meal/';
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: 15,
    alignItems: 'center',
    paddingBottom: 60
  },
  searchItemBorder:{
    padding: 5,
    marginBottom: 5, 
  },
  Title: {
    color: '#1e90ff',
    fontWeight: 'bold',
    marginTop: 5,
    fontSize:24
  },
  text: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  drawerStyles: {
    shadowColor: '#000000', 
    shadowOpacity: 0.8, shadowRadius: 3
  }
});

export default class MealList extends React.Component {
  constructor(props) {
    super(props);
    this.getData = this.getData.bind(this);
    this.postMeal = this.postMeal.bind(this);
    this.gotoNext = this.gotoNext.bind(this);
    this.state = {
      view: {
        backgroundColor: 'white',
        borderRadius: 20,
      },
      container1: {
        shadowColor: 'white',
      },
      animating: true,
      showDrawer: false,
    }
  }

  componentWillMount() {
    var self = this;
    if(!this.state.animating){
      this.setToggleTimeout()
    }
    this.getData(this.CalorieCounter.bind(this));
  }

  componentWillUnmount() {
    
  }

  setToggleTimeout() {
    this.setState({animating: !this.state.animating});
  }

  CalorieCounter(){
    var calor = 0;
    this.props.getMealList().forEach((meal) => {
      calor += meal.recipe.calories
    })
    global._count = Math.round(calor)
    global._cals = ('Weekly Calories Consumed: ' + Math.round(calor) + '/14000')
    if(calor > 14000){
      this.setState({
        view: {
          backgroundColor: 'red',
          borderRadius: 20
        },
        container1: {
          width: width * .8,
          height: 50,
        }
      })
    } else{
      this.setState({
        view: {
          backgroundColor: '#1e90ff',
          borderRadius: 20
        },
        container1: {
          width: width * .8,
          height: 50,
        }
      })
    }
    if(this.state.animating){
      this.setToggleTimeout();
    }
  }

  getData(cb) {
    fetch(userUrl + this.props.getUserId(), {
      method: 'GET',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(res => res.json())
    .then((data) => {
      this.props.updateMealList(data.mealsObjs);
    }).done(() => {
      if (cb) { cb(); }
    });
  }

  postMeal(recipeId, mealId) {
    fetch(mealUrl + mealId, {
      method: 'DELETE',
      headers: { 'x-access-token': this.props.getToken() },
    })
    .then(() => {
      console.log('sheng wants to console log here')
      this.getData(() => {
        this.props.navigator.pop();
        this.CalorieCounter();
        });
    });
  }

  gotoNext(recipe, mealId, getData) {
    const nutrients = recipe.digest.map(nutrient => [nutrient.label, nutrient.total])
    this.props.navigator.push({
      component: InfoDisplay,
      passProps: {
        recipe,
        nutrients,
        mealId,
        postMeal: this.postMeal.bind(this),
        text: 'Remove',
      },
    });
  }

  updateMeals() {
    this.getData(() => {
      this.CalorieCounter();
    })
  }

  menuClicked() {
    this.setState({showDrawer: !this.state.showDrawer});
    console.log('menuClicked', this.state.showDrawer);
  }

  // {
  //   <Drawer
  //         ref="navigation"
  //         type="displace"
  //         content={<Text>meals</Text>}
  //         tapToClose={true}
  //         open={this.state.showDrawer}
  //         openDrawerOffset={0.2}
  //         panCloseMask={0.2}
  //         negotiatePan
  //         style={styles.drawerStyles}
  //         tweenHandler={(ratio) => ({
  //           main: { opacity: Math.max(0.54, 1 - ratio) },
  //         })}
  //         >
  //         <Text>haha</Text>
  //       </Drawer>
  // }

  render() {
    return (
      <View style={styles.container}>
        <HeadBuffer />
        <LogoDisplay menuClicked={this.menuClicked.bind(this)}/>
        <Text style={styles.Title}>Weekly Meals!</Text>
        <ActivityIndicator
          animating={this.state.animating}
          size="large"
          />
        <View
          style={this.state.container1}
          >
          <View
            style={this.state.view}
            elevation={3}
            >
              <Text style={styles.text}> {global._cals} </Text>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical
        >
          {this.props.getMealList().map((meal, i) => (
            <View style={styles.searchItemBorder} key={i}>
              <LoggedMeal
                recipe={meal.recipe}
                showInfo={this.gotoNext}
                token={this.props.getToken()}
                updateMeals={this.updateMeals.bind(this)}
                key={i}
                mealId={meal._id} // eslint-disable-line no-underscore-dangle
                textStyle={{color: 'white',fontWeight: 'bold', fontSize: 20}}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}

