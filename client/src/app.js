import {ApolloClient} from 'apollo-client'
import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  TouchableHighlight,
  Image
} from 'react-native';
import ArtistList from './components/ArtistList'
// import './styles/index.css'
// import App from './components/App'
// import registerServiceWorker from './registerServiceWorker'
import {ApolloProvider} from 'react-apollo'
import {createHttpLink} from 'apollo-link-http'
import {InMemoryCache} from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';


const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

const httpLink = createHttpLink({
	uri: 'http://localhost:4000'
	// uri: 'https://us1.prisma.sh/mrbouzi/database/dev'
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjanN3b2d0YTcyMHlxMGI4NGxqcndhb21kIiwiaWF0IjoxNTUxODQ1MDM2fQ.VmjpkJdjq-76kFvzOdDSnZCGzo_DHqzrcJVatINRB_g"
    }
  }
});


const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  }
})

export default class App extends Component<Props> {

  state = {
    currentArtist: {},
    artists: []
  }

  renderTopArtists = (artists) => {
    return artists.map((artist, index) => {
      return (
        <TouchableHighlight
          key={index}
          onPress={() => this.setState({currentArtist: this.state.currentArtist ? "" : artist})}
          underlayColor="#ddd"
        >
          <Image
           source={{uri: artist.image ? artist.image : ""}}
           style={{
             height: 26,
             width: 26,
             borderRadius: 13
           }}
         />
       </TouchableHighlight >
      )
    })
  }


  render() {
    return (
    <ApolloProvider client={client}>

	     <NavigatorIOS
	     	style={{flex:1}}
        barTintColor='#fff'
        titleTextColor='#FF365D'
        tintColor='#FF365D'
	     	initialRoute={{
          component: ArtistList,
	     		title: 'Artists',
          // header: {
          //  style: {{ backgroundColor: '#fff' }},
          //  titleStyle: {{ color: '#FF365D' }},
          // }
        }}
  	   />
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

const USER_QUERY = gql`
	{
    user {
      name
      email
      artists {
        id
        name
        description
        image
        scores {
          amount
          category
          user {
            email
          }
        }
      }
      scores {
        amount
        user {
          name
          email
        }
        artist {
          id
          name
        }
      }
    }
	}
`
