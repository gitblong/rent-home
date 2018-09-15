/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Home from "../component/Home";
import Route from "react-router-dom/Route";
import Switch from "react-router-dom/Switch";

import AreaSearchPager from "./houseInfo/AreaSearchPager";
import HouseDetailPager from "./houseInfo/HouseDetailPager";
import CreateRentHousePager from './houseInfo/CreateRentHousePager';
import MyHousesPager from './houseInfo/MyHousesPager';

import MyContractsPager from './contractInfo/MyContractsPager';
import CreateContractPager from './contractInfo/CreateContractPager';
import ContractDetailPager from './contractInfo/ContractDetailPager';
import RouterConfig from '../config/RouteConfig';
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {children} = this.props;
        return (
            <div>
                <Header/>
                <Switch>
                    <Route path='/' exact component={Home}/>
                    <Route path={RouterConfig.areaSearch} component={AreaSearchPager}/>
                    <Route path={RouterConfig.houseDetail} component={HouseDetailPager}/>
                    <Route path={RouterConfig.creatRentHouse} component={CreateRentHousePager}/>
                    <Route path={RouterConfig.myHouses} component={MyHousesPager}/>

                    <Route path={RouterConfig.myContract} component={MyContractsPager}/>
                    <Route path={RouterConfig.createContract} component={CreateContractPager}/>
                    <Route path={RouterConfig.contractDetail} component={ContractDetailPager}/>

                </Switch>
                <Footer/>
            </div>
        );
    }
}

export default Main;