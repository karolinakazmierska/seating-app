import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import { compose } from 'redux';
import { connect } from 'react-redux';
import Home from "../screens/Home";
import Dashboard from "../screens/Dashboard";
import Project from "../screens/Project";
import Placeholder from "../screens/Placeholder";

const AppStackNav = ({ currentGuests, possibleGuests }) => {
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
			}
	});
    return <Stack />;
};

const mapStateToProps = ({ guests }) => {
    return {
        currentGuests: guests.current,
        possibleGuests: guests.added
    };
}

export default connect(mapStateToProps)(AppStackNav);

// With createAppContainer:
// export default createAppContainer(connect(mapStateToProps)(AppStackNav));
// export default compose( // import { compose } from 'redux';
//     connect(mapStateToProps),
//     createAppContainer
// )(AppStackNav);
