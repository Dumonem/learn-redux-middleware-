import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {applyMiddleware, createStore} from "redux";
import {Provider} from "react-redux";
import rootReducer from "./modules";
import {logger} from "redux-logger/src";
import {composeWithDevTools} from "redux-devtools-extension";
import ReduxThunk from "redux-thunk";
import {Router} from "react-router-dom";
import {createBrowserHistory} from "history";

const customHistory = createBrowserHistory();

const store = createStore(
    rootReducer,
    // logger 를 사용하는 경우, logger가 가장 마지막에 와야합니다.
    composeWithDevTools(
        applyMiddleware(
            ReduxThunk.withExtraArgument({history: customHistory}), logger
        )
    )
)

ReactDOM.render(
    <React.StrictMode>
        <Router history={customHistory}>
            <Provider store={store}>
                <App/>
            </Provider>
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
