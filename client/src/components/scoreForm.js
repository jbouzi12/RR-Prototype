import React  from 'react';
// import { useMutation } from 'react-apollo-hooks';
import { graphql, Mutation } from 'react-apollo';
import { View, Text } from 'react-native';
import { Slider, Button } from 'react-native-elements';
import {
  NEW_SCORE,
  UPDATE_SCORE,
  SCORE_QUERY
} from '../queries/scores';
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


// <ScoreForm user={user} artist={artist} />
const ScoreForm = ({ user, artist }) => {
    // amount, category, name, email
    // const submitNewScore = useMutation(NEW_SCORE);
    // const [isSubmitted, setIsSubmitted] = useState(false);
    console.log("USER:", user, "ARTIST:", artist)
    return scores.map((score, index) => (
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
                value={1}
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
              {score.name.toLowerCase()}
            </Text>
          </View>
        </View>
      )
    )
};

export default ScoreForm;
