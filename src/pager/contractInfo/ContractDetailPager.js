/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from '../houseInfo/Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';

class ContractDetailPager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {children} = this.props;
        return (
            <div>
                租赁合同详情页
            </div>
        )
    }
}

export default ContractDetailPager;