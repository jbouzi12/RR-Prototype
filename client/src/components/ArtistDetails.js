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

export default class ArtistDetails extends Component<Props> {
	 	
	
  render() {
  	let artist = this.props.pushEvent,
  		image = ""
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
	   		 <Image
		   		source={{uri: artist.image ? artist.image : ""}}
		   		style={{
		   			height: 120,
		   			width: 120,
		   			borderRadius: 60
		   		}}
		   	/>
	  		<Text
	  			style={{
	  				paddingTop: 20,
	  				paddingBottom: 20,
	  				fontSize: 40
	  			}}
	  		>
	  			{artist.name}
	  		</Text>
	  		<Text
	  			style={{
	  				paddingTop: 20,
	  				paddingBottom: 20,
	  				fontSize: 20
	  			}}
	  		>
	  			{artist.description}
	  		</Text>
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
