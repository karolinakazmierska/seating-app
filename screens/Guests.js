import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button, List } from "react-native";
import { connect } from 'react-redux'; // connect to redux
import { addGuest } from './../actions/actions';
import { Dimensions } from "react-native";

class Guests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: ''
		}
	}

	handleInput = (text) => {
		console.log(text);
    	this.setState({ name: text })
   }

	submitGuest(name) {
		let exists = false;
		this.props.guests.added.forEach(obj => {
			console.log(obj.key == name)
			if (obj.key.toUpperCase() == name.toUpperCase() || name == '') {
				console.log('This guest is already on the list'); // display message to the user
				exists = true;
			}
		})
		this.setState({ name: '' })
		return exists ? null : this.props.dispatch(addGuest(name));
	}

	deleteGuest(name) {
		// https://medium.com/@bdougie/adding-swipe-to-delete-in-react-native-cfa85a5f5a31
	}

	renderSeparator = () => {
	    return (
		    <View
		        style={{
			        height: 1,
			        width: "100%",
			        backgroundColor: "#FFE6E6"
		        }}
		    />
	    );
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>MANAGE YOUR GUESTS</Text>
				<TextInput
					style={styles.input}
					value={this.state.name}
					onChangeText={(text) => this.handleInput(text)}
					placeholder={'Enter your guest name'}
				/>
				<TouchableOpacity
         			style={styles.button}
					onPress={() => {
						this.submitGuest(this.state.name)
					}}
       			>
         			<Text style={styles.buttonText}>Add guest</Text>
       			</TouchableOpacity>
				<FlatList
					ItemSeparatorComponent={this.renderSeparator}
		          	data={this.props.guests.added}
		         	renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        		/>

			</View>
		);
	}
}

const width = Dimensions.get('window').width - 20;
const halfwidth = Dimensions.get('window').width / 2;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#E9B9B9"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	button: {
		width: halfwidth,
		height: 50,
		borderRadius: 30,
		borderColor: "#ffffff",
		backgroundColor: "#2B2727",
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	buttonText: {
		fontSize: 20,
		color: "#FFE6E6"
	},
	input: {
		width: width,
		height: 50,
		paddingHorizontal: 10,
		borderColor: "#ffffff",
		borderRadius: 10,
		backgroundColor: "#ffffff",
		color: "black",
		textAlign: "left"
	},
	item: {
		width: width,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15
	}
});

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Guests);
