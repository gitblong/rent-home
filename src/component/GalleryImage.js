/**
 * Created by chenqilong on 2018/9/19.
 */
import React, {Component} from 'react';
import Swiper from 'react-id-swiper';
import Button from '@material-ui/core/Button';
import CardMedia from '@material-ui/core/CardMedia';
import ImageModel from './ImageModel';
export default class GalleryImage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            gallerySwiper: null,
            thumbnailSwiper: null,
            open: false,
            image:""
        };

        this.galleryRef = this.galleryRef.bind(this);
        this.thumbRef = this.thumbRef.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextState.gallerySwiper && nextState.thumbnailSwiper) {
            const {gallerySwiper, thumbnailSwiper} = nextState

            gallerySwiper.controller.control = thumbnailSwiper;
            thumbnailSwiper.controller.control = gallerySwiper;
        }
    }

    handleOpen = (value) => {
        this.setState({
            open: true,
            image:value

        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    galleryRef(ref) {
        if (ref) this.setState({gallerySwiper: ref.swiper})
    }

    thumbRef(ref) {
        if (ref) this.setState({thumbnailSwiper: ref.swiper})
    }

    render() {
        const {images} = this.props;
        const gallerySwiperParams = {
            spaceBetween: 30,
            effect: 'fade',
        };

        const thumbnailSwiperParams = {
            paceBetween: 0,
            centeredSlides: true,
            slidesPerView: 'auto',
            touchRatio: 0.2,
            slideToClickedSlide: true,
            spaceBetween: 10,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };

        return (
            <div>
                <Swiper {...gallerySwiperParams} ref={this.galleryRef}>
                    {

                        images.map((value, index)=> {
                            return (
                                <div
                                    style={{
                                        backgroundImage: `url(${value})`,
                                        backgroundPosition: 'center',
                                        width: 500,
                                        height: 350,
                                        backgroundSize: '100%',
                                        backgroundRepeat: 'no-repeat',
                                        opacity: 1,
                                        borderRadius: 10,
                                        cursor:'pointer'

                                    }}
                                    onClick={()=>this.handleOpen(value)}

                                />
                            )
                        })
                    }
                </Swiper>
                <Swiper {...thumbnailSwiperParams} ref={this.thumbRef}>
                    {

                        images.map((value, index)=> {
                            return (
                                <CardMedia
                                    style={{
                                        backgroundImage: `url(${value})`,
                                        backgroundPosition: 'center',
                                        width: 100,
                                        height: 80,
                                        backgroundSize: '120%',
                                        backgroundRepeat: 'no-repeat',
                                        padding: '10px',
                                        borderRadius: 10
                                    }}
                                />
                            )
                        })
                    }
                </Swiper>
                <ImageModel open={this.state.open} handleOpen={this.handleOpen} handleClose={this.handleClose} image={this.state.image} images={images}/>
            </div>
        );
    }
}
