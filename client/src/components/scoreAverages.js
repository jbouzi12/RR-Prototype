import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';
import gql from 'graphql-tag';
import { graphql, Mutation, Query, withApollo } from 'react-apollo';
import {
  SCORE_AVERAGE_QUERY
} from '../queries/scores';



 class ScoreAverages extends Component {


  render() {


    return (
      <Query query={SCORE_AVERAGE_QUERY} variables={{name: this.props.artist.name, category: this.props.score.name}}>
        {({ loading: loading, error: error, data: {scoreAverage} }) => {
          if (loading) return <Text>loading...</Text>
          if(error) {
            return (
              <Text> Error </Text>
            )
          }
          return (
            <View

              style={{
                marginBottom: 15,
                alignItems: "center",
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
                {this.props.score.name}
              </Text>
              <Text > Value: </Text>
              <Text style={{ color: "#FF365D" }} >
                {scoreAverage}
              </Text>
            </View>
          )
        }}
      </Query>
    );
  }
}



export default withApollo(ScoreAverages)
