/**
 * Created by chenqilong on 2018/9/11.
 */
import React from 'react';
import red from '@material-ui/core/colors/red';
import {withStyles} from '@material-ui/core/styles/';
import styles from '../styles/styles';
import Header from './Header';
import Middle from './Middle';
import Content from './Content';
import Footer from './Footer';
class Home extends React.Component {
    render() {
        const classes = this.props;
        return (
            <div>
                <Header/>
                <Middle/>
                <Content/>
                <Footer/>
            </div>
        )
    }
}

export default withStyles(styles)(Home);