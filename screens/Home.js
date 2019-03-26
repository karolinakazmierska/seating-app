import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Home extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to Seating Chart App!
				</Text>
				<View style={styles.wrapper}>
					<TouchableOpacity onPress={() => navigate("Project")}>
						<Text style={styles.link}>Your Project</Text>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigate("Placeholder")}>
						<Text style={styles.link}>Placeholder</Text>
					</TouchableOpacity>
				</View>
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
	wrapper: {
		flexDirection: "row"
	},
	link: {
		fontSize: 16,
		textAlign: "center",
		color: "blue",
		marginBottom: 5,
		margin: 10
	}
});
