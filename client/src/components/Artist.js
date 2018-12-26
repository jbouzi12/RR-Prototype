import React, { Component } from 'react'
import {
  Text,

} from 'react-native';

export default class Artist extends Component<Props> {
  render() {
    return (
	      
	        <Text>{this.props.artist.name}</Text>
	      
    );
  }
}
