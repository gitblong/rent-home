/**
 * Created by chenqilong on 2018/9/18.
 */
import React from "react";
import {withStyles} from "@material-ui/core/styles/";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {parseLocation} from "../Utils/util";
import grey from "@material-ui/core/colors/grey";
import blue from "@material-ui/core/colors/blue";

const styles = theme =>({

    conditionLayout: {
        display: 'flex',
        width: '100%',
        borderBottom: `1px solid ${grey[300]}`,
        padding:"8px 0px",
        '&:last-child':{
            borderBottom:'0px'
        }
    },
    conditionTitle: {
        width: '5%',
        padding: '8px 16px',
        color: grey[600],

    },
    conditionDetail: {
        width: '95%',
        '& :focus': {
            color: blue[400]
        }
    },
    conditionExtends: {
        borderTop: `1px solid ${grey[300]}`,
        display: 'static'
    }

});

class SearchCondition extends React.Component {
    render() {
        const {conditionTitle,conditions,classes} = this.props
        return (
            <div className={classes.conditionLayout}>
                <Typography className={classes.conditionTitle}>{conditionTitle}</Typography>

                <div className={classes.conditionDetail}>
                    <div>
                        {
                            conditions.map((value, index)=> {
                                return (

                                    <Button>{value}</Button>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
        )
    }
}

SearchCondition.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(SearchCondition);