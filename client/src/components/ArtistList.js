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
    filter: ""
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

  renderArtistList = (artists, user, loading, error) => {
    if (loading) {
      return <Text>loading...</Text>
    } else if(error) {
        console.log("ERORTWO:", error)
       return (
         <Text> Error </Text>
       )
    }

    return artists.map((artist) => {
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
      )
    })
  }


  render() {

    return (
    	<Query query={ARTISTS_QUERY} variables={{filter: this.state.filter}}>
        {({ loading: loadingOne, error: errorOne, data: {artists}  }) => (
        <Query query={USER_QUERY}>
          {({ loading: loadingTwo, error: errorTwo, data: {user} }) => {
            console.log("DATA:", artists, user)
            if (loadingTwo) return <Text>loading...</Text>
            if(errorTwo) {
              console.log("ERORTWO:", errorTwo)
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
                onChangeText={(text) => this.setState({filter: text})}
               />
             </View>
             {this.renderArtistList(artists, user, loadingOne, errorOne)}
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



const ARTISTS_QUERY = gql`
	query artists($filter: String!){
		artists(filter: $filter) {
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
