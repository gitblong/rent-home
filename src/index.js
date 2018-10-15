// 首先我们需要导入一些组件...
import React from "react";
import ReactDOM from "react-dom";
import Main from "./pager/Main";
import {createStore} from "redux";
import {Provider} from "react-redux";
import reducer from "./config/ReducerConfig";
require('./styles/map.css');
require('./styles/UploadImage.css');
require('./styles/pagination.css');
import {Drizzle, generateStore} from "drizzle";
import HouseInfo from "./contracts/HouseInfo.json";
import ArrayStorage from "./contracts/ArrayStorage.json";

const options = {contracts: [HouseInfo,ArrayStorage]};
const drizzleStore = generateStore(options);
const drizzle = new Drizzle(options, drizzleStore);

const store = createStore(reducer);
class App extends React.Component {
    state = {
        loading: true,
        drizzleState: null
    };
    constructor(props) {
        super(props);

    }

    componentDidMount(){

        this.unsubscribe = drizzle.store.subscribe(() => {
            const drizzleState = drizzle.store.getState();
            if (drizzleState.drizzleStatus.initialized) {
                this.setState({
                    loading: false,
                    drizzleState
                })
            }
            window.drizzle = drizzle;
            window.drizzleState = drizzleState;
        })

    }

    componentWillUnmount(){
        this.unsubscribe();
    }

    render() {
        let {loading,drizzleState} = this.state;
        if(loading) return <div>loading smart contract</div>;
        return (

            <Provider store={store}>
                <Main />
            </Provider>
        )

    }
}

ReactDOM.render(<App />, document.getElementById('app'));

