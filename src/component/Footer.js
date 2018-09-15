/**
 * Created by chenqilong on 2018/9/14.
 */
import React from 'react';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import lightblue from '@material-ui/core/colors/lightblue';
import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const styles = theme =>({
    root: {
        position: 'absolute',
        marginTop: 100,
        backgroundColor: lightblue[50],
        height: 60,
        width:'100%'
    },
    textColor: {
        color: '#fff'
    },
    gridLayout: {
        left: 0,
        right: 0,
        margin: 'auto',
        paddingTop: 20,
        width: 1000,
        maxWidth: 1200,
        marginRight:60
    },
    gridItemTitle: {
        marginRight: 50
    },
    footer:{
        // backgroundColor: theme.palette.background.default,
        // padding: theme.spacing.unit * 100,
        marginLeft:0,
        marginRight:0,
        margin:'auto',
        width:'100%',
        backgroundColor:lightblue[100],
        padding:20,
        marginTop:50
    }
});

class Footer extends React.Component {
    state = {
        about: ["关于我们", "联系我们", "加入我们", "常见问题", "意见反馈", '友情链接'],
        frendlyLink: [
            {
                linkName: "白京商城",
                linkUrl: ""
            },
            {
                linkName: "蘑菇租房",
                linkUrl: ""
            },
            {
                linkName: "安居客",
                linkUrl: ""
            },
            {
                linkName: "嗨住租房",
                linkUrl: ""
            },
            {
                linkName: "我爱我家",
                linkUrl: ""
            },

        ]
    };

    render() {
        const {classes} = this.props;
        return (
            <footer className={classes.footer}>
                <Typography variant="title" align="center" gutterBottom>
                    Footer
                </Typography>
                <Typography variant="subheading" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
                </Typography>
            </footer>
            // <footer className={classes.root}>
            //
            //     <Grid container xs={7} spacing={30} className={classes.gridLayout}>
            //         <Grid item xs={1} className={classes.gridItemTitle}>
            //             <Typography>
            //                 <Button style={{fontSize: 20, width: 150, bottom: 11,}} alignCenter>快速链接:</Button>
            //             </Typography>
            //         </Grid>
            //             {
            //                 this.state.about.map((value, index)=> {
            //                     return (
            //                         <Grid key={value} item xs={1}>
            //                             <a>
            //                                 <Typography variant='body'>
            //                                     {value}
            //                                 </Typography>
            //                             </a>
            //                         </Grid>
            //                     )
            //                 })
            //             }
            //     </Grid>
            //     <Grid container xs={7} spacing={30} className={classes.gridLayout}>
            //         {
            //             this.state.frendlyLink.map((value, index)=> {
            //                 return (
            //                     <Grid key={value} item xs={1}>
            //                         <a href={value.linkUrl} style={{textDecorationColor:'#8998a0'}}>
            //                             <Typography variant='body' style={{color:"#8998a0"}}>
            //                                 {value.linkName}
            //                             </Typography>
            //                         </a>
            //                     </Grid>
            //                 )
            //             })
            //         }
            //     </Grid>
            // </footer>
        )
    }

}
Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Footer);