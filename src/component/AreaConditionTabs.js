/**
 * Created by chenqilong on 2018/9/14.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import KeyBoardArrowRightOutlined from '@material-ui/icons/KeyBoardArrowRightOutlined';
import Divider from '@material-ui/core/Divider';
import AccountBalance from '@material-ui/icons/AccountBalance';

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        borderBottom: '5px solid #e8e8e8',
        position: "relative"
    },
    titleLayOut: {
        margin: 'auto',
        marginLeft: 0,
        marginRight: 45,
        fontSize: 30,
        display: 'inline-block',
        position: "relative",
        bottom: -10,
    },
    tabButton: {

        borderRadius: 0,
        bottom: -5,
        padding: 20,
        textTransform: 'initial',
        fontSize: 16,
        color: '#2c3236',
        '&:hover': {
            color: '#40a9ff',
            borderStyle: 'solid',
            borderColor: '#388BFF',
            borderBottomWidth: 6,
        },
        '&:focus': {
            color: '#40a9ff',
            borderStyle: 'solid',
            borderColor: '#388BFF',
            borderBottomWidth: 6,
        },

    },
    tabSelectButton:{
        color: '#40a9ff',
        borderStyle: 'solid',
        borderColor: '#388BFF',
        borderBottomWidth: 6,
    },
    moreFontLayout: {
        position: 'absolute',
        right: 0,
        bottom: 7,
        fontSize: 18,
        color: '#40a9ff'
    },
});

class CustomizedTabs extends React.Component {
    state = {
        value: 0,
        areas: ["西湖区", "江干区", "上城区", "下城区", "滨江区", "下沙区", "拱墅区"]
    };

    areaSelect = (index, event) => {

        const {classes} = this.props;
        this.setState({index});
        let tabs = document.getElementById('tabs');
        var buttons = tabs.children;
        var tabSelectButtonClassName = classes.tabSelectButton;
        // buttons[index].className += ' ' + className;
        // console.log(this.state.areas,buttons.length);
        this.state.areas.map((value,ind)=>{
            if(index === ind) {
                buttons[ind].className += ' ' + tabSelectButtonClassName;
            }else{
                var btnClassName = buttons[ind].className.replace(tabSelectButtonClassName, "");
                buttons[ind].className = btnClassName;
            }
        })

    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>

                <Typography variant='title' className={classes.titleLayOut}>
                    区域找房
                </Typography>
                <div id="tabs" style={{display: 'inline-block'}}>
                    {

                        this.state.areas.map((value, index)=> {
                            return (
                                <Button key={index} className={classes.tabButton}
                                        onClick={e=>this.areaSelect(index, e)}>{value}</Button>
                            )
                        })
                    }
                </div>
                <Button className={classes.moreFontLayout}>
                    更多区域<KeyBoardArrowRightOutlined />
                </Button>
            </div>
        );
    }
}

CustomizedTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedTabs);
