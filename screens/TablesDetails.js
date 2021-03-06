import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from "react-native";
import { connect } from 'react-redux';
import { deleteTable, assignGuest, unassignGuest, reorderGuests, updateCapacity } from './../actions/actions';
import Tables from './Tables';
import { Dimensions } from "react-native";
import DraggableFlatList from 'react-native-draggable-flatlist';
import { Icon } from 'react-native-elements';
import { myStyles } from './../utils/styles';
import EditCapacity from './EditCapacity';

const width = Dimensions.get('window').width;
const tableDim = 150;
const val1 = width/2-tableDim/2;
const chairDim = 70;
const tableContainerDim = width;

class TablesDetails extends Component {
	constructor(props) {
		super(props);
		this.state = {
			tableCapacity: this.props.navigation.getParam('tableCapacity'),
			maxCapacity: false,
			modalVisible: false,
			minCapacityError: false
		}
	}

	shouldComponentUpdate = () => {
		return true;
	}

	deleteTable = (key) => {
		this.props.dispatch(deleteTable(key));
		this.setState({});
		this.props.navigation.navigate('Tables', {update: true});
	}

	setModalVisible = (isVisible) => {
    	return this.setState({modalVisible: isVisible});
	}

	updateCapacity = (newCapacity,isVisible) => {
		if (newCapacity < this.getAssignedGuests(this.props.navigation.getParam('table')).length) {
			console.log('Not possible to update the capacity'); // @todo: pass the error message to the modal and display it there
			this.setState({minCapacityError: true});
		} else {
			this.props.dispatch(updateCapacity(this.props.navigation.getParam('table'), newCapacity));
			return this.setState({
				modalVisible: isVisible,
				tableCapacity: newCapacity,
				minCapacityError: false
			});
		}
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
		if (this.getAssignedGuests(tableKey).length >= this.state.tableCapacity) {
			this.displayAlert();
			return;
		}
		this.props.dispatch(assignGuest(guestName,tableKey));
		this.setState({});
	}

	removeGuestFromTable = (guestName, tableKey) => {
		this.props.dispatch(unassignGuest(guestName,tableKey));
		this.setState({});
	}

	renderSeparator = () => {
	    return (
		    <View
		        style={{
			        height: 1,
			        width: width,
			        backgroundColor: myStyles.colors.dark
		        }}
		    />
	    );
  	}

	reorderGuests = (data, tableKey) => {
		this.props.dispatch(reorderGuests(data,tableKey));
		this.setState({});
	}

	setPosition = (index) => {
		const capacity = this.state.tableCapacity;
		let i = index + 1;
		let dist = 360 / capacity;
		let radius = capacity*10+20;
		let offsetToParentCenter = tableContainerDim / 2;
		let offsetToChildCenter = chairDim/2;
		let totalOffset = offsetToParentCenter - offsetToChildCenter;
		let y = (Math.sin((dist * i) * (Math.PI / 180)) * radius) + totalOffset;
		let x = (Math.cos((dist * i) * (Math.PI / 180)) * radius) + totalOffset;
		return {position: "absolute", top: y, left: x }
	}

	displayAlert = () => {
		this.setState({maxCapacity: true});
		setTimeout(() => {
			this.setState({maxCapacity: false});
		}, 2000);
	}

	render() {
    const { navigation } = this.props;
	const tableKey = navigation.getParam('table');
	const guestsAssigned = this.getAssignedGuests(tableKey);
	const guestsNotAssigned = this.getNotAssignedGuests(tableKey);
	const capacityAlert = <Text style={styles.alert}>Cannot assign more people to this table </Text>;
		return (
			<View style={styles.container}>
				<View style={{flex: 2, alignItems: "center"}}>
					<View style={styles.header}>
						<Text style={styles.welcome}>{tableKey}</Text>
					</View>
					<Text style={styles.params}>Table capacity: {this.state.tableCapacity}</Text>
					<Text style={styles.params}>Tap on guests to add them to or remove them from the table</Text>
					<View style={styles.tableContainer}>
						<View style={styles.table}></View>
						<DraggableFlatList
	          				data={guestsAssigned}
							horizontal={false}
	          				renderItem={({ item, index, move, moveEnd, isActive }) => {
								let guestName = item.name;
								let styleNo = this.setPosition(index);
								return (
									<TouchableOpacity
										style={[styles.guestAtThisTable, styleNo]}
										onLongPress={move}
										onPressOut={moveEnd}
										onPress={() => this.removeGuestFromTable(guestName,tableKey)}
									>
										<Text numberOfLines={1}>{guestName}</Text>
									</TouchableOpacity>
								)
							}}
	          				scrollPercent={20}
	          				onMoveEnd={({ data }) => this.reorderGuests({ data }, tableKey)}
	        			/>
						{this.state.maxCapacity ? capacityAlert : null}
					</View>

					<TouchableOpacity
						style={styles.edit}
						onPress={() => this.setModalVisible(true)}>
						<Text style={styles.deleteText}>Edit capacity</Text>
					</TouchableOpacity>
					<EditCapacity
						close={this.setModalVisible.bind(this)}
						key={tableKey}
						currentCapacity={this.state.tableCapacity}
						update={this.updateCapacity.bind(this)}
						isVisible={this.state.modalVisible}
						error={this.state.minCapacityError} />

					<TouchableOpacity
						style={styles.delete}
						onPress={() => this.deleteTable(tableKey)}>
						<Text style={styles.deleteText}>Delete table</Text>
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
								<Icon
									name='user'
									type='font-awesome'
									color={myStyles.colors.dark}
								/>
								<Text style={styles.item} >{guestName}</Text>
								<Icon
									name='circle'
									type='font-awesome'
									color={myStyles.colors.dark}
								/>
								<Text style={styles.item}>{item.assignedTo}</Text>
							</TouchableOpacity>
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: myStyles.colors.white
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10,
		fontWeight: "bold",
		color: myStyles.colors.dark
	},
	params: {
		textAlign: "center",
		marginVertical: 5,
		marginHorizontal: 22
	},
	header: {
		marginVertical: 10,
		flexDirection: "row",
		justifyContent: "space-between"
	},
	item: {
		flex: 1,
		height: 50,
		alignItems: 'center',
		paddingVertical: 15,
		paddingLeft: 15
	},
	delete: {
		height: 40,
		width: 100,
		borderRadius: 40,
		backgroundColor: myStyles.colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
		position: "absolute",
		bottom: 8,
		right: 12
	},
	edit: {
		height: 40,
		width: 100,
		borderRadius: 40,
		backgroundColor: myStyles.colors.dark,
		alignItems: 'center',
		justifyContent: 'center',
		position: "absolute",
		bottom: 8,
		left: 12
	},
	deleteText: {
		color: myStyles.colors.white,
		fontSize: 12
	},
	guestContainer: {
		flex: 1,
		width: width,
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 15,
		backgroundColor: myStyles.colors.faded
	},
	tableContainer: {
		width: width,
		height: tableContainerDim,
	},
	table: {
		borderStyle: "solid",
		borderColor: myStyles.colors.dark,
		backgroundColor: myStyles.colors.dark,
		borderRadius: tableDim,
		height: tableDim,
		width: tableDim,
		overflow: "visible",
		position: "absolute",
		top: tableContainerDim/2-tableDim/2,
		left: val1,
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	},
	tableName: {
		color: myStyles.colors.white,
		fontSize: 16
	},
	guestAtThisTable: {
		width: chairDim,
		height: chairDim,
		borderRadius: chairDim,
		backgroundColor: myStyles.colors.faded,
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},

	guest: {
		backgroundColor: "#fefefe",
		fontSize: 10,
		textAlign: "center"
	},
	alert: {
		color: "#F31431",
		fontSize: 10,
		marginBottom: 45
	}
});

const mapStateToProps = (state) => {
  	const { guests } = state
  	return { guests }
};

export default connect(mapStateToProps)(TablesDetails);
