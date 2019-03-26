import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, TextInput, Button } from "react-native";
import { connect } from 'react-redux'; // connect to redux

class Guests extends Component {
	onSubmit = () => {
    	if (this.state.title.length > 0) this.props.onAdd(this.state);
    	return null;
  	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Guests</Text>
				<Text style={styles.welcome}>{this.props.guests.added.length}</Text>
				<FlatList
		          	data={this.props.guests.added}
		         	renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        		/>
				<Button
					onPress={() => this.props.dispatch({ type: 'ADD_GUEST' })}
					title="Add guest"
				/>
				<TextInput
					style={styles.input}
					placeholder="What needs to be done?"
					onSubmitEditing={this.onSubmit}
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
