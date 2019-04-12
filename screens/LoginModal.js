import React, { Component } from "react";
import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput, Image } from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { SocialIcon } from 'react-native-elements';
import { NavigationActions } from "react-navigation";
import { logIn } from './../actions/actions';
import { myStyles } from './../utils/styles';

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
                        <Icon name='times-circle' type='font-awesome' color={myStyles.colors.dark} size={32} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.login()} >
                        <Image source={require('./../images/google.png')} style={{width: 192, height: 46}} />
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
        backgroundColor: myStyles.colors.white
	},
    close: {
        position: "absolute",
        top: 60,
        right: 40,
    },
    googleBtn: {
        flexDirection: 'row',
        height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 30,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15
	},
	googleBtnText: {
		fontSize: 20,
		color: "grey"
	}
})

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(LoginModal);
