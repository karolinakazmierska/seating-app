import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Placeholder extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Placeholder</Text>
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
	goBack: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	}
});
