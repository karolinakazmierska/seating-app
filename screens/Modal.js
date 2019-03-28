import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import { connect } from 'react-redux';

class AddTableModal extends Component {
    render() {
        return <Modal
            animationType="slide"
            transparent={false}
            visible={this.props.isVisible}>
            <View style={styles.modal}>
                <View>
                    <Text style={{alignSelf: 'center'}}>Hello World!</Text>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.cancel} onPress={() => this.props.close(false)}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancel} onPress={() => this.props.close}>
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
		justifyContent: 'center'
	},
	cancel: {
		height: 50,
		width: 150,
		borderRadius: 40,
		backgroundColor: "#532323",
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
