import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import './styles/index.css'
// import App from './components/App'
// import registerServiceWorker from './registerServiceWorker'
import {ApolloProvider} from 'react-apollo'
import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
})

const client = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache()
})

export default class App extends Component<Props> {
  render() {
    return (
    <ApolloProvider client={client}>
	      <View style={styles.container}>
	        <Text style={styles.welcome}>Welcome to React Native! Han</Text>
	        <Text style={styles.instructions}>To get started, edit App.js</Text>
	        <Text style={styles.instructions}>{instructions}</Text>
	      </View>
	 </ApolloProvider>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});