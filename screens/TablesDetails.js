import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from 'react-redux';
import { deleteTable, assignGuest, unassignGuest } from './../actions/actions';
import Tables from './Tables';
import { Dimensions } from "react-native";

class TablesDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	deleteTable = (key) => {
		console.log('Deleting:', key)
		this.props.dispatch(deleteTable(key));
		this.props.navigation.navigate('Tables', {});
	}

	getAssignedGuests = (key) => {
		let assigned = [];
		this.props.guests.added.forEach(obj => {
			if (obj.assignedTo == key) {
				assigned.push(obj);
			}
		})
		return assigned;
	}

	getNotAssignedGuests = (key) => {
		let notAssigned = [];
		this.props.guests.added.forEach(obj => {
			if (obj.assignedTo != key) {
				notAssigned.push(obj);
			}
		})
		return notAssigned;
	}

	addGuestToTable = (guestName, tableKey) => {
		console.log('Adding', guestName, 'to table', tableKey)
		this.props.dispatch(assignGuest(guestName,tableKey));
		this.setState({});
	}

	removeGuestFromTable = (guestName, tableKey) => {
		console.log('Removing', guestName, 'from table', tableKey)
		this.props.dispatch(unassignGuest(guestName,tableKey));
		this.setState({});
	}

	renderSeparator = () => {
	    return (
		    <View
		        style={{
			        height: 1,
			        width: width,
			        backgroundColor: "#FFE6E6"
		        }}
		    />
	    );
  	}

	render() {
    const { navigation } = this.props;
	const tableKey = navigation.getParam('table');
	const guestsAssigned = this.getAssignedGuests(tableKey);
	const guestsNotAssigned = this.getNotAssignedGuests(tableKey);
		return (
			<View style={styles.container}>
				<View style={{flex: 2}}>
					<Text style={styles.welcome}>EDIT THIS TABLE</Text>
					<Text style={styles.params}>Table name: {tableKey}</Text>
					<Text style={styles.params}>Guests assigned to this table:</Text>
					<FlatList
			          	data={guestsAssigned}
			         	renderItem={({item}) => {
							var key = item.key;
							return <TouchableOpacity style={styles.guestContainer} onPress={() => this.removeGuestFromTable(key, tableKey)}>
								<Text style={styles.item}>{item.key}</Text>
							</TouchableOpacity>
						}}
	        		/>
					<TouchableOpacity
						style={styles.cancel}
						onPress={() => this.deleteTable(key)}>
						<Text style={styles.cancelText}>Delete this table</Text>
					</TouchableOpacity>
				</View>
				<View style={{flex: 1}}>
					<FlatList
						ItemSeparatorComponent={this.renderSeparator}
						data={guestsNotAssigned}
						renderItem={({item}) => {
							var key = item.key;
							return <TouchableOpacity style={styles.guestContainer} onPress={() => this.addGuestToTable(key, tableKey)}>
								<Text style={styles.item} >{item.key}</Text>
								<Text style={styles.item}>{item.assignedTo}</Text>
							</TouchableOpacity>
						}}
					/>
				</View>
			</View>
		);
	}
}

//@todo: enable renaming table
//@todo: enable deleting table
//@todo: enable increasing table capacity
const width = Dimensions.get('window').width;
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#EFDBDC"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	params: {
		textAlign: "center",
		margin: 10
	},
	item: {
		flex: 1,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 15
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
	},
	guestContainer: {
		flex: 1,
		width: width,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: '#FCF8F9'
	}
});

const mapStateToProps = (state) => {
  	const { tables, guests } = state
  	return { tables, guests }
};

export default connect(mapStateToProps)(TablesDetails);
