import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ProjectTabNav from "../navigators/ProjectTabNav";
import { NavigationActions } from "react-navigation";

export default class Dashboard extends Component {
	constructor(props) {
		super(props);
	}
	static router = ProjectTabNav.router;

	static navigationOptions = ({ navigation }) => {
		return {
			title: "Your Project Details",
		};
	};

	render() {
		return <ProjectTabNav
			navigation={this.props.navigation}
		/>;
	}
}
