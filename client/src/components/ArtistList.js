import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import Artist from './Artist';
import ArtistDetails from './ArtistDetails';


import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class ArtistList extends Component {

  static propTypes = {
    // title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
}

  pressRow = (artist, user) => {
      this.props.navigator.push({
        title: `${artist.name}`,
        component: ArtistDetails,
        passProps: {
          artist: artist,
          user: user
        }
      })
    }

  render() {


    return (
    	<Query query={ARTIST_QUERY}>
        {({ loading: loadingOne, error: errorOne, data: {artists}  }) => (
        <Query query={USER_QUERY}>
          {({ loading: loadingTwo, error: errorTwo, data: {user} }) => {
            console.log("DATA:", artists, user)
            if (loadingOne || loadingTwo) return <Text>loading...</Text>
            if(errorOne || errorTwo) {
              console.log("ERRORONE:", errorOne, "ERORTWO:", errorTwo)
      				return (
      					<Text> Error </Text>
      				)
      			}
         return (
           <View style={styles.container}>{artists.map(artist =>
             <TouchableHighlight
               key={artist.id}
               onPress={() => this.pressRow(artist, user)}
               underlayColor="#ddd"
             >
               <Artist
                 key={artist.id}
                 artist={artist}
               />
             </TouchableHighlight>)}
           </View>
          )
        }}
        </Query>
        )}
    	</Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 90
  }
});

const ARTIST_QUERY = gql`
	{
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
	}
`

const USER_QUERY = gql`
	{
    user {
      name
      email
      scores {
        amount
        user {
          name
          email
        }
        artist {
          name
        }
      }
    }
	}
`
