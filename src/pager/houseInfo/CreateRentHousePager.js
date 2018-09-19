/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from 'prop-types';
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from './Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

import IconButton from '@material-ui/core/IconButton';
import RouterConfig from '../../config/RouteConfig';
import {parseLocation }from '../../Utils/util';

const styles = theme =>({

    root: {
        width: 1000,
        margin: 'auto',
        left: 0,
        right: 0,
        "& div": {
            boxShadow: 'none'
        },
        color: '#66747f',
        fontSize: '14px',
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
    navigation: {
        display: 'inline-block',
        margin: "auto 0",
        lineHeight: '50px',
        float: 'left'
    },
    searchTool: {
        right: 0,
        position: 'absolute',
        top: 0,
        bottom: 0,
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
    conditionLayout: {
        display: 'flex',
        width: '100%',
        borderBottom: `1px solid ${grey[300]}`,
        backgroundColor: '#fff'
    },
    conditionTitle: {
        width: '5%',
        padding: '8px 16px',
        color: grey[600],

    },
    conditionDetail: {
        width: '95%',
        '& :focus': {
            color: blue[400]
        }
    },
    conditionExtends: {
        borderTop: `1px solid ${grey[300]}`,
        display: 'static'
    },
    selectedLayout: {
        display: 'inline',
        marginRight: '12px',
        borderRadius: '10px',
        border: `1px solid ${grey[300]}`,
        paddingRight: '0px 5px',
        lineHeight: '14px',
        fontSize: '14px',
        paddingLeft: '5px',

    },
    selectedIconButton: {
        fontSize: '12px',
        width: 'auto',
        height: 'auto',
        padding: '6px',
        lineHeight: '12px',
        marginBottom: 1
    },
    itemList: {
        width: '100%',
        clear: 'both',
        '&:before': {
            clear: 'both',
        },
        '&:after': {
            clear: 'both',
        },
    },
    item: {
        marginTop: 2,
        padding: '0 24px',
        backgroundColor: '#fff',
        position: 'relative',
        borderRadius: 0.5,
        "&:hover": {
            boxShadow: `0 0 10px 1px ${blue[100]}`
        }
    },
    itemContent: {
        padding: '24px 0px',
        display: 'flex',
        borderBottom: `1px solid ${grey[200]}`
    },
    itemContentImg: {
        // float: "left",
        cursor: 'pointer',
        width: 246,
        height: 184,
        marginRight: 24
    },
    itemContentText: {
        width: '450px',
        float: 'left',
        display: 'inline-block',

    },
    itemContentTextTitle: {
        cursor: 'pointer',
        color: orange[500],
        marginBottom: '24px',
        fontSize: 24,
        "&:hover": {
            color: blue[400]
        },
    },
    itemContentTextBody: {
        color: grey[1000],
        marginBottom: '24px'

    },
    itemContentTagsContent: {
        bottom: 0,
        display: 'flex'
    },
    itemContentTags: {
        color: grey[400],
        border: `1px solid ${grey[400]}`,
        padding: '8px 16px',
        bottom: 0,
        marginRight: 8
    },
    priceContent: {
        height: "100%",
        fontSize: '26px',
        width: 300
    },
    priceText: {
        float: 'right',
        color: orange[400],
        "&:after": {
            content: `"元/月"`,
            color: orange[400],
            fontSize: 14
        }
    },
    pageLayout: {
        width: '100%',
        textAlign: 'right'
    }


});
class CreateRentHousePager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {classes} = this.props;
        return (
            <div>
                上传房源
                <Route>
                    {
                        ({location}) => {
                            console.log(this, location);
                            return (


                                <Typography gutterBottom type="title">
                                    Current route: {location.pathname}
                                    <Link to={RouterConfig.creatRentHouse}>reate</Link>
                                </Typography>
                            )
                        }
                    }

                </Route>
            </div>
        )
    }
}

CreateRentHousePager.propTypes = {
    classes: PropTypes.object.isRequired
}
export default withStyles(styles)(CreateRentHousePager);