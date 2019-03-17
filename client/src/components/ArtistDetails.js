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
  ScrollView,
} from 'react-native';
import { Slider, Button } from 'react-native-elements';

import { graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


let scores = [
    {
      name: "Flow"
    },
    {
      name: "Delivery"
    },
    {
      name: "Metaphor"
    },
    {
      name: "Adlib"
    },
    {
      name: "Beats"
    }

  ]
;


export default class ArtistDetails extends Component<Props> {

  state = {
    flow: 1,
    delivery: 1,
    metaphor: 1,
    adlib: 1,
    beats: 1
  }


  renderScores = () => {


    return scores.map((score, index) => {
      return (
          <View
            key={index}
            style={{
              marginBottom: 15,
              alignItems: "center",
              // textAlign: "center",
              width: "50%"
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                backgroundColor: "#ddd",
                padding: 5,
                color: "#FF365D"
              }}
            >
              {score.name}
            </Text>
            <Mutation mutation={NEW_SCORE} >
              {newScoreMutation => (
                <Slider
                  value={this.state[`${score.name.toLowerCase()}`]}
                  onValueChange={(value) => {
                    newScoreMutation({
                      variables: {
                        amount: value,
                        category: score.name,
                        name: this.props.artist.name,
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
                  maximumValue = {5}
                  step={1}
                  style={{
                    width: 120
                  }}
                  minimumTrackTintColor="#FF365D"
                  thumbTintColor= "#ddd"
                />
              )}
            </Mutation>
            <View
              style={{
                // alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text

              >
                Value:
              </Text>
              <Text
                style={{
                  color: "#FF365D"
                }}
              >
                {this.state[`${score.name.toLowerCase()}`]}
              </Text>
            </View>
          </View>
      )
    })
  }

  renderAlbums = () => {
    if(this.props.artist.albums) {
      return this.props.artist.albums.map((album) => {
        return (
          <View
            key={album.id}
            style={{
              width: 120,
              marginRight: 10
            }}
          >
            <Image
             source={{uri: album.image ? album.image : ""}}
             style={{
               width: 120,
               height: 120
             }}
            />
            <View
              style={{
                width: "100%"
              }}
            >
              <Text style={{flexWrap: 'wrap', color: "#FF365D", fontWeight: "bold"}}>{album.title}</Text>
              <Text style={{flexWrap: 'wrap', fontStyle: "italic"}}t>{album.releaseDate}</Text>
            </View>
          </View>
        )
      })
    }
  }

  render() {
  	let artist = this.props.artist,
  		image = "",
      user = this.props.user
  	;

    return (
	   <View
	   		style={{
		   		flex: 1,
		   		paddingTop: 120,
		   		justifyContent: 'flex-start',
		   		alignItems: 'center'
	   		}}
	   >
      <View>
	   		 <Image
		   		source={{uri: artist.image ? artist.image : ""}}
		   		style={{
		   			height: 80,
		   			width: 80,
		   			borderRadius: 40
		   		}}
		   	/>
        <Button
          title="Add"
          style={{
            color:"fff",
            marginTop:10
          }}
          buttonStyle={{
            backgroundColor:"#FF365D"
          }}
        />
	  		<Text
	  			style={{
	  				paddingTop: 20,
	  				paddingBottom: 20,
	  				fontSize: 15
	  			}}
	  		>
	  			{artist.description}
	  		</Text>
      </View>
      <View
      style={{
        flex: 2,
        flexDirection: "row",
        flexWrap: 'wrap',
        alignItems: 'flex-start'
      }}
      >
        {this.renderScores()}
      </View>
      <ScrollView
        horizontal={true}
        style={{
          width: 300,
          height: 150
        }}
      >
        {this.renderAlbums()}
      </ScrollView>
	   </View>
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
});

const NEW_SCORE = gql`
  mutation newScore($amount: Int!, $category: String!, $name: String!, $email: String!) {
    newScore(amount: $amount, category: $category, name: $name, email: $email) {
      amount
    }
  }
`

const UPDATE_SCORE = gql`
  mutation updateScore($amount: Int!, $category: String!, $name: String!, $email: String!) {
    updateScore(amount: $amount, category: $category, name: $name, email: $email) {
      amount
    }
  }
`

const SCORE_QUERY = gql`
  query scores($name: String!, $email: String!) {
    score(name: $name, email: $email) {
      amount
    }
  }
`
