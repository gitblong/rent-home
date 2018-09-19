/**
 * Created by chenqilong on 2018/9/13.
 */
import React from "react";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import rent from "../statics/images/room.jpg";
import AreaConditionTabs from "./AreaConditionTabs";
import Link from "react-router-dom/Link";
import grey from "@material-ui/core/colors/grey";
import RouterConfig from "../config/RouteConfig";
import Pagination from "./Pagination";
var image = require('../statics/images/rent-home.jpg');
require('../styles/Content.css');
import fetch from "isomorphic-fetch";
import "babel-polyfill";
import area from '../data/areas.json';
import blue from '@material-ui/core/colors/blue';
const styles = {
    root: {
        marginTop: 100,
        padding: 0
    },
    contetnGrid: {
        marginTop: 20
    },
    contentLayout: {
        marginTop: 20,
        left: 0,
        margin: "auto",
        right: 0,
        width: 1200,

    },
    contentCard: {
        "&:hover": {
            boxShadow: `0 0 10px 5px ${blue[200]}`
        },
        paddingTop: 0,
        cursor: 'pointer'

    },
    contentImage: {
        height: 210,
        width: 285,
        margin: 'auto',

    },
    contentText: {
        "&:last-child": {
            paddingBottom: 15
        }
    },
    contentTextBody: {
        marginTop: 20,
        color: '#8998a0'
    },
    priceTextColor: {
        color: '#ff8d1f',
        display: 'inline-block',
        fontSize: '24px',
        '&:after': {
            fontSize: '14px',
            content: `"元/每月"`,
            display: 'inline-block',
        }
    },
    pageLayout: {
        width: '100%',
        textAlign: 'right',
        paddingRight: 12,
    },
    pageText: {
        color: grey[400]
    }


};
class Content extends React.Component {
    state = {
        value: 0,
        renderPage: false
    };

    async componentDidMount() {
        await setTimeout(()=> {
            new Promise((res)=> {
                this.setState({
                    renderPage: true
                })
            })
        }, 500)
    }

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes}= this.props;

        return (
            <div className={classes.contentLayout}>

                <AreaConditionTabs tabsId="contentTabs" hiddenTitle={false}/>
                <Grid container xs={12} spacing={24} className={classes.contetnGrid}>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <Link to={RouterConfig.houseDetail.path}>
                                <CardMedia
                                    component="img"
                                    className={classes.contentImage}
                                    image={rent}
                                >
                                </CardMedia>
                            </Link>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={24} className={classes.contetnGrid}>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Grid container xs={12} spacing={24} className={classes.contetnGrid}>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={3}>
                        <Card className={classes.contentCard}>
                            <CardMedia
                                component="img"
                                className={classes.contentImage}
                                image={rent}
                            >
                            </CardMedia>
                            <CardContent className={classes.contentText}>
                                <Typography variant="title" className={classes.priceTextColor}>
                                    1800
                                </Typography>
                                <Typography variant="body" className={classes.contentTextBody}>
                                    整租<i>·</i>嘉和花苑<i>·</i>主卧
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                    <div className={classes.pageLayout}>
                        <Pagination/>
                    </div>
            </div>
        );
    }
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);