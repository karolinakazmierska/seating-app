import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { Dimensions } from "react-native";

export default class Home extends Component {
	render() {
		const { navigate } = this.props.navigation;
		return (
			<ImageBackground source={require('./../images/rings.jpg')} style={styles.container}>
				<View style={styles.welcome}>
					<Text style={{fontSize: 20, textAlign: "center"}}>Welcome to Seating Chart App!</Text>
				</View>
				<Text style={styles.subtitle}>
					Arrange your wedding seating plan
				</Text>
				<View style={styles.wrapper}>
					<TouchableOpacity style={styles.button} onPress={() => navigate("Project")}>
						<Text style={styles.buttonText}>Log in</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.btn} onPress={() => navigate("Project")}>
						<Text style={styles.btnText}>Register</Text>
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
		backgroundColor: "#EFDBDC",
		width: '100%', height: '100%'

	},
	welcome: {
		width: 220,
		height: 220,
		borderRadius: 200,
		backgroundColor: 'rgba(252,248,249,0.5)',
		fontSize: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 10,
	},
	subtitle: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	wrapper: {
		// flexDirection: "row"
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
		backgroundColor: "#A03B54",
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	buttonText: {
		fontSize: 20,
		color: "#EFDBDC"
	},
	btn: {
		width: halfwidth,
		height: 50,
		borderRadius: 30,
		backgroundColor: "#ffffff",
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	btnText: {
		fontSize: 20,
		color: "#A03B54"
	}
});
