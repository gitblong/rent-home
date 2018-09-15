// 首先我们需要导入一些组件...
import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Main from "./pager/Main";
import Album from './component/Album';
class App extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Router>
                <Main/>
            </Router>
        )

    }
}
ReactDOM.render(<App />, document.getElementById('app'));

