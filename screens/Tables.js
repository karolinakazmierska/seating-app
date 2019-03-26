import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Tables extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Tables</Text>
				<TouchableOpacity
					onPress={() => this.props.navigation.navigate("TablesDetails", { topic: "React Navigation" })}>
					<Text style={styles.link}>Modify Tables Details</Text>
				</TouchableOpacity>
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
	link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10,
		color: "blue"
	}
});
