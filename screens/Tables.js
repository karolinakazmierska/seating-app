import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal } from "react-native";
import { connect } from 'react-redux';
import { deleteTable, addTable, deleteTableThunk, addTableThunk } from './../actions/actions';
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
		}
	}

	shouldComponentUpdate = () => {
		return true;
	}

	renderSeparator = () => {
	    return <View style={{ height: 1, width: width, backgroundColor: "#FFE6E6"}} />
  	}

	deleteTable = (key) => {
		console.log('Deleting:', key)
		this.props.dispatch(deleteTableThunk(key, this.props.guests.userId));
		return this.setState({});
	}

	addTable = (name, capacity) => {
		let exists = false;
		if (name === '') {
			console.log('Name cannot be empty') //@todo: display message to the user
			exists = true;
		}
		if (capacity == 0) {
			console.log('Table capacity cannot be zero') //@todo: display message to the user
			exists = true;
		}
		console.log('Current tables:', this.props.guests.tables);
		this.props.guests.tables.forEach(obj => {
			console.log('Checking if table exists:', obj.key.toUpperCase(), name.toUpperCase() )
			if (obj.key.toUpperCase() == name.toUpperCase() || name == '') {
				console.log('This table is already on the list'); //@todo: display message to the user
				exists = true;
			}
		});
		return exists ? null : this.setState({modalVisible: false}, () => {
			this.props.dispatch(addTableThunk(name, capacity, this.props.guests.userId))
		});
	}

	setModalVisible(visible) {
		console.log(visible)
    	return this.setState({modalVisible: visible});
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
									backgroundColor: '#532323',
									onPress: () => { this.deleteTable(key) }
								}
							]}>
  							<View style={styles.tableContainer}>
								<Icon
									name='circle'
									type='font-awesome'
									color='#FFE6E6'
								/>
								<Text style={styles.item}>{item.key}</Text>
								<Icon
									name='users'
									type='font-awesome'
									color='#FFE6E6'
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
									  	color='#FFE6E6'
									/>
								</TouchableOpacity>
							</View>
						</Swipeout>
					}}
        		/>}
				<AddTableModal close={this.setModalVisible.bind(this)} add={this.addTable.bind(this)} isVisible={this.state.modalVisible} />
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
		backgroundColor: '#FCF8F9'
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
