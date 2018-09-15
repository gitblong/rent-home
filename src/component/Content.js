/**
 * Created by chenqilong on 2018/9/13.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import red from '@material-ui/core/colors/red';
var image = require('../statics/images/rent-home.jpg');
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import AccountCircle from '@material-ui/icons/AccountCircle';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import lightblue from '@material-ui/core/colors/lightblue';
import Menu from '@material-ui/core/Menu';
import Details from '@material-ui/icons/details';
import RentTypePopper from './RentTypePopper';
import rent from '../statics/images/room.jpg';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AreaConditionTabs from './AreaConditionTabs';
require('../styles/Content.css');
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
        paddingTop: 0,
        cursor:'pointer'

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
        '&:before': {
            content: '元/每月',
            display: 'inline-block',
        }
    }
};
class Content extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes}= this.props;

        return (
            <div className={classes.contentLayout}>

                <AreaConditionTabs/>
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
            </div>
        );
    }
}
Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);