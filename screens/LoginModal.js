import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import { logIn } from './../actions/actions';

class LoginModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => this.props.login()}
                    >
                            <Text style={styles.btnText}>Sign in with Google</Text>
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
