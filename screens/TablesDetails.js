import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from 'react-redux';
import { deleteTable, assignGuest, unassignGuest, reorderGuests } from './../actions/actions';
import Tables from './Tables';
import { Dimensions } from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist'

class TablesDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	shouldComponentUpdate = () => {
		return true;
	}

	deleteTable = (key) => {
		console.log('Deleting:', key)
		this.props.dispatch(deleteTable(key));
		this.setState({});
		this.props.navigation.navigate('Tables', {update: true});
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
		if (this.getAssignedGuests(tableKey).length >= this.props.navigation.getParam('tableCapacity')) {
			console.log('Cannot assign any more guests to this table');
			return;
		}
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

	reorderGuests = (data, tableKey) => {
		this.props.dispatch(reorderGuests(data,tableKey));
		this.setState({});
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

					<DraggableFlatList
          				data={guestsAssigned}
          				renderItem={({ item, index, move, moveEnd, isActive }) => {
							var guestName = item.name;
							return (
								<TouchableOpacity
									style={styles.guestContainer}
									onLongPress={move}
									onPressOut={moveEnd}
									onPress={() => this.removeGuestFromTable(guestName,tableKey)}
								>
									<Text style={styles.item}>{guestName}</Text>
								</TouchableOpacity>
							)
						}}
          				scrollPercent={20}
          				onMoveEnd={({ data }) => this.reorderGuests({ data }, tableKey)}
        			/>

					<TouchableOpacity
						style={styles.cancel}
						onPress={() => this.deleteTable(tableKey)}>
						<Text style={styles.cancelText}>Delete this table</Text>
					</TouchableOpacity>
				</View>
				<View style={{flex: 1}}>
					<FlatList
						ItemSeparatorComponent={this.renderSeparator}
						data={guestsNotAssigned}
						renderItem={({item}) => {
							var guestName = item.name;
							return <TouchableOpacity
								style={styles.guestContainer}
								onPress={() => this.addGuestToTable(guestName, tableKey)}>
								<Text style={styles.item} >{guestName}</Text>
								<Text style={styles.item}>{item.assignedTo}</Text>
							</TouchableOpacity>
						}}
					/>
				</View>
			</View>
		);
	}
}

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
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(TablesDetails);
