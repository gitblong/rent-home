/**
 * Created by chenqilong on 2018/9/20.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";

import {Map} from 'react-amap';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';

import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';


const styles = theme => ({
    modelBody: {
        left: `50%`,
        top: `50%`,
        transform: `translate(-50%, -50%)`,
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[4],
        width: 800,
        height: 560,
        borderRadius: 5
    },
    modelTitle: {
        width: '100%',
        height: '60px',
        padding: '0px',
        borderBottom: `1px solid ${grey[400]}`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 18
    },
    modelContent: {
        width: '100%',
        height: 'auto',
        paddingTop: '16px'
    },
    mapContent: {
        width: '100%',
        height: '400px',
        backgroundColor: blue[400],
    },
    contentInput: {
        padding:'10px 0',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        "& select": {
            display: 'inline-flex',
            width: 130,
            height: 30
        },
        "& p": {
            fontSize: 16,
            padding: '0 16px'
        },
        "& input": {
            marginRight: 16,
            width: 130,
            height: 30,
            paddingLeft: 8
        },
        "& input:last-child": {
            marginRight: 0
        }
    },
    contentBottom: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0px',

    },
    confirmButton: {
        padding: '8px 16px',
        background: blue[500],
        color: '#fff'
    },
    backButton: {
        padding: '8px 16px',
        background: grey[500],
        color: '#fff',
        marginLeft: 32
    }
});
class MapModel extends React.Component {
    constructor() {
        super();
        this.mapEvents = {
            created: (map) => {
            },
            click: () => {
                console.log('clicked')
            },
        }
    }

    state = {
        mapVersion: '1.4.10',
        amapkey: '50cec8de756f62ade847f8efe25ba900',
    }

    render() {
        const {classes, open, handleClose} = this.props;
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div className={classes.modelBody}>
                        <Typography variant='title' className={classes.modelTitle}>
                            填写房源具体位置
                        </Typography>

                        <div className={classes.modelContent}>
                            <div>
                                <div className={classes.contentInput}>
                                    <Typography>
                                        小区名称
                                    </Typography>
                                    <input/>
                                    <Typography>
                                        商圈
                                    </Typography>
                                    <select>
                                        <option>test1</option>
                                        <option>test2</option>
                                        <option>test3</option>
                                    </select>
                                </div>
                                <div className={classes.contentInput}>
                                    <Typography>
                                        经度
                                    </Typography>
                                    <input/>
                                    <Typography>
                                        纬度
                                    </Typography>
                                    <input/>
                                    <Typography>
                                        详细地址
                                    </Typography>
                                    <input/>
                                </div>
                                <div style={{width: '100%', height: 300}}>
                                    <Map amapkey={this.state.amapkey}
                                         version={this.state.mapVersion}
                                         events={this.mapEvents}
                                    >
                                    </Map>
                                </div>
                                <div className={classes.contentBottom}>
                                    <Button
                                        className={classes.confirmButton}>确认</Button>
                                    <Button className={classes.backButton}>返回</Button>
                                </div>

                            </div>
                        </div>

                    </div>
                </Modal>
            </div>
        );
    }
}

MapModel.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(MapModel);

export default SimpleModalWrapped;