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

import { ListItem, ButtonGroup } from 'react-native-elements'
import gql from 'graphql-tag';
import { graphql, Mutation, withApollo } from 'react-apollo';



 class Artist extends Component {


  render() {

  	const { id, name, image } = this.props.artist;

    let followButton = this.props.includesArtist ? 'Remove' : "Add"

    return (
      <Mutation mutation={this.props.includesArtist ? REMOVE_TOP_ARTIST : ADD_TOP_ARTIST}>
        {(updateTopArtistsMutation, { loading, error, data }) => (
          <ListItem
            key={id}
            leftAvatar={{ source: {uri: image ? image : ""} }}
            title={name}
            titleStyle={{
              fontWeight: "bold",
              color: "#282828"
            }}
            component={TouchableHighlight}
            bottomDivider={true}
            underlayColor="#ddd"
            buttonGroup = {{
              buttons: [followButton],
              textStyle: {
                color: "#FF365D"
              },
              onPress: () => updateTopArtistsMutation({
                variables: {
                  id: id,
                  email: this.props.user && this.props.user.email ? this.props.user.email : null
                }
              })
              .then((res) => {
                console.log("RESPONSE:", res)
              })
              .catch((error) => {
                console.log('there was an error sending the query', error);
              })
            }}
          />
        )}
      </Mutation>
    );
  }
}

const styles = StyleSheet.create({

  groupContainer: {
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 50
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 20
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 60
  }
});

const ADD_TOP_ARTIST = gql`
  mutation addTopArtist($id: ID!, $email: String!) {
    addTopArtist(id: $id, email: $email) {
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

const REMOVE_TOP_ARTIST = gql`
  mutation removeTopArtist($id: ID!, $email: String!) {
    removeTopArtist(id: $id, email: $email) {
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


export default withApollo(Artist)
