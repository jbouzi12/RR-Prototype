import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { NavigationActions, addNavigationHelpers, StackNavigator, TabNavigator } from 'react-navigation';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabText: {
    color: '#777',
    fontSize: 10,
    justifyContent: 'center',
  },
  selected: {
    color: 'blue',
  },
});

const TestScreen = title => () => (
  <View style={styles.container}>
    <Text>
      {title}
    </Text>
  </View>
);

// tabs in main screen
const MainScreenNavigator = TabNavigator({
  Artists: { screen: TestScreen('Artists') },
  Albums: { screen: TestScreen('Albums') },
}, {
  initialRouteName: 'Artists',
});

const AppNavigator = StackNavigator({
  Main: { screen: MainScreenNavigator },
});

// reducer initialization code
const initialState = AppNavigator.router.getStateForAction(NavigationActions.reset({
	index: 0,
	actions: [
	  NavigationActions.navigate({
		  routeName: 'Main',
	  }),
	],
}));

export const navigationReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

    // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

class AppWithNavigationState extends Component {
  render() {
    return (
      <AppNavigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.nav
      })} />
    );
  }
}
const mapStateToProps = state => ({
  nav: state.nav,
});
export default connect(mapStateToProps)(AppWithNavigationState);