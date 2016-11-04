import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

/**
 * Optional Flowtype state and timer types definition
 */


export default class ToggleAnimatingActivityIndicator extends Component {
  /**
   * Optional Flowtype state and timer types
   */

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
    };
  }

  componentDidMount() {
  }
  componentDidRender(){
        this.setToggleTimeout();

  }

  componentWillUnmount() {
    clearTimeout(this._timer);
  }

  setToggleTimeout() {
    this._timer = setTimeout(() => {
      this.setState({animating: !this.state.animating});
    });
  }

  render() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        size="large"
      />
    );
  }
}