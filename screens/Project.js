import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { NavigationActions } from "react-navigation";

export default class Project extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Add guests to your project and assign them to tables of your choice</Text>
				<View>
					<TouchableOpacity
	          			style={styles.btn}
	          			onPress={() => this.props.navigation.navigate('Dashboard')} >
						<Text style={styles.buttonText}>Modify guest list</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
	          			onPress={() => this.props.navigation.navigate('Tables')} >
						<Text style={styles.buttonText}>Assign guests to tables</Text>
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
		backgroundColor: "#EFDBDC"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
		paddingHorizontal: 30
	},
	link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	},
	btn: {
		width: 260,
		height: 50,
		borderRadius: 30,
		borderColor: "#A03B54",
		backgroundColor: "#A03B54",
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 15
	},
	buttonText: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: "#EFDBDC",
		alignSelf: "center",
		textAlign: "center"
	}
});
