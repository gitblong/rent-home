/**
 * Created by chenqilong on 2018/9/15.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import styles from "../../styles/styles";
import Middle from "../../component/Middle";
import Content from "../../component/Content";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";
import {connect} from "react-redux";

class Home extends React.Component {
    render() {
        const {
            classes, houseInfoByCondition, ipfsUtils,changeHouseInfoByCondition,currentCity,
            allHouseInfoData
        } = this.props;
        return (
            <div>
                <Middle/>
                <Content
                    houseInfoByCondition={houseInfoByCondition}
                    ipfsUtils={ipfsUtils}
                    changeHouseInfoByCondition={changeHouseInfoByCondition}
                    currentCity={currentCity}
                    allHouseInfoData={allHouseInfoData}
                />
            </div>
        )
    }
}

Home = connect(MapStateToProps, MapDispatchToProps)(Home)
export default withStyles(styles)(Home);