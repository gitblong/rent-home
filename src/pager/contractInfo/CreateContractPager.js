import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ToolBar from '../../component/ToolBarTop';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'
import ImageUploader from 'react-images-upload';
import rent from '../../statics/images/rent-home.jpg';
import MapModel from '../../component/MapModel';
import CreateSelect from '../../component/CreateSelect';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        margin: '0 auto',
        left: 0,
        right: 0,
        width: 1000,


    },
    toolBar: {
        "& div:after": {
            left: 0,
            right: 0,
            bottom: 0,
            content: "",
            position: 'absolute',
            transform: 'scaleX(0)',
            transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
            borderBottom: '2px solid #303f9f',
            pointerEvents: 'none'
        }
    },
    gridRoot: {
        backgroundColor: "#fff",
        width: '100%',
        padding: '0px 16px',
        paddingTop:'16px',
        paddingBottom:'0px',
        border: `0px solid ${blue[400]}`,
        borderRadius: '20px',
        boxShadow: `0px 0px 10px ${blue[400]}`,
    },
    title: {
        display: 'block',
        width: '100%',
        borderBottom: `${blue[400]} solid 3px`,
        paddingBottom: 16,
        color: blue[400]
    },
    formRoot: {
        with: '100%',
        marginTop: 8,
        backgroundColor: '#fff',
        borderShadow: `0px 0px 10px ${grey[200]}`,
        "& h3": {
            paddingLeft: '16px',
            paddingTop: 8,
            paddingBottom: 8,
            fontSize: '14px',
            'margin-block-start': 0,
            'margin-block-end': 0,
            fontFamily: 'serif',
            marginBottom: 8
        },
        display: 'flex',
        'flex-direction': 'column',
        "& button": {
            alignSelf: 'center',
            backgroundColor: blue[400],
            color: '#fff',
            marginTop: 8,
            marginBottom: 8,
            width: 80,
            height: 40,
            padding: 4,
            fontSize: 14,
            "&:hover": {
                backgroundColor: '#fff',
                color: blue[400],
                border: `1px solid ${blue[400]}`
            }
        }
    },
    content: {
        padding: '16px 32px',
        borderTop: `1px solid ${grey[400]}`,
        "& table tr td": {
            padding: '8px 0',
            fontSize: '14px',
            color: grey[800],
            "& select": {
                // height: '50%',
                margin:'0px 4px',
                // alignSelf: 'center',
                fontSize: 14,
                color: grey[600],

                "& option": {
                    color: grey[600]
                }
            },
        },
        borderBottom: `1px dashed ${grey[400]}`,
        "& input": {
            background: "#fdfeff",
            border: `1px solid ${grey[400]}`,
            borderRadius: "4px",
            width: "80%",
            height: "24px",
            boxSizing: "border-box",
            fontSize: "14px",

        },
    },
    divInput: {
        border: `1px solid ${grey[400]}`,
        borderRadius: "4px",
        backgroundColor: '#fff',
        height: 'auto',
        minHeight: 24,
        display: 'flex',
        alignItem: 'center',
        // paddingLeft: 16,
        minWidth:'80%',
        width:'80%',
        flexWrap: 'wrap',
        '&$checked': {
            color: green[500],
        },
        "& label": {
            color: grey[600],
            display: 'inline-flex',
            textAlign: 'center',
            alignItems: 'center',
            padding: '0 8px'
        },

        "& span": {
            width: '19%',
            lineHeight:'24px',
            display:'flex',
            justifyContent:'center',
            borderLeft:`1px solid ${grey[400]}`
        },
        "& span input": {
            padding: 0,

        },
        "& input[type=text]": {
            background: "#fdfeff",
            border: `none`,
            borderRadius: "4px",
            width: "80%",
            height: "24px",
            boxSizing: "border-box",
            fontSize: "14px",
            textAlign:'right',
            paddingRight:'8px'
        },
    },

});

const currencies = [
    {
        value: 'USD',
        label: '$',
    },
    {
        value: 'EUR',
        label: '€',
    },
    {
        value: 'BTC',
        label: '฿',
    },
    {
        value: 'JPY',
        label: '¥',
    },
];

class CreateContractPager extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        value: 'female',
        selectedValue: 'a',
        equipment: [
            {
                value: 'ari',
                name: '空调',
                checked: true,
            },
            {
                value: 'balcony',
                name: '阳台',
                checked: true,
            },
            {
                value: "broadband",
                name: '宽度',
                checked: true,
            },
            {
                value: "desk",
                name: '写字桌',
                checked: true,
            },
            {
                value: "doubleBeb",
                name: '双人床',
                checked: true,
            },
            {
                value: "dresser",
                name: '梳妆台',
                checked: true,
            },
            {
                value: "kitchen",
                name: '厨房',
                checked: true,
            },
            {
                value: "refrigerator",
                name: '冰箱',
                checked: true,
            },
            {
                value: "singleBel",
                name: '单人床',
                checked: true,
            },
            {
                value: 'soft',
                name: '沙发',
                checked: true,
            },
            {
                value: "toilet",
                name: '卫生间',
                checked: true,
            },
            {
                value: 'tv',
                name: '电视机',
                checked: true,
            },
            {
                value: 'washing-machine',
                name: '洗衣机',
                checked: true,
            },
            {
                value: 'water-heater',
                name: '热水器',
                checked: true,
            },
            {
                value: 'window',
                name: '飘窗',
                checked: true,
            },


        ],
        pictures: [],
        openModal: false,
        imgExtension: ['.jpg', '.gif', '.png', '.gif'],
        maxFileSize: 1020 * 5
    };

    constructor() {
        super()
        let elementsByClassName = document.getElementsByClassName('fileContainer');
        let childNodes = elementsByClassName[0]
    }

    componentWillMount() {
        let image = new Image(rent);
        this.onDrop(image);
    }

    onDrop = (picture) => {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }

    handleChange = event => {
        this.setState({selectedValue: event.target.value});
    };
    handleOpen = ()=> {
        this.setState({
            openModal: true
        })
    }

    handleClose = ()=> {
        this.setState({
            openModal: false
        })
    }

    render() {

        const {classes, location} = this.props;
        const {imgExtension, maxFileSize} = this.state
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <ToolBar currentLocation={location} searchHidden={true} className={classes.toolBar}/>
                <div className={classes.gridRoot}>
                    <div className={classes.formRoot}>
                        <Typography className={classes.title} variant='title'>
                            填写合同信息
                        </Typography>
                        <h3>基本信息</h3>
                        <div className={classes.content}>
                            <table>
                                <tr>
                                    <td width="100px">房源信息：</td>
                                    <td width="250px">
                                        <input type="text" />
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100px">房东姓名：</td>
                                    <td width="250px"><input type="text" /></td>
                                    <td width="100px">房东手机号:</td>
                                    <td ><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td width="100px">承租人姓名：</td>
                                    <td width="250px"><input type="text" /></td>
                                    <td width="100px">承租人手机:</td>
                                    <td  ><input type="text" /></td>
                                </tr>
                                <tr>
                                    <td width="120px">房东身份证号码：</td>
                                    <td width="250px"><input type="text" /></td>
                                    <td width="120px">承租人身份证号码:</td>
                                    <td width="250px"><input type="text" /></td>
                                </tr>

                            </table>
                        </div>
                        <h3>签约信息</h3>
                        <div className={classes.content}>
                            <table>
                                <tr>
                                    <td width="120px">起租日期：</td>
                                    <td width="250px"><input type="date"/></td>
                                    <td width="100px">退房日期:</td>
                                    <td width="250px"><input type="date"/></td>
                                </tr>

                                <tr>
                                    <td width="100px">入住时水表：</td>
                                    <td width="250px"><div className={classes.divInput}><input type="text"/><span>吨</span></div></td>
                                    <td width="100px">入住时电表:</td>
                                    <td><div className={classes.divInput}><input type="text"/><span>度</span></div></td>
                                </tr>
                                <tr>
                                    <td width="100px">水费：</td>
                                    <td width="250px"><div className={classes.divInput}><input type="text" /><span>元/吨</span></div></td>
                                    <td width="100px">电费:</td>
                                    <td><div className={classes.divInput}><input type="text" /><span>元/度</span></div></td>
                                </tr>
                                <tr>
                                    <td width="100px">租金：</td>
                                    <td width="250px"><div className={classes.divInput}><input type="text" /><span>元/月</span></div></td>
                                    <td width="100px">收租日期:</td>
                                    <td><div className={classes.divInput}><input placeholder="每月几号" type="text"/><span>号</span></div></td>
                                </tr>
                                <tr>
                                    <td width="100px">租期：</td>
                                    <td width="200px"><div className={classes.divInput}><input type="text" /><span>个月</span></div></td>
                                    <td width="100px">开始收租日:</td>
                                    <td><input type="date"/></td>
                                </tr>
                                <tr>
                                    <td width="120px">房屋押金：</td>
                                    <td width="200px"><div className={classes.divInput}><input type="text" /><span>元</span></div></td>
                                    <td width="120px">付款方式:</td>
                                    <td>押<select><option>一</option><option>二</option></select>付<select><option>一</option><option>二</option></select></td>
                                </tr>
                                <tr>
                                    <td>其它押金费用</td>
                                    <td colSpan="3">
                                        <CreateSelect/>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <Button>创建合同</Button>
                    </div>
                </div>
            </form>
        )
            ;
    }
}

CreateContractPager.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateContractPager);
