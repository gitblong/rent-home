/**
 * Created by chenqilong on 2018/9/15.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import styles from "../styles/styles";
import Middle from "./Middle";
import Content from "./Content";
class Home extends React.Component {
    render() {
        const classes = this.props;
        return (
            <div style={{backgroundColor: '#fafafa'}}>
                <Middle/>
                <Content/>
            </div>
        )
    }
}

export default withStyles(styles)(Home);