import React, { Component } from "react";
import AppStackNav from "./navigators/AppStackNav";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import reducers from "./reducers/Reducer";

const store = createStore(reducers);

class App extends Component {
	constructor(props) {
    	super(props);
  	}

	render() {
		return (
			<Provider store={store}>
				<AppStackNav />
			</Provider>
		)
	}
}

export default App;
