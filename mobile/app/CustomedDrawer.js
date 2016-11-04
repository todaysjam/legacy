import React from 'react';
import { View, Image, Dimensions, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Header, Title } from 'native-base';
import { Drawer, ControlPanel, Main } from 'react-native-drawer'

const drawerStyles = {
  drawer: { 
    shadowColor: '#000000', 
    shadowOpacity: 0.8, shadowRadius: 3
  },
  main: { paddingLeft: 3 },
}

export default class CustomedDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

        // type="overlay"
        // content={<Button>meals</Button>}
        // tapToClose={true}
        // open={this.props.showDrawer}
        // openDrawerOffset={0.2} // 20% gap on the right side of drawer
        // panCloseMask={0.2}
        // closedDrawerOffset={-3}
        // styles={drawerStyles}
        // tweenHandler={(ratio) => ({
        //   main: { opacity:(2-ratio)/2 }
        // })}

  render() {
    return (
      <Drawer
        ref="navigation"
        type="displace"
        content={<Button>meals</Button>}
        tapToClose={true}
        open={this.props.showDrawer}
        openDrawerOffset={0.2}
        panCloseMask={0.2}
        negotiatePan
        tweenHandler={(ratio) => ({
          main: { opacity: Math.max(0.54, 1 - ratio) },
        })}
        >
        <Text>haha</Text>
      </Drawer>
    );
  }
}