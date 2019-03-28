import gql from 'graphql-tag';

export const NEW_SCORE = gql`
  mutation newScore($amount: Int!, $category: String!, $name: String!, $email: String!) {
    newScore(amount: $amount, category: $category, name: $name, email: $email) {
      amount
    }
  }
`



export const UPDATE_SCORE = gql`
  mutation updateScore($amount: Int!, $category: String!, $name: String!, $email: String!) {
    updateScore(amount: $amount, category: $category, name: $name, email: $email) {
      amount
    }
  }
`



export const SCORE_QUERY = gql`
  query scores($name: String!, $email: String!) {
    scores(name: $name, email: $email) {
      amount
      category
    }
  }
`
export const SCORE_AVERAGE_QUERY = gql`
  query scoreAverage($name: String!, $category: String!){
    scoreAverage(name: $name, category: $category)
  }
`
