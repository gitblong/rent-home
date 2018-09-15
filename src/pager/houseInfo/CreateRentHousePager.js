/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from '../../component/Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';

class CreateRentHousePager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {children} = this.props;
        return (
            <div>
                上传房源
            </div>
        )
    }
}

export default CreateRentHousePager;