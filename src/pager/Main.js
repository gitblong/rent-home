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

import AreaSearch from "./houseInfo/AreaSearchPager";
import HouseDetail from "./houseInfo/HouseDetailPager";
import FillForm from './houseInfo/FillFormPager';
import MyHousesPager from './houseInfo/MyHousesPager';

import MyContractsPager from './contractInfo/MyContractsPager';
import CreateContractPager from './contractInfo/CreateContractPager';
import ContractDetailPager from './contractInfo/ContractDetailPager';

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
                    <Route path='/areaSearch' component={AreaSearch}/>
                    <Route path='/houseDetail' component={HouseDetail}/>
                    <Route path='/fillForm' component={FillForm}/>
                    <Route path='/myHouses' component={MyHousesPager}/>

                    <Route path='/myContract' component={MyContractsPager}/>
                    <Route path='/createContract' component={CreateContractPager}/>
                    <Route path='/contractDetail' component={ContractDetailPager}/>

                </Switch>
                <Footer/>
            </div>
    );
    }
    }

    export default Main;