import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Dimensions } from "react-native";
import { myStyles } from './../utils/styles';

const width = Dimensions.get('window').width;

class AddTableModal extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: '',
            capacity: 0
		}
	}

    handleInput = (text) => {
		console.log(text);
    	this.setState({ name: text })
    }

    increaseCounter = () => {
        let count = this.state.capacity;
        if (count < 16) {
            this.setState({ capacity: count + 1 })
        }
    }

    decreaseCounter = () => {
        let count = this.state.capacity;
        if (count > 0) {
            this.setState({ capacity: count - 1 })
        }
    }

    render() {
        return <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.isVisible}>
            <View style={styles.modal}>
                <View>
                    <Text style={styles.welcome}>ADD ANOTHER TABLE</Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.name}
                        onChangeText={(text) => this.handleInput(text)}
                        placeholder={'Enter your table name'}
                    />
                    <Text style={styles.welcome}>TABLE CAPACITY</Text>
                    <View style={{flexDirection: 'row', justifyContent: "center", marginVertical: 20}}>
                        <TouchableOpacity
                            style={styles.counter}
                            onPress={() => this.decreaseCounter()}>
                            <Icon name='minus' type='font-awesome' color='#ffffff' />
                        </TouchableOpacity>
                        <Text style={styles.counterNumber}>{this.state.capacity}</Text>
                        <TouchableOpacity
                            style={styles.counter}
                            onPress={() => this.increaseCounter()}>
                            <Icon name='plus' type='font-awesome' color='#ffffff' />
                        </TouchableOpacity>
                    </View>
                    <Text style={{alignSelf: 'center'}}>Maximum capacity: 16</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={styles.cancel}
                            onPress={() => this.props.close(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.cancel}
                            onPress={() => this.props.add(this.state.name, this.state.capacity)}>
                            <Text style={styles.cancelText}>Add</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
    welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
    input: {
		width: width,
		height: 50,
		paddingHorizontal: 10,
		borderColor: "#ffffff",
		backgroundColor: "#ffffff",
		color: "black",
		textAlign: "left"
	},
    counter: {
        backgroundColor: myStyles.colors.dark,
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
		justifyContent: 'center',
        marginHorizontal: 30,
    },
    counterNumber: {
        height: 40,
        textAlign: "center",
        fontSize: 30
    },
	cancel: {
		height: 50,
		width: 150,
		borderRadius: 40,
		backgroundColor: myStyles.colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 15
	},
	cancelText: {
		color: "#ffffff"
	}
})

const mapStateToProps = (state) => {
  	const { tables } = state
  	return { tables }
};

export default connect(mapStateToProps)(AddTableModal);
