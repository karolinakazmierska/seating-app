import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProjectTabNav from "../navigators/ProjectTabNav";
import { NavigationActions } from "react-navigation";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
		this.state = { rand: 0 }
	}
	static router = ProjectTabNav.router;

	shouldComponentUpdate = () => {
		console.log('shouldComponentUpdate is being called in DASHBOARD')
		return true;
	}

	static navigationOptions = ({ navigation }) => {
		return {
			title: "Your Project Details",
		};
	};

	render() {
		const stateClone = Object.assign({}, this.state, {rand: Math.random()})
		return <ProjectTabNav
			navigation={this.props.navigation}
			screenProps={stateClone}
		/>;
	}
}
