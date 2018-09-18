/**
 * Created by chenqilong on 2018/9/11.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import Home from '../../component/Home';
import Router from 'react-router-dom/BrowserRouter';
import Route from 'react-router-dom/Route';
import Typography from '@material-ui/core/Typography';
import Link from 'react-router-dom/Link';
import NavLink from 'react-router-dom/NavLink';


import RouterConfig from '../../config/RouteConfig';
class CreateRentHousePager extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props)
        const {children} = this.props;
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

export default CreateRentHousePager;