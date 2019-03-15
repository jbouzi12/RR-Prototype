import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  TextInput
} from 'react-native';


import Artist from './Artist';
import ArtistDetails from './ArtistDetails';


import { Query, withApollo } from 'react-apollo';
import gql from 'graphql-tag';

class ArtistList extends Component<Props> {

  static propTypes = {
    title: PropTypes.string.isRequired,
    navigator: PropTypes.object.isRequired,
  }

  state = {
    currentArtist: {},
    artists: []
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
      currentArtist: {},
    })
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
             borderRadius: 13,
             marginRight: 4
           }}
         />
       </TouchableHighlight >
      )
    })
  }

  checkTopArtists = (artist, topArtists) => {

    if(_.find(topArtists, {name: artist.name})) {
      return true
    } else {
      return false
    }

  }

  executeSearch = async (filter) => {

  const result = await this.props.client.query({
    query: ARTIST_SEARCH_QUERY,
    variables: { filter }
  })
    const artists = result.data.artists.link
    ids
    this.setState({ artists })
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
                    margin: 10,
                    color: "#FF365D"
                  }}
                 >
                  {this.state.currentArtist && this.state.currentArtist.name ? this.state.currentArtist.name : ""}
                 </Text>
                </TouchableHighlight>

             </View>
             <View
              style={{
                margin: 10,
                marginBottom: 20
              }}
             >
              <TextInput
                placeholder="Search Artist"
                onChangeText={(text) => this.executeSearch(text)}
               />
             </View>
             {artists.map((artist) => {
               console.log("ARTIST:", artist)
               return (
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
                 </TouchableHighlight>
               )})}
             {this.state.artists.map((artist, index) => {

                 return (<Artist
                   key={artist.id}
                   artist={artist}
                   user={user}
                   includesArtist={this.checkTopArtists(artist, user.artists)}
                 />
               )
             })}
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

const ARTIST_SEARCH_QUERY = gql`
  query searchArtists($filter: String!) {
		searchArtists(filter: $filter) {
			id
			name
			description
      image
		}
	}
`


const ARTIST_QUERY = gql`
	{
		artists {
			id
			name
			description
      image
      scores {
        id
        amount
        category
        user {
          id
          email
        }
      }
		}
	}
`

const USER_QUERY = gql`
	{
    user {
      id
      name
      email
      artists {
        id
        name
        description
        image
        scores {
          id
          amount
          category
          user {
            id
            email
          }
        }
      }
      scores {
        id
        amount
        user {
          id
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

export default withApollo(ArtistList)
