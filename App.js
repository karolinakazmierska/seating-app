import React, { Component } from "react";
import AppStackNav from "./navigators/AppStackNav";
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import guestsReducer from "./reducers/GuestsReducer";

const store = createStore(guestsReducer);

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
