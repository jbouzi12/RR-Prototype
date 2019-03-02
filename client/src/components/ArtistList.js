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

  pressRow = (artist) => {
      this.props.navigator.push({
        title: "Push Event",
        component: ArtistDetails,
        passProps: {
          pushEvent: artist
        }
      })
    }
	
  render() {

  
    return (
    	<Query query={ARTIST_QUERY}>
    		{({ loading, error, data}) => {
    			if(loading) return <Text> Fetching </Text>
    			if(error) { 
    				return (
    					<Text> Error </Text>
    				)
    			}

    			 const artists = data.artists
           console.log("ARTIST:", data)
    		return (
    			<View style={styles.container}>{artists.map(artist =>    
            <TouchableHighlight
              key={artist.id} 
              onPress={() => this.pressRow(artist)}
              underlayColor="#ddd"
            > 
              <Artist 
                artist={artist} 
              />
            </TouchableHighlight>)}
          </View>
    		)

    		}}
    	</Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    marginTop: 100
  }
});

const ARTIST_QUERY = gql`
	{
		artists {
			id
			name
			description
		}
	}
`
