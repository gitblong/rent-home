/**
 * Created by chenqilong on 2018/9/10.
 */
import React from 'react';
import {
    BrowserRouter as Router,
    route,
    Link
} from 'react-router-dom';

const Home = ()=> (
    <div>
        <h2>Home</h2>
    </div>
)

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({match}) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({match}) => {
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Router path={`${match.path}/:topicId`} component={Topic}/>
        <Router exact path={match.path} render={()=>(
            <h3>Please select a topic.</h3>
        )}/>
    </div>
}

const BasicExample = () => (
    <Router>
        <div>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/">About</Link></li>
                <li><Link to="/">Topics</Link></li>
            </ul>
            <hr/>
            <Router exact path="/" component={Home}/>
            <Router exact path="about" component={About}/>
            <Router exact path="topics" component={Topics}/>

        </div>
    </Router>
)