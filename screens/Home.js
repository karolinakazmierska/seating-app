import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { setUserId, setStateFromDatabase } from './../actions/actions';
import { Dimensions } from "react-native";
import firebase from './../utils/firebase';
import Expo from 'expo';
import { Google } from 'expo';
import { auth } from './../utils/auth';
import { myStyles } from './../utils/styles';

class Home extends Component {
	checkIfLoggedIn = () => {
		this.props.navigation.navigate('Project');
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<ImageBackground source={require('./../images/view.png')} style={styles.container}>
				<View style={styles.welcome}>
					<Text style={{fontSize: 20, textAlign: "center", color: "white"}}>Welcome to Seating Chart App!</Text>
				</View>
				<TouchableOpacity
					style={styles.btn}
					onPress={() => this.checkIfLoggedIn()}>
					<Text style={styles.btnText}>GET STARTED</Text>
				</TouchableOpacity>
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
		backgroundColor: myStyles.colors.light,
		width: '100%', height: '100%'
	},
	welcome: {
		fontSize: 24,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 30
	},
	subtitle: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
	},
	link: {
		fontSize: 16,
		textAlign: "center",
		color: "blue",
		marginBottom: 5,
		margin: 10
	},
	btn: {
		width: halfwidth,
		height: 50,
		borderRadius: 30,
		backgroundColor: myStyles.colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	btnText: {
		fontSize: 20,
		color: myStyles.colors.dark
	}
});

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Home);
