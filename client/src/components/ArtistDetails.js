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
import { Slider } from 'react-native-elements';



export default class ArtistDetails extends Component<Props> {

    state = {
      flow: 1,
      delivery: 1,
      metaphor: 1,
      adlib: 1,
      beats: 1
    }

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
        <View>
          <Text>
            Flow
          </Text>
          <Slider
            value={this.state.flow}
            onValueChange={flow => this.setState({ flow })}
            maximumValue = {5}
            step={1}
            style={{
              width: 200
            }}
            thumbTintColor= "#e01e79"
          />
          <Text>Value:
          {this.state.flow}
          </Text>
        </View>
        <View>
          <Text>
            Delivery
          </Text>
          <Slider
            value={this.state.delivery}
            onValueChange={delivery => this.setState({ delivery })}
            maximumValue = {5}
            step={1}
            style={{
              width: 200
            }}
            thumbTintColor= "#a12b36"
          />
          <Text>Value:
          {this.state.delivery}
          </Text>
        </View>
        <View>
          <Text>
            Metaphor
          </Text>
          <Slider
            value={this.state.metaphor}
            onValueChange={metaphor => this.setState({ metaphor })}
            maximumValue = {5}
            step={1}
            style={{
              width: 200
            }}
            thumbTintColor= "#60f17c"
          />
          <Text>Value:
          {this.state.metaphor}
          </Text>
        </View>
        <View>
          <Text>
            Adlib
          </Text>
          <Slider
            value={this.state.adlib}
            onValueChange={adlib => this.setState({ adlib })}
            maximumValue = {5}
            step={1}
            style={{
              width: 200
            }}
            thumbTintColor= "#6b7155"

          />
          <Text>Value:
          {this.state.adlib}
          </Text>
        </View>
        <View>
          <Text>
            Beats
          </Text>
          <Slider
            value={this.state.beats}
            onValueChange={beats => this.setState({ beats })}
            maximumValue = {5}
            thumbTintColor= "#8aa6e0"
            step={1}
            style={{
              width: 200
            }}
          />
          <Text>Value:
          {this.state.beats}
          </Text>
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
