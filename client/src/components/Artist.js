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
import { graphql, Mutation } from 'react-apollo';



export default class Artist extends Component {


  render() {

  	const { id, name, image } = this.props.artist;

    let followButton = this.props.includesArtist ? 'Remove' : "Add"

    return (
      <Mutation mutation={this.props.includesArtist ? REMOVE_TOP_ARTIST : ADD_TOP_ARTIST}>
        {updateTopArtistsMutation => (
          <ListItem
            key={id}
            leftAvatar={{ source: {uri: image ? image : ""} }}
            title={name}
            titleStyle={{
              fontWeight: "bold"
            }}
            component={TouchableHighlight}
            bottomDivider={true}
            underlayColor="#ddd"
            buttonGroup = {{
              buttons: [followButton],
              onPress: () => updateTopArtistsMutation({
                variables: {
                  id: id,
                  email: this.props.user && this.props.user.email ? this.props.user.email : null
                }
              })
              .then(({ data }) => {
                console.log('got data', data);
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
    // flex: 1,
    // flexDirection: 'row',
    alignItems: 'center',
  //   backgroundColor: 'white',
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 50
  },
  groupName: {
    fontWeight: 'bold',
    fontSize: 20,
    // flex: 0.7,
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 60
  }
});

const ADD_TOP_ARTIST = gql`
  mutation addTopArtist($id: ID!, $email: String!) {
    user(id: $id, email: $email) {
      id
      email
      artists {
        image
        name
        id
      }
    }
  }
`

const REMOVE_TOP_ARTIST = gql`
  mutation removeTopArtist($id: ID!, $email: String!) {
    user(id: $id, email: $email) {
      id
      email
      artists {
        image
        name
        id
      }
    }
  }
`
