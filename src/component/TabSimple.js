/**
 * Created by chenqilong on 2018/9/25.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';


function TabContainer(props) {
    return (
        <Typography component="div" style={{padding: 8 * 3}}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,

    },
    appBar: {
        backgroundColor: grey[200],
        padding: '0 8px',
        boxShadow:'none'
    },
    appBarTitle: {
        padding: '8px',
        'margin-block-start': 0,
        'margin-block-end': 0,
        color: grey[900]
    },
    tabContent: {
        backgroundColor: grey[200],
        "& div > span": {
            backgroundColor: blue[700]
        }
    },
    tabItem: {
        // backgroundColor: 'inherit',
        color: blue[700],
        // "&button": {
        padding: 0,
        minWidth: 100,
        fontSize:16,
        // },
        // "&:first-child": {
        //     backgroundColor: '#fff'
        // },
        // "&:focus": {
        //     backgroundColor: '#fff'
        // },

    }

});

class SimpleTabs extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <div className={classes.root}>
                <AppBar position="static" className={classes.appBar}>
                    <h3 className={classes.appBarTitle}>嘉和花苑,14幢1单元603</h3>
                    <Tabs value={value} onChange={this.handleChange} style={{}} className={classes.tabContent}>
                        <Tab label="租约详情" className={classes.tabItem}/>
                        <Tab label="押金管理" className={classes.tabItem}/>
                        <Tab label="租金管理" className={classes.tabItem}/>
                        <Tab label="解决问题" className={classes.tabItem}/>

                    </Tabs>
                </AppBar>
                {value === 0 && <TabContainer>租约详情</TabContainer>}
                {value === 1 && <TabContainer>押金管理1</TabContainer>}
                {value === 2 && <TabContainer>租金管理</TabContainer>}
                {value === 3 && <TabContainer>解决问题</TabContainer>}
            </div>
        );
    }
}

SimpleTabs.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
