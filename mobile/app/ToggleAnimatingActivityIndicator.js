import React from 'react';

// import packages
import { ActivityIndicator, StyleSheet, View } from 'react-native';

// ToggleAnimatingActivityIndicator Component
export default class ToggleAnimatingActivityIndicator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  } // end constructor

  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({animating: !this.state.animating});
    });
  } // end setToggleTimeout

  componentDidRender(){
    this.setToggleTimeout();
  } // end componentDidRender

  componentWillUnmount() {
    clearTimeout(this._timer);
  } // end componentWillUnmount

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        size="large"
      />
    );
  } // end render 
} // end oggleAnimatingActivityIndicator Component