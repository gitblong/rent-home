/**
 * Created by chenqilong on 2018/9/19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import Link from 'react-router-dom/Link';
import {withStyles} from '@material-ui/core/styles';
import RouterConfig from '../config/RouteConfig';
import {parseLocation} from '../Utils/util';
import IconButton from '@material-ui/core/IconButton';
import Search from '@material-ui/icons/Search';
const styles = {
    navigation: {
        display: 'inline-block',
        margin: "auto 0",
        lineHeight: '50px',
        float: 'left',
        "& a": {
            color: '#66747f',
            textDecoration: 'none',
            "&:hover": {
                color: "#4fcbff"
            },
            textAlign: 14
        },
    },
    toolBar: {
        height: 50,
        margin: '24px 0px',
        position: 'relative',
        flexWrap: 'wrap',
        width: '100%',
        maxWidth: '100%',
        flexBasis: '100%',
        lineHeight: '50px'
    },
    searchTool: {
        right: 0,
        top: 0,
        border: '1px solid rgb(217, 227, 244)',
        borderRadius: "4px",
        backgroundColor: '#fff',
        float: 'right'
    },
    searchInput: {
        background: "#fdfeff",
        border: "none",
        borderRadius: "4px",
        width: "430px",
        height: "48px",
        boxSizing: "border-box",
        fontSize: "14px",
        paddingLeft: "16px",
    },
};
class Navigation extends React.Component {

    render() {
        let toolBarText = "输入地址、写字楼、园区或地铁站"
        const {classes, currentLocation,searchHidden,placeText} = this.props;
        if(placeText){
            toolBarText = placeText;
        }

        const parsePath = parseLocation(currentLocation);
        return (
            <div className={classes.toolBar}>
                <div className={classes.navigation}>
                    <Link to={RouterConfig.home.path}>
                        {RouterConfig.home.pathName}
                    </Link>
                    <span>&nbsp;/&nbsp;</span>
                    {
                        parsePath.map((value, index)=> {
                            if (index > 0 && index < parsePath.length - 1) {
                                return (
                                    <div style={{display: 'inline-block'}}>
                                        <Link to={RouterConfig[value].path}>
                                            {RouterConfig[value].pathName}
                                        </Link>
                                        <span>&nbsp;/&nbsp;</span>
                                    </div>
                                )

                            } else if (index == parsePath.length - 1) {
                                return (
                                    <span>{RouterConfig[value].pathName}</span>
                                )
                            }
                        })
                    }
                </div>
                <div className={classes.searchTool} hidden={searchHidden}>
                    <input placeholder={toolBarText} className={classes.searchInput}>
                    </input>
                    <IconButton>
                        <Search />
                    </IconButton>
                </div>

            </div>

        )
    }
}
Navigation.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(Navigation);
