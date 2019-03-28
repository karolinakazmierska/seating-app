import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class TablesDetails extends Component {
	render() {
    const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>TablesDetails</Text>
				<Text style={styles.params}>Params Passed:{'\n'} {navigation.getParam('table')}</Text>
			</View>
		);
	}
}

//@todo: enable renaming table
//@todo: enable deleting table
//@todo: enable increasing table capacity

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
	params: {
		textAlign: "center",
		margin: 10
	},
  link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	}
});
