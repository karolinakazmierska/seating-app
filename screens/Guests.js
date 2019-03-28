import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button, List } from "react-native";
import { connect } from 'react-redux'; // connect to redux
import { addGuest, deleteGuest } from './../actions/actions';
import { Dimensions } from "react-native";
import Swipeout from 'react-native-swipeout';

const width = Dimensions.get('window').width;
const halfwidth = Dimensions.get('window').width / 2;

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
		this.props.dispatch(deleteGuest(name));
		this.setState({})
	}

	renderSeparator = () => {
	    return (
		    <View
		        style={{
			        height: 1,
			        width: width,
			        backgroundColor: "#FFE6E6"
		        }}
		    />
	    );
  	}

	render() {
		console.log(this.props.guests.added.length)
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
				{this.props.guests.added.length === 0 ? null : <FlatList
					ItemSeparatorComponent={this.renderSeparator}
		          	data={this.props.guests.added}
		         	renderItem={({item}) => {
						var key = item.key;
						return <Swipeout style={styles.row} right={[
						  		{
									text: 'Delete',
									color: '#ffffff',
									backgroundColor: '#532323',
									onPress: () => { this.deleteGuest(key) }
								}
							]}>
  							<View>
								<Text style={styles.item}>{item.key}</Text>
							</View>
						</Swipeout>
					}}
        		/>}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		alignItems: "center",
		backgroundColor: "#EFDBDC"
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
		alignItems: "center",
		justifyContent: "center",
		margin: 15
	},
	buttonText: {
		fontSize: 20,
		color: "#FFE6E6"
	},
	row: {
		backgroundColor: '#FCF8F9'
	},
	input: {
		width: width,
		height: 50,
		paddingHorizontal: 10,
		borderColor: "#ffffff",
		backgroundColor: "#ffffff",
		color: "black",
		textAlign: "left"
	},
	item: {
		width: width,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 15
	}
});

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Guests);
