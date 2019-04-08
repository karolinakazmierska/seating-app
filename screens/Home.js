import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from "react-native";
import { connect } from 'react-redux';
import { Dimensions } from "react-native";
import LoginModal from './LoginModal';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
		}
	}

	setModalVisible = (visible) => {
		console.log(visible)
    	this.setState({modalVisible: visible});
  	}

	loggedIn = (didLogin) => {
		// check if passed login data is correct?  --> if yes, hide the modal & proceed to Project / if not, show error
		console.log('DidLogin?', didLogin);
		if (didLogin) {
			this.setState({modalVisible: false});
		} else {
			console.log('Login unsuccessful')
		}
	}

	render() {
		const { navigate } = this.props.navigation;
		const isLoggedIn = this.props.guests.loggedIn;
		return (
			<ImageBackground source={require('./../images/rings.jpg')} style={styles.container}>
				<View style={styles.welcome}>
					<Text style={{fontSize: 20, textAlign: "center"}}>Welcome to Seating Chart App!</Text>
				</View>
				<Text style={styles.subtitle}>
					Arrange your wedding seating plan
				</Text>

					{isLoggedIn ? (
						<View style={styles.wrapper}>
							<TouchableOpacity style={styles.btn} onPress={() => navigate("Project")}>
								<Text style={styles.btnText}>Project</Text>
							</TouchableOpacity>
						</View>
					) : (
						<View style={styles.wrapper}>
							<TouchableOpacity
								style={styles.button}
								onPress={() => this.setModalVisible(true)}>
								<Text style={styles.buttonText}>Log in</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btn} onPress={() => navigate("Project")}>
								<Text style={styles.btnText}>Register</Text>
							</TouchableOpacity>
						</View>
					)}

				<LoginModal
					close={this.setModalVisible.bind(this)}
					isVisible={this.state.modalVisible}
					navigation={this.props.navigation}
					loginSuccess={this.loggedIn}/>
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
