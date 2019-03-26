import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList  } from "react-native";
import { connect } from 'react-redux';

class Guests extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Guests</Text>
				<Text style={styles.welcome}>{this.props.navigation.state.params}</Text>
				<FlatList
		          	data={[
			            {key: 'Devin'},
			            {key: 'Jackson'},
			            {key: 'James'},
			            {key: 'Joel'},
			            {key: 'John'},
			            {key: 'Jillian'},
			            {key: 'Jimmy'},
			            {key: 'Julie'},
		          	]}
		         renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        		/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	}
});

const mapStateToProps = (state) => {
  const { guests } = state
  return { guests }
};

export default connect(mapStateToProps)(Guests);
