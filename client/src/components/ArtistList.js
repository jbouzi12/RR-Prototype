import React, { Component } from 'react'
import Artist from './Artist'

import {
  View,
  Text
} from 'react-native';

export default class ArtistList extends Component {
  render() {
	const artists = [
		 {
        id: '1',
        description: 'Prisma replaces traditional ORMs and makes it easy to build GraphQL servers 😎',
        name: 'Nas',
      },
      {
        id: '2',
        description: 'The best GraphQL client',
        name: 'Kendrick',
      }
	] 

    return (
      <View>{artists.map(artist => <Artist key={artist.id} artist={artist} />)}</View>
    )
  }
}
