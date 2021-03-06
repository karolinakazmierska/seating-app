import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, TextInput } from "react-native";
import { connect } from 'react-redux';
import { Icon } from 'react-native-elements';
import { Dimensions } from "react-native";
import { myStyles } from './../utils/styles';

const width = Dimensions.get('window').width;

class EditCapacity extends Component {
    constructor(props) {
		super(props);
		this.state = {
			name: '',
            capacity: this.props.currentCapacity
		}
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
        console.log('Rerendering', this.props.error)
        return <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.isVisible}>
            <View style={styles.modal}>
                <View>
                    <Text style={styles.welcome}>Table capacity</Text>
                    {this.props.error ?
                        <Text style={styles.error}>Capacity cannot be lower than the number of currently assigned guests. To lower the capacity, first remove some guests from this table</Text> :
                        null
                    }
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
                            onPress={() => this.props.update(this.state.capacity, false)}>
                            <Text style={styles.cancelText}>Update</Text>
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
	},
    error: {
		color: myStyles.colors.error,
		fontSize: 10,
		textAlign: 'center'
	}
})

const mapStateToProps = (state) => {
  	const { tables } = state
  	return { tables }
};

export default connect(mapStateToProps)(EditCapacity);
