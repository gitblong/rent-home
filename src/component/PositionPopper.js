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
        backgroundColor: lightblue[400],
        marginTop: 16
    },
    typography: {
        padding: theme.spacing.unit * 2,
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
    rentTypeGrid: {
        padding: 10,
        textAlign: 'center',
        color: grey[100],
        '&:hover': {
            color: lightblue[100]
        },
        cursor: "pointer",
        fontSize: 16
    },
});

class PositionPopper extends React.Component {
    state = {
        citys: [

            [
                {
                    name: '北京',
                    code: '1101'
                },
                {
                    name: '广州',
                    code: '4401'
                },
                {
                    name: '上海',
                    code: '3101'
                }
            ],
            [
                {
                    name: '杭州',
                    code: '3301'
                },
                {
                    name: '苏州',
                    code: '3205'
                },
                {
                    name: '南京',
                    code: '3201'
                }
            ],
            [
                {
                    name: '福州',
                    code: '3501'
                },
                {
                    name: '厦门',
                    code: '3502'
                },
                {
                    name: '成都',
                    code: '5101'
                }
            ],

        ]
    };

    render() {
        const {classes, anchorEl, open,handler} = this.props;

        const citys = this.state.rentTypes;
        return (
            <div>

                <Popper className={classes.popper} open={this.props.open} anchorEl={this.props.anchorEl}
                        disablePortal
                        placement="bottom-start"
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
                        this.state.citys.map((city, index) => {
                            return (
                                <Grid
                                    container
                                    xs={12}
                                    key={city}
                                >
                                    {
                                        city.map((value, index) => {

                                            return (
                                                <Grid item key={value.code} xs={4}>
                                                    <a onClick={e => handler(value,e)}>
                                                        <Typography
                                                            className={classes.rentTypeGrid}>{value.name}</Typography>
                                                    </a>
                                                </Grid>
                                            )
                                        })
                                    }
                                </Grid>
                            )
                        })
                    }
                </Popper>

            </div>
        );
    }
}

PositionPopper.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PositionPopper);
