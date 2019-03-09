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
              marginBottom: 5,
              alignItems: "center",
              textAlign: "center"
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
                    width: 200
                  }}
                  minimumTrackTintColor="#FF365D"
                  thumbTintColor= "#ddd"
                />
              )}
            </Mutation>
            <View
              style={{
                alignSelf: 'flex-start',
                flexDirection: 'row'
              }}
            >
              <Text>
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
		   			borderRadius: 40,
            marginLeft: 20
		   		}}
		   	/>
        <Button
          title="Add"
          style={{
            color:"fff",
            marginTop:10
          }}
          buttonStyle={{
            backgroundColor:"#FF365D",
            fontSize: 10
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
      <View>
        {this.renderScores()}
      </View>
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
    score(amount: $amount, category: $category, name: $name, email: $email) {
      amount
    }
  }
`

const UPDATE_SCORE = gql`
  mutation updateScore($amount: Int!, $category: String!, $name: String!, $email: String!) {
    score(amount: $amount, category: $category, name: $name, email: $email) {
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
