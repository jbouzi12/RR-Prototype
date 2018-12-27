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

import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class ArtistList extends Component {
	
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
    		return (
    			<View style={styles.container}>{artists.map(artist => <Artist key={artist.id} artist={artist} />)}</View>
    		)

    		}}
    	</Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
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
