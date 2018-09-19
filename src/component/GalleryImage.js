/**
 * Created by chenqilong on 2018/9/19.
 */
import React from 'react'
import ImageGallery from 'react-image-gallery';
import contract from '../statics/images/contract.png'
import contract1 from '../statics/images/contract.png'
import contract2 from '../statics/images/contract.png'

import home from '../statics/images/room.jpg';
import home1 from '../statics/images/room.jpg';
import home2 from '../statics/images/room.jpg';


class GalleryImage extends React.Component {

    render() {

        const images = [
            {
                original: "https://hizhuimage.oss-cn-hangzhou.aliyuncs.com/fang/51/31/51B827904E44F785DAC62A2AF55255F86131.jpg?x-oss-process=style/w800",
                thumbnail: {contract2},
            },
            {
                original: "https://hizhuimage.oss-cn-hangzhou.aliyuncs.com/fang/51/31/51B827904E44F785DAC62A2AF55255F86131.jpg?x-oss-process=style/w800",
                thumbnail: {contract1}
            },
            {
                original: "https://hizhuimage.oss-cn-hangzhou.aliyuncs.com/fang/51/31/51B827904E44F785DAC62A2AF55255F86131.jpg?x-oss-process=style/w800",
                thumbnail: {contract}
            }
        ]

        return (
            <ImageGallery items={images}/>
        );
    }

}
export default GalleryImage;