import React, { Component } from "react";
import AppStackNav from "./navigators/AppStackNav";
import { Provider, connect } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from "./reducers/Reducer";

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

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
