import React, { Component, useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button, Animated } from "react-native";
import { NavigationActions } from "react-navigation";
import firebase from './../utils/firebase';
import { myStyles } from './../utils/styles';

export default class Project extends Component {

	render() {
		const { navigation } = this.props;

		const FadeInLeftTop = (props) => {
			const [fadeAnim] = useState(new Animated.Value(0))
			React.useEffect(() => {
				Animated.timing(fadeAnim, { toValue: 1, delay: 1000, duration: 800 }).start();
			}, [])
			return (
				<Animated.View style={{...props.style, opacity: fadeAnim}}>{props.children}</Animated.View>
			);
		}

		const FadeInRightTop = (props) => {
			const [fadeAnim] = useState(new Animated.Value(0))
			React.useEffect(() => {
				Animated.timing(fadeAnim, { toValue: 1, delay: 1500, duration: 800 }).start();
			}, [])
			return (
				<Animated.View style={{...props.style, opacity: fadeAnim}}>{props.children}</Animated.View>
			);
		}

		const FadeInLeftBottom = (props) => {
			const [fadeAnim] = useState(new Animated.Value(0))
			React.useEffect(() => {
				Animated.timing(fadeAnim, { toValue: 1, delay: 2000, duration: 800 }).start();
			}, [])
			return (
				<Animated.View style={{...props.style, opacity: fadeAnim}}>{props.children}</Animated.View>
			);
		}

		const FadeInRightBottom = (props) => {
			const [fadeAnim] = useState(new Animated.Value(0))
			React.useEffect(() => {
				Animated.timing(fadeAnim, { toValue: 1, delay: 2500, duration: 800 }).start();
			}, [])
			return (
				<Animated.View style={{...props.style, opacity: fadeAnim}}>{props.children}</Animated.View>
			);
		}

		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Add guests to your project and assign them to tables of your choice</Text>

				<View style={{marginBottom: 50}}>
					<View style={styles.table}>
						<FadeInLeftTop style={styles.chair1}><Text style={{color: "white"}}>Martha</Text></FadeInLeftTop>
						<FadeInRightTop style={styles.chair2}><Text style={{color: "white"}}>John</Text></FadeInRightTop>
						<FadeInLeftBottom style={styles.chair3}><Text style={{color: "white"}}>Susan</Text></FadeInLeftBottom>
						<FadeInRightBottom style={styles.chair4}><Text style={{color: "white"}}>Bob</Text></FadeInRightBottom>
					</View>
				</View>

				<View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
					<TouchableOpacity
	          			style={styles.btn}
	          			onPress={() => this.props.navigation.navigate('Dashboard')} >
						<Text style={styles.buttonText}>Modify guest list</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.btn}
	          			onPress={() => this.props.navigation.navigate('Tables')} >
						<Text style={styles.buttonText}>Assign guests to tables</Text>
					</TouchableOpacity>
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
		backgroundColor: "white"
	},
	welcome: {
		flex: 1,
		fontSize: 20,
		textAlign: "center",
		margin: 10,
		paddingHorizontal: 30,
		paddingVertical: 50
	},
	link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	},
	btn: {
		width: 260,
		height: 50,
		borderRadius: 30,
		borderColor: myStyles.colors.dark,
		backgroundColor: myStyles.colors.dark,
		paddingHorizontal: 20,
		alignItems: "center",
		justifyContent: "center",
		textAlign: "center",
		margin: 15
	},
	buttonText: {
		fontSize: 16,
		textTransform: 'uppercase',
		color: "white",
		alignSelf: "center",
		textAlign: "center"
	},
	table: {
		borderStyle: "solid",
		borderColor: myStyles.colors.dark,
		backgroundColor: myStyles.colors.dark,
		borderRadius: 140,
		height: 140,
		width: 140,
		overflow: "visible",
	},
	chair1: {
		backgroundColor: myStyles.colors.secondary,
		color: myStyles.colors.white,
		borderRadius: 60,
		height: 60,
		width: 60,
		position: "absolute",
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		left: -10,
		top: -5,
		overflow: "hidden"
	},
	chair2: {
		backgroundColor: myStyles.colors.secondary,
		color: myStyles.colors.white,
		borderRadius: 60,
		height: 60,
		width: 60,
		position: "absolute",
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		right: -10,
		top: -5,
		overflow: "hidden"
	},
	chair3: {
		backgroundColor: myStyles.colors.secondary,
		color: myStyles.colors.white,
		borderRadius: 60,
		height: 60,
		width: 60,
		position: "absolute",
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		left: -10,
		top: 90,
		overflow: "hidden"
	},
	chair4: {
		backgroundColor: myStyles.colors.secondary,
		color: myStyles.colors.white,
		borderRadius: 60,
		height: 60,
		width: 60,
		position: "absolute",
		textAlign: "center",
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		right: -10,
		top: 90,
		overflow: "hidden"
	},
});
