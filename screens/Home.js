import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Dimensions } from "react-native";

export default class Home extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<ImageBackground source={require('./../images/rings.jpg')} style={styles.container}>
				<Text style={styles.welcome}>
					Welcome to Seating Chart App!
				</Text>
				<Text style={styles.welcome}>
					Arrange your wedding seating plan
				</Text>
				<View style={styles.wrapper}>
					<TouchableOpacity style={styles.button} onPress={() => navigate("Project")}>
						<Text style={styles.buttonText}>Your Project</Text>
					</TouchableOpacity>
				</View>
			</ImageBackground>
		);
	}
}

const width = Dimensions.get('window').width;
const halfwidth = Dimensions.get('window').width / 2;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF",
		width: '100%', height: '100%'

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
	}
});
