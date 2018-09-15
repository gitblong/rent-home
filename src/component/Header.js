import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import lightblue from "@material-ui/core/colors/lightblue";
import grey from "@material-ui/core/colors/grey";
import AccountBalance from "@material-ui/icons/AccountBalance";
import Button from "@material-ui/core/Button";
import Place from "@material-ui/icons/PlaceTwoTone";
import PositionPopper from "./PositionPopper";
import Link from 'react-router-dom/Link';
const styles = theme => ({
    appBar: {
        backgroundColor: lightblue[500],
        zIndex: 10
    },
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    positionButton: {
        margin: theme.spacing.unit,
        color: grey[100],
        fontSize: 16,
        textDecorationLine: 'none'
    },
    textButton: {
        textAlign: 'left'
    },
    input: {
        display: 'none',
    },
    buttonIcon: {
        fontSize: 'inherit'
    },
    typography: {
        padding: theme.spacing.unit * 2,
    },
    clearA: {
        color: "black",
        textDecorationLine: 'none'
    }

});
class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        positionPopperOpen: false,
        positionAnchorEl: null,
        positionPopperId: "positionId",
        cityName: "位置",
    };

    handleChange = event => {
        this.setState({auth: event.target.checked});
    };

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    openPositionPopper = (value, event)=> {
        console.log("openRentTypePopper==>" + event.currentTarget);
        event.preventDefault();
        const currentTarget = event.currentTarget;
        this.setState(state =>({
            rentTypeAnchorEl: this.state.rentTypeAnchorEl == null ? currentTarget : null,
            rentTypePopperOpen: !state.rentTypePopperOpen

        }));
        if (value == 0) {
            return;
        }
        this.setState(state =>({
            cityName: value
        }));

    }

    render() {
        const {classes} = this.props;
        const {auth, anchorEl, positionAnchorEl, positionPopperOpen} = this.state;
        const open = Boolean(anchorEl);
        const id = positionPopperOpen ? 'simple-popper' : null;
        console.log("render==>" + this.state.rentTypePopperOpen, this.state.rentTypeAnchorEl)
        return (
            <div className={classes.root}>

                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <Link to='/' className={classes.clearA}> <AccountBalance/></Link>
                        </IconButton>
                        <Typography variant="title" color="inherit" className={classes.grow}>
                            区块链租房

                            <Button id="pop" className={classes.positionButton}
                                    onClick={(e)=>this.openPositionPopper(0, e)}>
                                {this.state.cityName}<Place className={classes.buttonIcon}/>
                            </Button>
                            <Button className={classes.positionButton}>
                                <Link to='/areaSearch' className={classes.positionButton}>
                                    立即找房
                                </Link>
                            </Button>
                            <Button className={classes.positionButton}>
                                <Link to='/fillForm' className={classes.positionButton}>
                                    我要出租
                                </Link>
                            </Button>
                        </Typography>

                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : null}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleClose}>
                                        <Link className={classes.clearA} to='/myContract'>
                                            我的租赁合同
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        <Link className={classes.clearA} to='/myHouses'>
                                            我发布的房源
                                        </Link>
                                    </MenuItem>
                                    <MenuItem onClick={this.handleClose}>
                                        <Link className={classes.clearA} to='/createContract'>
                                            创建新的合同
                                        </Link>
                                    </MenuItem>
                                </Menu>
                            </div>

                        )}
                        {
                            (
                                <PositionPopper open={this.state.rentTypePopperOpen}
                                                anchorEl={this.state.rentTypeAnchorEl}
                                                handler={this.openPositionPopper}
                                />
                            )
                        }

                    </Toolbar>
                </AppBar>

            </div >
        );

    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);