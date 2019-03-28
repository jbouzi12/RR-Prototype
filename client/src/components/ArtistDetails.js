import { _ } from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { graphql, Mutation, Query } from 'react-apollo';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { Slider, Button } from 'react-native-elements';
import ScoreForm from './scoreForm';
import {
  SCORE_AVERAGE_QUERY
} from '../queries/scores';

import ScoreAverages from './scoreAverages'


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

export default class ArtistDetails extends Component<Props> {

  state = {
    flow: 1,
    delivery: 1,
    metaphor: 1,
    adlib: 1,
    beats: 1
  }

  renderAlbums = () => {
    if(this.props.artist.albums) {
      return this.props.artist.albums.map((album) => {
        return (
          <View
            key={album.id}
            style={{
              width: 120,
              marginRight: 10
            }} >
            <Image
             source={{uri: album.image ? album.image : ""}}
             style={{
               width: 120,
               height: 120
             }}
            />
            <View
              style={{
                width: "100%"
              }}
            >
              <Text style={{flexWrap: 'wrap', color: "#FF365D", fontWeight: "bold"}}>{album.title}</Text>
              <Text style={{flexWrap: 'wrap', fontStyle: "italic"}}t>{album.releaseDate}</Text>
            </View>
          </View>
        )
      })
    }
  }

  renderScores = () => {
    console.log("HIT")
    return scoreNames.map((score, index) => {
      return (
        <ScoreAverages key={this.props.artist.id} artist={this.props.artist} score={score} />
      )
    })
  }

  rateArtist = () => {
    const {
      artist,
      user
    } = this.props;

    this.props.navigator.push({
      title: `${artist.name} Rating`,
      component: ScoreForm,
      passProps: {
        user: user,
        artist: artist
      }
    });
  }

  render() {
    const {
      artist,
      user,
      navigator
    } = this.props;
    const image = artist.image;

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
		   			borderRadius: 40
		   		}}
		   	/>
        <Button
          title="Add"
          style={{
            color:"fff",
            marginTop:10
          }}
          buttonStyle={{
            backgroundColor:"#FF365D"
          }}
        />
        <Button
          title="Rate Artist"
          style={{
            color:"fff",
            marginTop:10
          }}
          buttonStyle={{
            backgroundColor:"#FF365D"
          }}
          onPress={this.rateArtist}
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
      <View style={{ flex: 2, flexDirection: "row",flexWrap: 'wrap', alignItems: 'flex-start'}}>
        {this.renderScores()}
      </View>
      <ScrollView
        horizontal={true}
        style={{
          width: 300,
          height: 150
        }}
      >
        {this.renderAlbums()}
      </ScrollView>
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
