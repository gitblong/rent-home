// 首先我们需要导入一些组件...
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './component/Home';

class App extends React.Component {

    render() {
        return (
            <Router>
                <Route path="/" component={Home}>
                </Route>
            </Router>
        )

    }
}
ReactDOM.render(<App />, document.getElementById('app'));

