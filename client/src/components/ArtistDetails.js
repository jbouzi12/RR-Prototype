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

import { ApolloProvider, graphql, Mutation } from 'react-apollo';
import gql from 'graphql-tag';


let scores = [
    {
      color: "#e01e79",
      name: "Flow"
    },
    {
      color: "#a12b36",
      name: "Delivery"
    },
    {
      color: "#60f17c",
      name: "Metaphor"
    },
    {
      color: "#6b7155",
      name: "Adlib"
    },
    {
      color: "#8aa6e0",
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
    beats: 1,
    amount: 1,
    category: ""
  }


  renderScores = () => {


    return scores.map((score, index) => {
      return (
        <ApolloProvider>
          <View
            key={index}
            style={{
              marginBottom: 20
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: `${score.color}`
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
                      .then(res => res)
                      .catch(err => <Text>{err}</Text>);
                      this.setState({amount: 1, category: ""})
                  }}
                  maximumValue = {5}
                  step={1}
                  style={{
                    width: 200
                  }}
                  thumbTintColor= {score.color}
                />
              )}
            </Mutation>
            <Text>Value:
            {this.state[`${score.name.toLowerCase()}`]}
            </Text>
          </View>
        </ApolloProvider>
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
		   			height: 100,
		   			width: 100,
		   			borderRadius: 50
		   		}}
		   	/>
        <Button
          type="outline"
          title="Follow"
          style={{
            height: 40,
            width: 70,
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
