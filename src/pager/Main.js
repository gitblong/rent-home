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
import Router from "react-router-dom/HashRouter";

import AreaSearchPager from "./houseInfo/AreaSearchPager";
import HouseDetailPager from "./houseInfo/HouseDetailPager";
import CreateRentHousePager from "./houseInfo/CreateRentHousePager";
import MyHousesPager from "./houseInfo/MyHousesPager";
import MyContractsPager from "./contractInfo/MyContractsPager";
import CreateContractPager from "./contractInfo/CreateContractPager";
import ContractDetailPager from "./contractInfo/ContractDetailPager";
import RouterConfig from "../config/RouteConfig";
import {connect} from "react-redux";
import {MapStateToProps, MapDispatchToProps} from "../config/ReduxMapToPropsConfig";

import pagination from '../styles/pagination.css';

const styles = {
    clearFix: {
        zoom: 1,
        "&:before": {

            display: 'block',
            // visibility: 'hidden',
            clear: 'both',
            height: 0,
            content: 'dsfsf'
        }
    }
}

class Main extends React.Component {


    render() {
        const {classes} = this.props
        return (
            <div onClick={this.props.onClose}>
                <Router>
                    <div>
                        <Header/>
                        <main className={classes.clearFix}>
                            <Switch>
                                <Route path='/' exact component={Home}/>
                                <Route path={RouterConfig.areaSearch.path} component={AreaSearchPager}/>
                                <Route path={RouterConfig.houseDetail.path} component={HouseDetailPager}/>
                                <Route path={RouterConfig.creatRentHouse.path} component={CreateRentHousePager}/>
                                <Route path={RouterConfig.myHouses.path} component={MyHousesPager}/>

                                <Route path={RouterConfig.myContract.path} component={MyContractsPager}/>
                                <Route path={RouterConfig.createContract.path} component={CreateContractPager}/>
                                <Route path={RouterConfig.contractDetail.path} component={ContractDetailPager}/>

                            </Switch>
                        </main>
                        <Footer/>
                    </div>
                </Router>
            </div>
        );
    }
}
Main = connect(MapStateToProps, MapDispatchToProps)(Main);
export default withStyles(styles)(Main);