/**
 * Created by chenqilong on 2018/9/19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles}from '@material-ui/core/styles';
const styles = (theme) => ({
    pageText: {
        'line-height': '35px',
        paddingLeft: 20,
        fontSize: 22,
        color: '#42b5ff'
    }
})
class Pagination extends React.Component {

    state = {
        currentPageNo: 1,
        pageSize: 10,
        pageNoStart: 1,
        pageNoEnd: 10,
        pageNoArr: [],
        currentPageNoArr: []
    }

    componentWillMount() {
        let arr = new Array();
        for (let i = 1; i <= 100; i++) {
            arr.push(i);
        }
        this.setState({
            pageNoArr: arr,
            maxPage: 100,
            total: 10000
        })
        this.initialPageNo();
    }


    initialPageNo() {
        let pageNoEnd = this.state.pageNoEnd;
        let maxPage = this.state.maxPage;
        if (maxPage < pageNoEnd) {
            this.setState({
                pageNoEnd: maxPage
            })
        }

    }


    currentPage = (value)=> {
        this.setState({
            currentPageNo: value
        })
        let maxPage = this.state.maxPage;
        let pageNoEnd = this.state.pageNoEnd;
        let pageNoStart = this.state.pageNoStart;
        let currentPageNo = value;
        let middle = (pageNoStart + pageNoEnd - 1) / 2 + 1;
        if (currentPageNo > middle) {
            let start = pageNoStart + 1;
            let end = pageNoEnd + 1;
            this.setState({
                pageNoStart: end <= maxPage ? start : pageNoStart,
                pageNoEnd: end <= maxPage ? end : pageNoEnd,
            })
        } else if (currentPageNo < middle) {
            let start = pageNoStart - 1;
            let end = pageNoEnd - 1;
            this.setState({
                pageNoStart: start >= 1 ? start : pageNoStart,
                pageNoEnd: start >= 1 ? end : pageNoEnd,
            })
        }
    }

    nextPage = () => {
        if (this.state.currentPageNo >= this.state.maxPage) {
            return;
        }
        let currentPageNo = this.state.currentPageNo + 1;
        this.currentPage(currentPageNo)

    }

    upPage = () => {
        if (this.state.currentPageNo <= 1) {
            return
        }
        let currentPageNo = this.state.currentPageNo - 1;
        this.currentPage(currentPageNo);
    }

    render() {
        const {classes} = this.props;
        const {currentPageNoArr, pageNoStart, pageNoEnd, pageNoArr, currentPageNo, maxPage, total} = this.state;
        return (
            <ul class="pagination">

                <li><a onClick={()=>this.upPage()} key="0">上一页</a></li>
                {
                    pageNoArr.map((value, index)=> {
                        var cla = ((pageNoStart <= value) && (pageNoEnd >= value)) ? "" : "pageHidden"
                        cla += " " + ((currentPageNo == value) ? "pageShow" : "")
                        return (
                            <li
                                onClick={()=>this.currentPage(value)}
                                key={value}
                            >
                                <a class={cla} key={value}>
                                    {value}
                                </a>
                            </li>
                        )
                    })
                }
                <li onClick={()=>this.nextPage()}><a key='10000'>下一页</a></li>
                <span className={classes.pageText}>{currentPageNo}页/共{maxPage}页</span>
            </ul>
        )
    }

}
Pagination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pagination);