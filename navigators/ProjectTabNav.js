import { createBottomTabNavigator } from "react-navigation";
import Guests from "../screens/Guests";
import Tables from "../screens/Tables";

const ProjectTabNav = createBottomTabNavigator(
	{
		Guests: { screen: Guests },
		Tables: { screen: Tables }
	},
	{
		backBehavior: "none",
		tabBarPosition: "bottom"
	}
);
export default ProjectTabNav;
