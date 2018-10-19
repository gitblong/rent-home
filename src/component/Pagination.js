/**
 * Created by chenqilong on 2018/9/19.
 */
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

let log = "Pagination-----------";
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
        pageNoArr:new Array(),
        currentPageNoArr: [],
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // console.log(log, "componentDidMount");
        let {page, pageSize, pageCount, total} = this.props;
        let arr = [];
        for (let i = 1; i <= pageCount; i++) {
            arr.push(i);
        }
        this.setState({
            pageNoArr: arr,
            maxPage: pageCount,
            total: total,
            pageSize: pageSize,
            currentPageNo: page
        });
        this.initialPageNo();
    }


    componentWillReceiveProps(nextProps, state) {
        // console.log(log, "shouldComponentUpdate", state.maxPage != nextProps.pageCount, nextProps, state);
        let {page, pageSize, pageCount, total} = nextProps;
        let arr = [];
        for (let i = 1; i <= pageCount; i++) {
            arr.push(i);
        }
        if (state.maxPage != nextProps.pageCount) {
            // console.log(arr);
            this.setState({
                pageNoArr: arr,
                maxPage: pageCount,
                total: total,
                pageSize: pageSize,
                currentPageNo: page
            });
            this.initialPageNo();
        }
        // return state.maxPage != nextProps.pageCount;

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


    currentPage = (value) => {
        let {changePage,} = this.props;
        this.setState({
            currentPageNo: value
        });
        changePage(value);
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
        // console.log(log, "render", this.state);
        const {classes} = this.props;
        const {currentPageNoArr, pageNoStart, pageNoEnd, pageNoArr, currentPageNo, maxPage, total} = this.state;
        return (
            <ul class="pagination">

                <li><a onClick={() => this.upPage()} key="0">上一页</a></li>
                {
                    pageNoArr.map((value, index) => {
                        var cla = ((pageNoStart <= value) && (pageNoEnd >= value)) ? "" : "pageHidden"
                        cla += " " + ((currentPageNo == value) ? "pageShow" : "")
                        return (
                            <li
                                onClick={() => this.currentPage(value)}
                                key={value}
                            >
                                <a class={cla} key={value}>
                                    {value}
                                </a>
                            </li>
                        )
                    })
                }
                <li onClick={() => this.nextPage()}><a key='10000'>下一页</a></li>
                <span className={classes.pageText}>第{currentPageNo}页/共{maxPage}页</span>
            </ul>
        )
    }

}

Pagination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pagination);