import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { compose } from 'redux';
import { connect } from 'react-redux';
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import Project from "../screens/Project";
import Placeholder from "../screens/Placeholder";
import TablesDetails from "../screens/TablesDetails";

const AppStackNav = ({ current, possible }) => {
    const Stack = createStackNavigator({
		Home: {
				screen: Home,
				navigationOptions: {
					header: null,
					title: "Home"
				}
		},
		Dashboard: {
			screen: Dashboard
		},
		Project: {
			screen: Project,
			navigationOptions: {
				title: "Project"
			}
		},
		Placeholder: {
			screen: Placeholder
		},
        TablesDetails: {
            screen: TablesDetails
        }
	});
    return <Stack />;
};

// Commented out as caused the whole app to re-render after update of the state
// const mapStateToProps = ({ guests }) => {
//     return {
//         current: guests.current,
//         possible: guests.added
//     };
// }
// export default connect(mapStateToProps)(AppStackNav);
export default AppStackNav;
