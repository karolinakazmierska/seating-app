import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button, List } from "react-native";
import { connect } from 'react-redux'; // connect to redux
import { addGuest, deleteGuest, addGuestThunk, deleteGuestThunk } from './../actions/actions';
import { Dimensions } from "react-native";
import Swipeout from 'react-native-swipeout';
import { Icon } from 'react-native-elements';
import { myStyles } from './../utils/styles';

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
    	this.setState({ name: text })
   	}

	submitGuest(name) {
		let exists = false;
		this.props.guests.added.forEach(obj => {
			console.log(obj.name == name)
			if (obj.name.toUpperCase() == name.toUpperCase() || name == '') {
				console.log('This guest is already on the list'); //@todo: display message to the user
				exists = true;
			}
		})
		this.setState({ name: '' })
		return exists ? null : this.props.dispatch(addGuestThunk(name, this.props.guests.userId));
	}

	deleteGuest(name) {
		this.props.dispatch(deleteGuestThunk(name, this.props.guests.userId));
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
		console.log('Added guests:', this.props.guests.added);
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>ADD OR REMOVE GUESTS</Text>
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
						var guestName = item.name;
						return <Swipeout style={styles.row} right={[
						  		{
									text: 'Delete',
									color: '#ffffff',
									backgroundColor: '#532323',
									onPress: () => { this.deleteGuest(guestName) }
								}
							]}>
  							<View style={styles.guestContainer}>
								<Icon
									name='user'
									type='font-awesome'
									color='#FFE6E6'
								/>
								<Text style={styles.item}>{guestName}</Text>
								<Icon
									name='circle'
									type='font-awesome'
									color='#FFE6E6'
								/>
								<Text style={styles.item}>{item.assignedTo}</Text>
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
		backgroundColor: myStyles.colors.light
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
		backgroundColor: myStyles.colors.dark,
		alignItems: "center",
		justifyContent: "center",
		margin: 15
	},
	buttonText: {
		fontSize: 20,
		color: "#FFE6E6"
	},
	row: {
		backgroundColor: '#FCF8F9',
		width: width
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
		flex: 1,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 15
	},
	guestContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15
	}
});

const mapStateToProps = (state) => {
	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Guests);
