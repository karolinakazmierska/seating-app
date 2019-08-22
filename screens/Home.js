import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { setUserId, setStateFromDatabase } from './../actions/actions';
import { Dimensions } from "react-native";
import LoginModal from './LoginModal';
import firebase from './../utils/firebase';
import Expo from 'expo';
import { Google } from 'expo';
import { auth } from './../utils/auth';
import { myStyles } from './../utils/styles';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loggedIn: false,
			isModalVisible: false
		}
	}

	setUserId = (userId) => {
		this.props.dispatch(setUserId(userId));
	}

	setStateFromDatabase = (userId, data) => {
		this.props.dispatch(setStateFromDatabase(userId, data))
	}

	checkIfLoggedIn = () => {
		firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                console.log('checkIfLoggedIn(). User already logged in:', user.displayName);
				this.props.navigation.navigate('Project')
            } else {
                console.log('checkIfLoggedIn(). User not logged in yet');
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
		      	firebase
					.auth()
					.signInAndRetrieveDataWithCredential(credential)
					.then(function(result) {
						console.log('onSignIn(). User signed in successfully.');
						if (result.additionalUserInfo.isNewUser) {
							console.log('This is a new user.')
							firebase
								.database()
								.ref('/users/' + result.user.uid)
								.set({
									gmail: result.user.email,
									profile_picture: result.additionalUserInfo.profile.picture,
									locale: result.additionalUserInfo.profile.locale,
									first_name: result.additionalUserInfo.profile.given_name,
									last_name: result.additionalUserInfo.profile.family_name,
									created_at: Date.now()
								}).then(() => {
								this.setUserId(result.user.uid);
							})
						} else {
							console.log('This is an existing user.')
							firebase
								.database()
								.ref('/users/' + result.user.uid)
								.update({
									last_logged_in: Date.now()
								})
								.then(() => {
									firebase.database().ref('/users/' + result.user.uid).on("value", (snap) => {
										console.log('Existing user id:', result.user.uid);
										this.setStateFromDatabase(result.user.uid, snap.val())
									})
								})
						}
					}.bind(this))
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
	      console.log('loginWithGoogle() successful', result.user);
		  this.setState({loggedIn: true});
	      this.onSignIn(result)
	  } else {
	      console.log('loginWithGoogle() unsuccessful', result.type)
	  }
	}

	setModalVisible = (visible) => {
		console.log(visible)
    	this.setState({isModalVisible: visible});
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
