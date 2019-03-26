import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { NavigationActions } from "react-navigation";

export default class Project extends Component {
	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>YOUR PROJECT</Text>
				<Button
          			title="MODIFY YOUR GUEST LIST"
          			onPress={() => this.props.navigation.navigate('Dashboard')}
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
	link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	}
});
