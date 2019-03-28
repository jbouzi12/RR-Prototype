import React, { Component } from 'react';
import { graphql, Mutation, Query } from 'react-apollo';
import { View, Text } from 'react-native';
import { Slider, Button } from 'react-native-elements';
import {
  NEW_SCORE,
  UPDATE_SCORE,
  SCORE_QUERY
} from '../queries/scores';
import { _ } from 'lodash';


const scoreNames = [
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

// const createScore = (args) => {
//
//   return `
//     ${alias}: newScore(category: "${args.category}", amount: "${args.amount}", name: "${args.name}", email: "${args.email}") {
//       id
//     }
//   `
// }
//
// const createScores = (mutations) => {
//   const joinedMutations = mutations.join('\n')
//
//   return `
//   mutation createScores {
//     ${joinedMutations}
//   }
//   `
// }
//
// const mutations  = ["Edgar Allan Poe", "Arthur Conan Doyle"]
//   .map(name => createAuthor(name))
// const result = createAuthors(mutations)


class ScoreForm extends Component<Props> {
    // amount, category, name, email
    // const submitNewScore = useMutation(NEW_SCORE);
    // const [isSubmitted, setIsSubmitted] = useState(false);

    state = {
      flow: 1,
      delivery: 1,
      metaphor: 1,
      adlib: 1,
      beats: 1
    }

    checkScore = (scoreName, scores) => {

      if(_.find(scores, {category: scoreName})) {
        return scores.map((score)=> {
          if(score.category == scoreName) {
            return score.amount
          }
        })
      } else {
        return 1
      }

    }

    renderScores = (scores) => {
      return scoreNames.map((score, index) => {
        return (
          <View
            key={index}
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
              {score.name}
            </Text>
            <Mutation mutation={NEW_SCORE}>
              {(submitNewScore) => (
                <Slider
                  value={this.state[`${score.name.toLowerCase()}`]}
                  onValueChange={(value) => {
                    submitNewScore({
                      variables: {
                        amount: value,
                        category: score.name,
                        name: artist.name,
                        email: user && user.email ? user.email : null
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
                flexDirection: 'row',
                alignItems: "center"
              }}
            >
              <Text > Value: </Text>
              <Text style={{ color: "#FF365D" }} >
                {this.checkScore(score.name, scores)}
              </Text>
            </View>
          </View>
        )
      })
    }


    render() {
      return (
        <Query query={SCORE_QUERY} variables={{name: this.props.artist.name, email: this.props.user.email}}>
          {({ loading: loading, error: error, data: {scores} }) => {
            if (loading) return <Text>loading...</Text>
            if(error) {
              return (
                <Text> Error </Text>
              )
            }
            return (
              <View>
                {this.renderScores(scores)}
                <Button
                  title="Submit"
                  style={{
                    color:"fff",
                    marginTop:10
                  }}
                  buttonStyle={{
                    backgroundColor:"#FF365D"
                  }}
                />
              </View>
            )
          }}
        </Query>
      )
    }

};

export default ScoreForm;
