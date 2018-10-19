// 首先我们需要导入一些组件...
import React from "react";
import ReactDOM from "react-dom";
import Main from "./pager/Main";
import {createStore} from "redux";
import {Provider} from "react-redux";
import {
    CHANGE_CURRENT_CITY,
    CHANGE_HOUSE_INFO_BY_CONDITION,
    CLOSE_POSITION_POPPER,
    INIT_IPFS_UTILS,
    OPEN_POSITION_POPPER,
    CHANGE_SHOW_HOUSE_INFO_COUNT

} from './constants/ActionTypes';

import HouseInfo from "./contracts/HouseInfo.json";
import ArrayStorage from "./contracts/ArrayStorage.json";
import {Drizzle, generateStore} from "drizzle";
import {IPFSUtils} from "./smart-contract-ipfs/IPFSUtils";

require('./styles/map.css');
require('./styles/UploadImage.css');
require('./styles/pagination.css');

const options = {contracts: [HouseInfo,ArrayStorage]};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const ipfsAPI = require('ipfs-api');
const ipfs = ipfsAPI({host: 'localhost', port: '5001', protocol: 'http'});


class App extends React.Component {
    state = {
        loading: true,
        drizzleState: null,
        store:null
    };
    constructor(props) {
        super(props);

    }

    componentDidMount(){

        // this.initReducer();
        this.unsubscribe = drizzle.store.subscribe(() => {
            const drizzleState = drizzle.store.getState();
            if (drizzleState.drizzleStatus.initialized) {
                this.initReducer(drizzle);
                this.setState({
                    loading: false,
                    drizzleState,
                    drizzle
                });
            }
        })

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    initReducer = (drizzle => {
        let ipfsUtils = new IPFSUtils(ipfs, drizzle);
        let allHouseInfoData = ipfsUtils.init();
        // console.log("index------",allHouseInfoData);
        let houseInfoByCondition = new Promise(resolve => {
            allHouseInfoData.then(result => {
                let houseInfoByCondition = ipfsUtils.getHouseInfoByCondition(result, '3301');
                resolve(houseInfoByCondition);
            });
        });
        let showHouseInfoCount = ipfsUtils.getShowHouseInfoCount();
        // console.log(houseInfoByCondition);
        const initialState = {
            text: 'Hello',
            isOpen: false,
            currentCity: {
                name: '杭州',
                code: '3301'
            },
            init: true,
            allHouseInfoData,
            houseInfoByCondition,
            ipfsUtils,
            showHouseInfoCount:new Promise(resolve => resolve(0))

        };
        const reducer = (state = initialState, action, option) => {
            switch (action.type) {
                case 'CHANGE_TEXT':
                    return {
                        ...state,
                        text: state.text == 'Hello' ? 'world' : 'Hello'
                    };
                case 'BUTTON_CLICK':
                    return {
                        ...state,
                        text: 'Hello world'
                    };
                case OPEN_POSITION_POPPER:
                    // console.log("OPEN_POSITION_POPPER", OPEN_POSITION_POPPER);
                    return {
                        ...state,
                        isOpen: !state.isOpen,
                    };
                case CLOSE_POSITION_POPPER:
                    return {
                        ...state,
                        isOpen: false,
                        rentTypeAnchorEl: null
                    };
                case INIT_IPFS_UTILS:
                    // console.log(action.ipfsUtils);
                    return {
                        ...state,
                        ipfsUtils: ipfsUtils
                    };
                case CHANGE_CURRENT_CITY:
                    // console.log(action.currentCity);
                    return {
                        ...state,
                        currentCity: action.currentCity
                    };
                case CHANGE_HOUSE_INFO_BY_CONDITION:
                    // console.log("CHANGE_HOUSE_INFO_BY_CONDITION", action.houseInfoByCondition);
                    return {
                        ...state,
                        init: false,
                        houseInfoByCondition: action.houseInfoByCondition
                    };
                case CHANGE_SHOW_HOUSE_INFO_COUNT:
                    // console.log(CHANGE_SHOW_HOUSE_INFO_COUNT,action.showHouseInfoCount);
                    return {
                        ...state,
                        showHouseInfoCount:action.showHouseInfoCount
                    };
                default:
                    return initialState;
            }
        };
        const store = createStore(reducer);
        this.setState({
            store
        })
    });
    render() {
        let {loading,drizzleState,store} = this.state;
        if(loading) return <div>loading smart contract</div>;
        return (

            <Provider store={store}>
                <Main />
            </Provider>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('app'));

