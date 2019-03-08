import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image
} from 'react-native';



import Artist from './Artist';
import ArtistDetails from './ArtistDetails';


import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export default class ArtistList extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  state = {
    currentArtist: {}
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
    this.setState({
      currentArtist: {}
    })
  }

  renderTopArtists = (artists) => {
    return artists.map((artist, index) => {
      return (
        <TouchableHighlight
          key={index}
          onPress={() => this.setState({currentArtist: artist})}
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

  checkTopArtists = (artist, topArtists) => {

    for(i = 0; i < topArtists.length; i++) {
      if(artist.name == topArtists[i].name) {
        return true
      } else {
        return false
      }
    }
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
          let userArtists = user.artists;

         return (
           <View style={styles.container}>
            <View
              style={{
                flexDirection: 'row',
                alignContent: 'center',
                alignItems: 'center'
              }}
            >
               <Text
                style={{
                  fontWeight: "bold",
                  margin: 10
                }}
               >
                {user.name}
               </Text>
               {this.renderTopArtists(userArtists)}
               <TouchableHighlight
                 onPress={() => this.pressRow(this.state.currentArtist, user)}
                 underlayColor="#ddd"
               >
                 <Text
                  style={{
                    fontWeight: "bold",
                    margin: 10
                  }}
                 >
                  {this.state.currentArtist && this.state.currentArtist.name ? this.state.currentArtist.name : ""}
                 </Text>
                </TouchableHighlight>
             </View>
             {artists.map(artist =>
             <TouchableHighlight
               key={artist.id}
               onPress={() => this.pressRow(artist, user)}
               underlayColor="#ddd"
             >
               <Artist
                 key={artist.id}
                 artist={artist}
                 user={user}
                 includesArtist={this.checkTopArtists(artist, user.artists)}
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
