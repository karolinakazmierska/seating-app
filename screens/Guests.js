import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button } from "react-native";
import { connect } from 'react-redux'; // connect to redux
import { addGuest } from './../actions/actions';

class Guests extends Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Guests</Text>
				<FlatList
		          	data={this.props.guests.added}
		         	renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        		/>
				<Button
					onPress={() => {
						this.props.dispatch(addGuest("GUEST NAME PLACEHOLDER"))
						this.props.navigation.navigate('Guests')
					}}
					title="Add guest"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	input: {
		width: 90,
		height: 30,
		borderColor: "grey",
		backgroundColor: "grey",
		color: "white",
		textAlign: "center"
	}
});

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Guests);
