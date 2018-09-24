/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from 'prop-types';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from './Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import ToolBar from '../../component/ToolBarTop';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

const styles = theme =>({
    root: {
        margin: '0 auto',
        left: 0,
        right: 0,
        width: 1000,
    }
})

class MyHousesPager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {classes, location,} = this.props;
        return (
            <div className={classes.root}>
                <ToolBar currentLocation={location} placeText="快速查找我的房源"/>
            </div>

        )
    }
}

MyHousesPager.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(MyHousesPager);