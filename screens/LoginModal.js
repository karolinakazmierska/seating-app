import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import { logIn } from './../actions/actions';

class LoginModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: ''
        }
    }

    handleLogin = (text) => {
    	this.setState({ login: text })
    }

    handlePassword = (text) => {
    	this.setState({ password: text })
    }

    loginUser = () => {
        console.log('Returning true')
        // validate login details
        // return true if login data is correct, false if cannot log in
        this.props.dispatch(logIn())
        return true
    }

    render() {
        console.log(this.props.navigation)
        return <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.isVisible}>
                <View style={styles.modal}>
                    <TouchableOpacity
                        style={styles.close}
                        onPress={() => this.props.close(false)}>
                        <Icon name='times-circle' type='font-awesome' color='#A03B54' size={32} />
                    </TouchableOpacity>
                    <View>
                        <Text>Log in</Text>
                    </View>
                    <TextInput
                        style={styles.input}
					    onChangeText={(text) => this.handleLogin(text)}
					    placeholder={'Your login'}>
                    </TextInput>
                    <TextInput
                        style={styles.input}
					    onChangeText={(text) => this.handlePassword(text)}
					    placeholder={'Your password'}>
                    </TextInput>
                    <TouchableOpacity style={styles.btn} onPress={() => this.props.loginSuccess(this.loginUser())}>
                        <Text style={styles.btnText}>Log in</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
    }
}

const styles = StyleSheet.create({
    modal: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
        backgroundColor: "#EFDBDC"
	},
    close: {
        position: "absolute",
        top: 60,
        right: 40,
    },
    input: {
        width: 300,
		height: 50,
		paddingHorizontal: 10,
        borderBottomColor: '#FCF8F9',
        borderBottomWidth: 1,
		color: "black",
		textAlign: "left",
        marginVertical: 10
    },
    btn: {
		width: 160,
		height: 50,
		borderRadius: 30,
		backgroundColor: "#ffffff",
		alignItems: 'center',
		justifyContent: 'center',
		margin: 30
	},
	btnText: {
		fontSize: 20,
		color: "#A03B54"
	}
})

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(LoginModal);
