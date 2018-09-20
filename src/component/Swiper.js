/**
 * Created by chenqilong on 2018/9/20.
 */
import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import room from '../statics/images/room.jpg';

export default class Default extends Component {
    render() {
        const params = {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            effect: 'flip',
            grabCursor: true,
            pagination: {
                el: '.swiper-pagination'
            },

        }

        const {images} = this.props;
        return (
            <Swiper {...params}>
                {
                    images.map((value, index)=> {
                        return (
                            <div
                                style={{backgroundImage:`url(${value})`,backgroundPosition:'center',width:'460px',height:350}}
                            />
                        )
                    })
                }
            </Swiper>
        )
    }
}