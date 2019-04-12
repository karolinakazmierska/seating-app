import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import LoginModal from './LoginModal';
import firebase from './../utils/firebase';
import Expo from 'expo';
import { Google } from 'expo';
import { auth } from './../utils/auth';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			isModalVisible: false
		}
	}

	checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged((user) => {
            console.log("Checking if user is already logged in")
            if (user != null) {
                console.log('User logged in:', user);
				this.props.navigation.navigate('Project')
            } else {
                console.log('User NOT logged in:', user);
				this.setModalVisible(true);
            }
        })
	}

	isUserEqual = (googleUser, firebaseUser) => {
	  	if (firebaseUser) {
	    	var providerData = firebaseUser.providerData;
	    	for (var i = 0; i < providerData.length; i++) {
	      		if (providerData[i].providerId === firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
	          		providerData[i].uid === googleUser.getBasicProfile().getId()) {
	        		return true;
	      		}
	    	}
	  	}
  		return false;
	}

	onSignIn = (googleUser) => {
	  	var unsubscribe = firebase.auth().onAuthStateChanged(function(firebaseUser) {
		    unsubscribe();
		    if (!this.isUserEqual(googleUser, firebaseUser)) {
		      	var credential = firebase.auth.GoogleAuthProvider.credential(
					googleUser.idToken,
					googleUser.accessToken
				);
		      	firebase.auth().signInAndRetrieveDataWithCredential(credential)
					.then(function() {
						console.log('User signed in!!')
					})
					.catch(function(error) {
		        	var errorCode = error.code;
		        	var errorMessage = error.message;
		        	var email = error.email;
		        	var credential = error.credential;
		      	});
		    } else {
		      	console.log('User already signed-in Firebase.');
		    }
	  	}.bind(this));
	}

	loginWithGoogle = async () => {
		this.setModalVisible(false);
	    const clientId = auth.google.clientId;
	    const result = await Google.logInAsync({ clientId });

	    if (result.type === 'success') {
	      console.log('Login successful', result.user);
		  this.setState({loggedIn: true});
	      this.onSignIn(result)
	  } else {
	      console.log('Login unsuccessful', result.type)
	  }
	}

	setModalVisible = (visible) => {
		console.log(visible)
    	this.setState({isModalVisible: visible});
  	}

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


				<TouchableOpacity
					style={styles.btn}
					onPress={() => this.checkIfLoggedIn()}>
					<Text style={styles.btnText}>Your Project</Text>
				</TouchableOpacity>

				<LoginModal
					login={this.loginWithGoogle.bind(this)}
					close={this.setModalVisible.bind(this)}
					isVisible={this.state.isModalVisible} />
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

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Home);
