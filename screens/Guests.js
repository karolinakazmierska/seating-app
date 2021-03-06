import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button, List } from 'react-native';
import { connect } from 'react-redux';
import { addGuest, deleteGuest } from './../actions/actions';
import { Dimensions } from 'react-native';
import Swipeout from 'react-native-swipeout';
import { Icon } from 'react-native-elements';
import { myStyles } from './../utils/styles';

const width = Dimensions.get('window').width;
const halfwidth = Dimensions.get('window').width / 2;

class Guests extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			error: ''
		}
	}

	handleInput = (text) => {
    	this.setState({ ...this.state, name: text })
   	}

	submitGuest(name) {
		this.setState({ ...this.state, error: ''});
		var error;
		if (name == '') {
			error = 'Name cannot be empty';
		}
		this.props.guests.added.forEach(obj => {
			if (obj.name.toUpperCase() == name.toUpperCase()) {
				error = 'This guest is already on the list';
			}
		})
		if (error == 'Name cannot be empty') {
			this.setState({ ...this.state, error: 'Name cannot be empty' })
		} else if (error == 'This guest is already on the list') {
			this.setState({ ...this.state, error: 'This guest is already on the list' })
		} else {
			this.props.dispatch(addGuest(name));
			this.setState({ name: '', error: '' })
		}
	}

	deleteGuest(name) {
		this.props.dispatch(deleteGuest(name));
		this.setState({})
	}

	renderSeparator = () => {
	    return  <View style={{ height: 1, width: width-30, marginLeft: 15, paddingRight: 15, backgroundColor: myStyles.colors.faded }} />
  	}

	render() {
		console.log(this.props.guests.added.length)
		console.log('Added guests:', this.props.guests.added);
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Add or remove guests</Text>
				<TextInput
					style={styles.input}
					value={this.state.name}
					onChangeText={(text) => this.handleInput(text)}
					placeholder={'Enter your guest name'}
				/>
				<View style={styles.line}></View>
				{this.state.error ? <Text>{this.state.error}</Text> : null }
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
									backgroundColor: myStyles.colors.secondary,
									onPress: () => { this.deleteGuest(guestName) }
								}
							]}>
  							<View style={styles.guestContainer}>
								<Icon
									name='user'
									type='font-awesome'
									color={myStyles.colors.dark}
								/>
								<Text style={styles.item}>{guestName}</Text>
								{item.assignedTo === '' ? null : <Icon
										name='circle'
										type='font-awesome'
										color={myStyles.colors.dark}
									/>}
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#fff'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
	},
	button: {
		width: halfwidth,
		height: 50,
		borderRadius: 30,
		backgroundColor: myStyles.colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	buttonText: {
		fontSize: 20,
		color: myStyles.colors.white
	},
	row: {
		backgroundColor: '#fff',
		borderColor: myStyles.colors.lightgrey,
		width: width
	},
	input: {
		width: width-30,
		height: 50,
		paddingHorizontal: 10,
		borderColor: '#ffffff',
		backgroundColor: '#ffffff',
		color: 'black',
		textAlign: 'left'
	},
	line: {
		width: width - 30,
		height: 1,
		backgroundColor: myStyles.colors.dark
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
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 15
	}
});

const mapStateToProps = (state) => {
	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Guests);
