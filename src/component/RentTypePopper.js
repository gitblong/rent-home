import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';
import lightblue from '@material-ui/core/colors/lightblue';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
const styles = theme => ({
    popper: {
        zIndex: 10,
        backgroundColor: "#fff",
        marginTop:5
    },
    typography: {
        padding: theme.spacing.unit * 2,
        width: '10%',

    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1
    },
    positionButton: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        flexGrow: 1
    },
    root: {
        flexGrow: 1,
    },
    grid: {
        flexGrow: 0,
        maxWidth: 'none',
        flexBasis: 'auto',
        width:'120px',

    },
    rentTypeGrid: {
        padding: 10,
        textAlign: 'center',
        color: "#000",
        '&:hover': {
            color: lightblue[100]
        },
        fontSize:18,
        cursor: "pointer"
    },
});

class RentTypePopper extends React.Component {
    state = {
        rentTypes: ['全部', '整租', '合租', '公寓']
    };
    render() {
        const {classes, anchorEl, open,clickPopperId} = this.props;

        const citys = this.state.rentTypes;
        return (
            <div >

                <Popper className={classes.popper} open={this.props.open} anchorEl={this.props.anchorEl}
                        disablePortal
                        placement="bottom"
                        modifiers={{
                            flip: {
                                enabled: true,
                            },
                            preventOverflow: {
                                enabled: true,
                                boundariesElement: 'scrollParent',
                            },
                            arrow: {
                                enabled: false,
                            }
                        }}
                >
                    {
                        this.state.rentTypes.map((value, index)=> {
                            return (

                                <Grid id="gridContainer"
                                    container xs={1}
                                    className={classes.grid}
                                >
                                    <Grid id="gridItem" item key={value} xs={1} className={classes.grid}>
                                        <a onClick={e=>this.props.handler(value, e)}>
                                            <Typography
                                                className={classes.rentTypeGrid}>{value}</Typography>
                                        </a>
                                    </Grid>
                                </Grid>
                            )
                        })
                    }
                </Popper>

            </div >
        );
    }
}
RentTypePopper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RentTypePopper);
