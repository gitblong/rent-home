import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ToolBar from '../../component/ToolBarTop';
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import Radio from '@material-ui/core/Radio';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox'
import ImageUploader from 'react-images-upload';
import MapModel from '../../component/MapModel';
import initialHouseInfo from "../../data/HouseInfo";
import {connect} from "react-redux";
import {MapDispatchToProps, MapStateToProps} from "../../config/ReduxMapToPropsConfig";
import {isEmpty} from "../../Utils/util";
// import {addHouseInfo}from '../../smart-contract-ipfs/HouseInfoContract';

//


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
        },


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
    buttonStyle: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
        width: '100%',
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
            },
        }
    },
    submitButton: {
        display: 'flex',
        alignItem: 'center',
        justifyContent: 'center',
        width: '100%',
        "& button": {
            alignSelf: 'center',
            backgroundColor: '#413e58',
            color: '#fff',
            marginTop: 8,
            marginBottom: 8,
            width: 80,
            height: 40,
            padding: 4,
            fontSize: 14,
            "&:hover": {
                backgroundColor: '#575473',
                border: 0,
            },
        }
    }

});
let detailInfo = initialHouseInfo.detailInfo;


class TextFields extends React.Component {
    state = {
        name: 'Cat in the Hat',
        age: '',
        multiline: 'Controlled',
        currency: 'EUR',
        value: 'female',
        selectedValue: 'a',
        houseTypeSelectedValue: initialHouseInfo.houseType[0].typeId,
        rentTypeSelectedValue: initialHouseInfo.houseType[0].typeId,
        isOwnLiftTypeSelectedValue: initialHouseInfo.isOwnLiftType[0].typeId,
        equipment: initialHouseInfo.houseEquipment,
        chooseImgs: [],
        openModal: false,
        imgExtension: ['.jpg', '.gif', '.png', '.gif', '.jpeg'],
        maxFileSize: 1020 * 10,
        initialHouseInfo: initialHouseInfo,
        selectTotalLevel: 0,
        selectCurrentLevel: 0,
        selectRoom: 0,
        selectHall: 0,
        selectToilet: 0,
        selectPledgeNum: 0,
        selectCashPayNum: 0,
        houseArea: "",
        selectOrientationId: 0,
        selectDecorateLevelId: 0,
        rentFee: '',
        locationInfo: {
            houseNum: "",
            estatName: "",
            areas: "",
            lng: "",//经度
            lat: "",//纬度
            detailAddress: ""
        },
        telephone: "",
        detailIntroduce: '',
        pictureBuffers: [],
        imgHashArr: []
    };

    constructor() {
        super();
        let elementsByClassName = document.getElementsByClassName('fileContainer');
        let childNodes = elementsByClassName[0]
    }

    componentWillMount() {
        // let image = new Image(rent);
        // this.handleChooseImage(image);
    }

    handleHouseTypeChange = event => {
        this.setState({houseTypeSelectedValue: event.target.value});
    };
    handleRentTypeChange = event => {
        this.setState({rentTypeSelectedValue: event.target.value});
    };
    handleIsOwnLiftTypeChange = event => {
        this.setState({isOwnLiftTypeSelectedValue: event.target.value});
    };
    handleSelectTotalLevelChange = event => {
        this.setState({selectTotalLevel: event.target.value});
    };
    handleSelectCurrentLevel = event => {
        this.setState({selectCurrentLevel: event.target.value});
    };
    handleSelectRoom = event => {
        this.setState({selectRoom: event.target.value});
    };
    handleSelectHall = event => {
        this.setState({selectHall: event.target.value});
    };
    handleSelectToilet = event => {
        this.setState({selectToilet: event.target.value});
    };
    handleSelectPledgeNum = event => {
        this.setState({selectPledgeNum: event.target.value});
    };
    handleSelectCashPayNum = event => {
        this.setState({selectCashPayNum: event.target.value});
    };
    handleChangeSelectOrientationId = event => {
        this.setState({selectOrientationId: event.target.value});
    };
    handleChangeSelectDecorateLevelId = event => {
        this.setState({selectDecorateLevelId: event.target.value})
    };
    handleChangeHouseArea = event => {
        this.setState({houseArea: event.target.value});
    };
    handleChangeRentFee = event => {
        this.setState({rentFee: event.target.value});
    };
    handleChangeDetailAddress = event => {
        let locationInfo = this.state.locationInfo;
        this.setState({locationInfo: locationInfo})
    };

    handleChangeTelephone = event => {
        this.setState({telephone: event.target.value})
    };
    handleChangeEquipment = event => {
        let equipment = this.state.equipment;
        equipment.map((obj, index) => {
            if (index == event.target.value) {
                obj.checked = !obj.checked;
            }
        })
        this.setState({equipment: equipment});

    };
    handleChangeDetailIntroduce = event => {
        this.setState({detailIntroduce: event.target.value});
    };
    handleOpen = () => {
        this.setState({
            openModal: true
        })
    };
    handleChooseImage = (picture) => {
        let pictureBuffers = [];
        picture.map((obj, index) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(obj);
            reader.onloadend = e => {
                pictureBuffers.push(reader);
                this.setState({
                    pictureBuffers: pictureBuffers
                });
            };
        });
    };
    handleSubmitImgToIpfs = () => {
        let imgBuffers = new Promise((resolve, reject) => {
            let imgHashArr = [];
            this.state.pictureBuffers.map((obj, index) => {
                this.props.ipfsUtils
                    .addToIpfs(Buffer.from(obj.result)).then(result => {
                    imgHashArr.push(result);
                    // this.setState({
                    //     imgHashArr: imgHashArr
                    // })
                }).catch(error => {
                    reject(error);
                })

            });
            resolve(imgHashArr);

        });
        imgBuffers.then(result => {
            this.setState({
                imgHashArr: result
            })
        }).catch(error => {
        })

    };
    handleClose = () => {
        this.setState({
            openModal: false
        })
    };
    handleSave = () => {
        let {drizzle, ipfsUtils, drizzleState} = this.props;
        detailInfo.houseType = initialHouseInfo.houseType[this.state.houseTypeSelectedValue];
        detailInfo.rentType = initialHouseInfo.rentType[this.state.rentTypeSelectedValue];
        detailInfo.isOwnLiftType = initialHouseInfo.isOwnLiftType[this.state.isOwnLiftTypeSelectedValue];
        detailInfo.houseFloor.totalLevel = this.state.selectTotalLevel + 1;
        detailInfo.houseFloor.currentLevel = this.state.selectCurrentLevel + 1;
        detailInfo.houseAppreciation.room = this.state.selectRoom + 1;
        detailInfo.houseAppreciation.hall = this.state.selectHall + 1;
        detailInfo.houseAppreciation.toilet = this.state.selectToilet + 1;
        detailInfo.payType.cashPledgeNum = this.state.selectPledgeNum + 1;
        detailInfo.payType.cashPayNum = this.state.selectCashPayNum + 1;
        detailInfo.houseOrientation = initialHouseInfo.houseOrientation[this.state.selectOrientationId];
        detailInfo.decorateLevel = initialHouseInfo.decorateLevel[this.state.selectDecorateLevelId];
        detailInfo.houseArea = this.state.houseArea;
        detailInfo.rentFee = this.state.rentFee;
        detailInfo.telephone = this.state.telephone;
        detailInfo.detailIntroduce = this.state.detailIntroduce;
        if (isEmpty(detailInfo.detailIntroduce)) {
            alert("请输入详细描述");
            return;
        }

        if (isEmpty(detailInfo.houseArea)) {
            alert("请输入面积");
            return;
        }

        if (isEmpty(detailInfo.rentFee)) {
            alert("请输入房租");
            return;
        }
        if (isEmpty(detailInfo.houseArea)) {
            alert("请输入面积");
            return;
        }
        if (isEmpty(detailInfo.telephone)) {
            alert("请输入电话");
            return;
        }


        let arr = [];
        this.state.equipment.map((obj, index) => {
            if (obj.checked) {
                arr.push(obj);
            }
        });
        detailInfo.houseEquipment = arr;
        if (detailInfo.houseEquipment.length<=0) {
            alert("请选择房间配置");
            return;
        }
        detailInfo.imageArr = this.state.imgHashArr;
        if (isEmpty(detailInfo.imageArr) && detailInfo.imageArr.length <= 0) {
            alert("请提交图片");
            return;
        }
        detailInfo.locationInfo = this.state.locationInfo;
        if (isEmpty(detailInfo.locationInfo.detailAddress)) {
            alert("请填写地址");
            return;
        }
        if (isEmpty(detailInfo.locationInfo.houseNum)) {
            alert("请填写房号");
            return;
        }

        if (isEmpty(detailInfo.locationInfo.streetInfo.name)) {
            alert("位置不在商圈服务范围");
            return;
        }
        console.log(JSON.stringify(detailInfo));
        ipfsUtils.addToIpfs([Buffer.from(JSON.stringify(detailInfo), 'utf-8')]).then(result => {
            console.log(result);
            ipfsUtils.addHashToHouseInfoContracts(result).then(result=>{
                if (result.status) {
                    alert("提交成功");
                }
            });

        })
    };
    handleConfirm = locationInfo => {
        this.setState({
            locationInfo
        });
        this.handleClose();
    };

    render() {
        const {classes, location} = this.props;
        const {imgExtension, maxFileSize} = this.state;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <ToolBar currentLocation={location} searchHidden={true} className={classes.toolBar}/>
                <div className={classes.gridRoot}>
                    <Typography className={classes.title} variant='title'>
                        填写房源信息
                    </Typography>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房源类型</label>
                            <div className={classes.divinput}>
                                {
                                    initialHouseInfo.houseType.map((obj, index) => {
                                        return (
                                            <div>
                                                <Radio
                                                    checked={this.state.houseTypeSelectedValue == index}
                                                    onChange={this.handleHouseTypeChange}
                                                    value={index}
                                                    name="radio-button-demo"
                                                    aria-label={obj.type}
                                                    classes={{
                                                        root: classes.radioRoot,
                                                        checked: classes.checked
                                                    }}
                                                />
                                                <label>{obj.type}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>出租类型</label>
                            <div className={classes.divinput}>
                                {
                                    initialHouseInfo.rentType.map((obj, index) => {
                                        return (
                                            <div>
                                                <Radio
                                                    checked={this.state.rentTypeSelectedValue == index}
                                                    onChange={this.handleRentTypeChange}
                                                    value={index}
                                                    name="radio-button-demo"
                                                    aria-label={obj.type}
                                                    classes={{
                                                        root: classes.radioRoot,
                                                        checked: classes.checked
                                                    }}
                                                />
                                                <label>{obj.type}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>有无电梯</label>
                            <div className={classes.divinput}>

                                {
                                    initialHouseInfo.isOwnLiftType.map((obj, index) => {
                                        return (
                                            <div>
                                                <Radio
                                                    checked={this.state.isOwnLiftTypeSelectedValue == index}
                                                    onChange={this.handleIsOwnLiftTypeChange}
                                                    value={index}
                                                    name="radio-button-demo"
                                                    aria-label={obj.type}
                                                    classes={{
                                                        root: classes.radioRoot,
                                                        checked: classes.checked
                                                    }}
                                                />
                                                <label>{obj.type}</label>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>楼层</label>
                            <div className={classes.divinput}>
                                <label>共</label>
                                <select onChange={this.handleSelectTotalLevelChange}>
                                    {
                                        initialHouseInfo.houseFloor.totalLevel.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectTotalLevel == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>层&nbsp;,&nbsp;当前 </label>
                                <select onChange={this.handleSelectCurrentLevel}>
                                    {
                                        initialHouseInfo.houseFloor.totalLevel.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectCurrentLevel == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>层 </label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房屋户型</label>
                            <div className={classes.divinput}>
                                <select onChange={this.handleSelectRoom}>
                                    {
                                        initialHouseInfo.houseAppreciation.room.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectRoom == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>室</label>
                                <select onChange={this.handleSelectHall}>
                                    {
                                        initialHouseInfo.houseAppreciation.hall.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectHall == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>厅</label>
                                <select onChange={this.handleSelectToilet}>
                                    {
                                        initialHouseInfo.houseAppreciation.toilet.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectToilet == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>卫</label>

                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>付款方式</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <label>押</label>
                                <select onChange={this.handleSelectPledgeNum}>
                                    {
                                        initialHouseInfo.payType.cashPledgeNum.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectPledgeNum == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                                <label>付</label>
                                <select onChange={this.handleSelectCashPayNum}>
                                    {
                                        initialHouseInfo.payType.cashPayNum.map((obj, index) => {
                                            return (
                                                <option value={index} selected={this.state.selectCashPayNum == index}
                                                        key={index}>
                                                    {obj}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </Grid>

                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>朝向</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <select onChange={this.handleChangeSelectOrientationId}
                                        style={{width: '100%', height: 50}}>
                                    {
                                        initialHouseInfo.houseOrientation.map((obj, index) => {
                                            return (
                                                <option value={obj.typeId}
                                                        selected={this.state.selectOrientationId == index}
                                                        key={index}>
                                                    {obj.type}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>装修级别</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <select onChange={this.handleChangeSelectDecorateLevelId}
                                        style={{width: '100%', height: 50}}>
                                    {
                                        initialHouseInfo.decorateLevel.map((obj, index) => {
                                            return (
                                                <option value={obj.typeId}
                                                        selected={this.state.selectDecorateLevelId == index}
                                                        key={index}>
                                                    {obj.type}
                                                </option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        </Grid>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>面积</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input onChange={this.handleChangeHouseArea}
                                       value={this.state.houseArea}/><label>平米</label>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>

                        <Grid item xs="4" className={classes.gridItem}>
                            <label>房租</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input onChange={this.handleChangeRentFee}
                                       value={this.state.rentFee}/><label>元/月</label>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>位置</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input value={this.state.locationInfo.detailAddress}
                                       onChange={this.handleChangeDetailAddress} style={{width: "69%"}}/><Button
                                onClick={() => this.handleOpen()}>选取地址</Button>
                            </div>
                        </Grid>
                        <Grid item xs="4" className={classes.gridItem}>
                            <label>联系方式</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <input value={this.state.telephone} onChange={this.handleChangeTelephone}
                                       style={{width: "54%"}}/><Button>点击获取验证码</Button>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="12" className={classes.gridItem}>
                            <label>选择房间配置</label>
                            <div className={classes.divinput}>
                                {
                                    this.state.equipment.map((obj, index) => {
                                        return (
                                            <div style={{width: '150px'}}>
                                                <Checkbox
                                                    onChange={this.handleChangeEquipment}
                                                    value={index}
                                                    color={blue[400]}
                                                    checked={obj.checked}
                                                    classes={{
                                                        root: classes.radioRoot,
                                                        checked: classes.checked
                                                    }}
                                                    key={index}
                                                />
                                                <label>
                                                    {obj.name}
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
                                <textarea onChange={this.handleChangeDetailIntroduce}
                                          value={this.state.detailIntroduce}/>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container xs="12" className={classes.gridContent}>
                        <Grid item xs="12" className={classes.gridItem}>
                            <label>选择要上传的图片(支持
                                {

                                    imgExtension.map((value, index) => {
                                        let s = value;
                                        if (index < imgExtension.length - 1) {
                                            s += "、";
                                        }
                                        return s;
                                    })

                                }格式的图片
                                )</label>
                            <div className={classes.divinput} style={{paddingLeft: 0}}>
                                <ImageUploader
                                    withIcon={true}
                                    onChange={this.handleChooseImage}
                                    buttonText="选择文件"
                                    imgExtension={imgExtension}
                                    // maxFileSize={maxFileSize}
                                    withPreview="true"
                                />
                                <div onClick={this.handleSubmitImgToIpfs} className={classes.submitButton}>
                                    <Button>提交</Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <div className={classes.buttonStyle} onClick={this.handleSave}>
                        <Button>保存</Button>
                    </div>
                </div>
                <MapModel open={this.state.openModal} handleConfirm={this.handleConfirm} handleOpen={this.handleOpen}
                          handleClose={this.handleClose}
                          image={this.state.image}/>
            </form>
        )
            ;
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};
TextFields = connect(MapStateToProps, MapDispatchToProps)(TextFields);
export default withStyles(styles)(TextFields);
