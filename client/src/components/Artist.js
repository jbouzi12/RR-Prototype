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


export default class Artist extends Component<Props> {

  render() {

  	const { id, name, image } = this.props.artist;


    return (
	    <View key={id} style={styles.groupContainer}>
          <Image
           source={{uri: image ? image : ""}}
           style={{
             height: 70,
             width: 70,
             borderRadius: 20
           }}         />
	        <Text style={styles.groupName}>{name}</Text>
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
  image: {
    height: 30,
    width: 30,
    borderRadius: 60
  }
});
