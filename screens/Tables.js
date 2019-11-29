import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import { connect } from 'react-redux';
import { deleteTable, addTable } from './../actions/actions';
import AddTableModal from './Modal';
import { Dimensions } from "react-native";
import Swipeout from 'react-native-swipeout';
import { Icon } from 'react-native-elements';
import { myStyles } from './../utils/styles';

const width = Dimensions.get('window').width;
const halfwidth = Dimensions.get('window').width / 2;

class Tables extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			error: ''
		}
	}

	shouldComponentUpdate = () => {
		return true;
	}

	renderSeparator = () => {
	    return <View style={{ height: 1, width: width, marginLeft: 15, paddingRight: 15, backgroundColor: myStyles.colors.faded}} />
  	}

	deleteTable = (key) => {
		console.log('Deleting:', key)
		this.props.dispatch(deleteTable(key));
		return this.setState({});
	}

	addTable = (name, capacity) => {
		this.setState({ ...this.state, error: ''});
		var error;
		if (name === '') {
			error = 'name';
		}
		if (capacity == 0) {
			error = 'capacity';
		}
		this.props.guests.tables.forEach(obj => {
			if (obj.key.toUpperCase() == name.toUpperCase()) {
				error = 'exists';
			}
		});
		if (error == 'name') {
			this.setState({ ...this.state, error: 'Name cannot be empty' }, () => console.log(this.state));
		} else if (error == 'capacity') {
			this.setState({ ...this.state, error: 'Table capacity cannot be zero' }, () => console.log(this.state));
		} else if (error == 'exists') {
			this.setState({ ...this.state, error: 'This table is already on the list' }, () => console.log(this.state));
		} else {
			this.props.dispatch(addTable(name, capacity));
			this.setState({ ...this.state, modalVisible: false}, () => console.log(this.state));
		}
	}

	setModalVisible(visible) {
		console.log(visible)
    	return this.setState({ ...this.state, modalVisible: visible});
  	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Tables</Text>
				{this.props.guests.tables.length === 0 ? null : <FlatList
					ItemSeparatorComponent={this.renderSeparator}
		          	data={this.props.guests.tables}
		         	renderItem={({item}) => {
						var key = item.key;
						return <Swipeout style={styles.row} right={[
						  		{
									text: 'Delete',
									color: '#ffffff',
									backgroundColor: myStyles.colors.secondary,
									onPress: () => { this.deleteTable(key) }
								}
							]}>
  							<View style={styles.tableContainer}>
								<Icon
									name='circle'
									type='font-awesome'
									color={myStyles.colors.dark}
								/>
								<Text style={styles.item}>{item.key}</Text>
								<Icon
									name='users'
									type='font-awesome'
									color={myStyles.colors.dark}
								/>
								<Text style={styles.item}>{item.capacity}</Text>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('TablesDetails', {
										table: item.key,
										tableCapacity: item.capacity,
										deleteTable: this.deleteTable.bind(this)
									})} >
									<Icon
									  	name='chevron-right'
									  	type='font-awesome'
									  	color={myStyles.colors.dark}
									/>
								</TouchableOpacity>
							</View>
						</Swipeout>
					}}
        		/>}
				<AddTableModal close={this.setModalVisible.bind(this)} add={this.addTable.bind(this)} isVisible={this.state.modalVisible} error={this.state.error} />
				<TouchableOpacity
					style={styles.addTable}
					onPress={() => this.setModalVisible(true)} >
					<Icon name='plus' type='font-awesome' color='#ffffff' />
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "flex-start",
		backgroundColor: myStyles.colors.white
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	row: {
		flex: 1,
		backgroundColor: '#fff'
	},
	item: {
		flex: 1,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 15
	},
	tableContainer: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15
	},
	addTable: {
		height: 60,
		width: 60,
		borderRadius: 30,
		backgroundColor: myStyles.colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
		margin: 20,
		alignSelf: 'flex-end'
	}
});

const mapStateToProps = (state) => {
	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(Tables);
