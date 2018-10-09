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
        padding: '16px 16px',
        border: `0px solid ${blue[400]}`,
        borderRadius: '20px',
        boxShadow: `0px 0px 10px ${blue[400]}`,
    },
    gridContent: {
        "& select": {
            width: 'auto',
        },
        "& label": {
            color: grey[600],
            display: 'block',
            marginTop: 8,
            marginBottom: 8,

        },
        "& input": {
            background: "#fdfeff",
            border: "none",
            borderRadius: "4px",
            width: "80%",
            height: "48px",
            boxSizing: "border-box",
            fontSize: "14px",
            paddingLeft: "16px",
        },
        "& textarea": {
            background: "#fdfeff",
            border: "none",
            borderRadius: "4px",
            width: "100%",
            height: "100px",
            boxSizing: "border-box",
            fontSize: "16px",
            padding: '8px'
        }
    },
    gridItem: {
        padding: 16,
    },
    divinput: {
        border: `1px solid ${grey[400]}`,
        borderRadius: "4px",
        backgroundColor: '#fff',
        height: 'auto',
        minHeight: 50,
        display: 'flex',
        alignItem: 'center',
        paddingLeft: 16,
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
        "& select": {
            height: '50%',
            alignSelf: 'center',
            fontSize: 14,
            color: grey[600],

            "& option": {
                color: grey[600]
            }
        },
        "& span": {
            width: 'auto'
        },
        "& span input": {
            padding: 0
        }


    },
    radioRoot: {
        color: blue[600],
        '&$checked': {
            color: blue[500],
        },
    },
    checked: {},
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    divder: {
        margin: '16px 0'
    },
    title: {
        display: 'block',
        width: '100%',
        borderBottom: `${blue[400]} solid 3px`,
        paddingBottom: 16,
        color: blue[400]
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

class TextFields extends React.Component {
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
                    <Typography className={classes.title} variant='title'>
                        填写房源信息
                    </Typography>

                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>出租类型</label>
                            <div className={classes.divinput}>
                                <Radio
                                    checked={this.state.selectedValue === 'a'}
                                    onChange={this.handleChange}
                                    value="a"
                                    name="radio-button-demo"
                                    aria-label="A"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>整租</label>
                                <Radio
                                    checked={this.state.selectedValue === 'b'}
                                    onChange={this.handleChange}
                                    value="b"
                                    name="radio-button-demo"
                                    aria-label="B"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>合租</label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房源类型</label>
                            <div className={classes.divinput}>
                                <Radio
                                    checked={this.state.selectedValue === 'a'}
                                    onChange={this.handleChange}
                                    value="a"
                                    name="radio-button-demo"
                                    aria-label="A"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>转租</label>
                                <Radio
                                    checked={this.state.selectedValue === 'b'}
                                    onChange={this.handleChange}
                                    value="b"
                                    name="radio-button-demo"
                                    aria-label="B"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>非转租</label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>有无电梯</label>
                            <div className={classes.divinput}>
                                <Radio
                                    checked={this.state.selectedValue === 'a'}
                                    onChange={this.handleChange}
                                    value="a"
                                    name="radio-button-demo"
                                    aria-label="A"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>有电梯</label>
                                <Radio
                                    checked={this.state.selectedValue === 'b'}
                                    onChange={this.handleChange}
                                    value="b"
                                    name="radio-button-demo"
                                    aria-label="B"
                                    classes={{
                                        root: classes.radioRoot,
                                        checked: classes.checked
                                    }}
                                />
                                <label>无电梯</label>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>楼层</label>
                            <div className={classes.divinput}>
                                <label>在</label>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <label>层&nbsp;,&nbsp;有 </label>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <label>层 </label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房屋户型</label>
                            <div className={classes.divinput}>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <label>室</label>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <label>厅</label>
                                <select>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                </select>
                                <label>卫</label>

                            </div>
                        </Grid>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>面积</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input /><label>平米</label>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>朝向</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <select style={{width: '100%', height: 50}}>
                                    <option>朝南</option>
                                    <option>朝北</option>
                                    <option>西北</option>
                                </select>
                            </div>

                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>装修级别</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <select style={{width: '100%', height: 50}}>
                                    <option>精装修</option>
                                    <option>简装修</option>
                                    <option>高档装修</option>
                                </select>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>付款方式</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <select style={{width: '100%', height: 50}}>
                                    <option>押一付一</option>
                                    <option>压一付三</option>
                                    <option>压一付四</option>
                                </select>
                            </div>
                        </Grid>

                    </Grid>

                    <Grid container xs="12" className={classes.gridContent}>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房租</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input/><label>元/月</label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>位置</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input style={{width: "69%"}}/><Button onClick={()=>this.handleOpen()}>选取地址</Button>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>联系方式</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input style={{width: "54%"}}/><Button >点击获取验证码</Button>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="12" className={classes.gridItem}>
                            <label>选择房间配置</label>
                            <div className={classes.divinput}>
                                {
                                    this.state.equipment.map((value, index)=> {
                                        return (
                                            <div style={{width: '150px'}}>
                                                <Checkbox
                                                    onChange={this.handleChange}
                                                    value={value.value}
                                                    color={blue[400]}
                                                    checked={value.checked}
                                                    classes={{
                                                        root: classes.radioRoot,
                                                        checked: classes.checked
                                                    }}
                                                />
                                                <label>
                                                    {value.name}
                                                </label>
                                            </div>
                                        )
                                    })
                                }


                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="12" className={classes.gridItem}>
                            <label>详细描述</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <textarea/>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="12" className={classes.gridItem}>
                            <label>选择要上传的图片(支持
                                {

                                    imgExtension.map((value, index)=> {
                                        let s = value;
                                        if (index < imgExtension.length - 1) {
                                            s += "、";
                                        }
                                        return s;
                                    })

                                }格式、且不大于{maxFileSize / 1020}M的图片
                                )</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <ImageUploader
                                    withIcon={true}
                                    buttonText='Choose images'
                                    onChange={this.onDrop}
                                    imgExtension={imgExtension}
                                    maxFileSize={maxFileSize}
                                    withPreview="true"
                                />
                            </div>
                        </Grid>
                    </Grid>

                </div>
                <MapModel open={this.state.openModal} handleOpen={this.handleOpen} handleClose={this.handleClose}
                          image={this.state.image}/>
            </form>
        )
            ;
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);
