/**
 * Created by chenqilong on 2018/9/15.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import styles from "../../styles/styles";
import Middle from "../../component/Middle";
import Content from "../../component/Content";
class Home extends React.Component {
    render() {
        const classes = this.props;
        return (
            <div>
                <Middle/>
                <Content/>
            </div>
        )
    }
}

export default withStyles(styles)(Home);