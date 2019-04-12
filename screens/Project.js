import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { NavigationActions } from "react-navigation";
import firebase from './../utils/firebase';
import { myStyles } from './../utils/styles';

export default class Project extends Component {
	signOut = () => {
		firebase.auth().signOut();
		this.props.navigation.navigate('Home');
	}

	render() {
		const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Add guests to your project and assign them to tables of your choice</Text>
				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
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
					<TouchableOpacity
						style={styles.btnSignOut}
	          			onPress={() => this.signOut()} >
						<Text style={styles.btnSignOutText}>Sign out</Text>
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
		backgroundColor: myStyles.colors.light
	},
	welcome: {
		flex: 1,
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
		borderColor: myStyles.colors.dark,
		backgroundColor: myStyles.colors.dark,
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 15
	},
	buttonText: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: myStyles.colors.light,
		alignSelf: "center",
		textAlign: "center"
	},
	btnSignOut: {
		width: 160,
		height: 40,
		borderRadius: 30,
		borderColor: "#A8A8A8",
		backgroundColor: "#F4F4F4",
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		marginTop: 60,
	},
	btnSignOutText: {
		color: "#A8A8A8",
		fontSize: 16,
		textTransform: 'uppercase',
		alignSelf: "center",
		textAlign: "center",
	}
});
