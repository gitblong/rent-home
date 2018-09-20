/**
 * Created by chenqilong on 2018/9/20.
 */
import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CardMedia from "@material-ui/core/CardMedia";
function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        left: `50%`,
        top: `50%`,
        transform: `translate(-50%, -50%)`,
    };
}

const styles = theme => ({
    paper: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],

    },
});

class ImageModal extends React.Component {

    render() {
        const {classes, open, handleOpen, handleClose, image, images} = this.props;
        const params = {
            spaceBetween: 30,
            effect: 'fade',
            pagination: {
                el: '.swiper-pagination',
                clickable: true
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        };
        return (
            <div>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={open}
                    onClose={handleClose}
                >
                    <div style={getModalStyle()} className={classes.paper}>
                        <CardMedia
                            style={{
                                backgroundImage: `url(${image})`,
                                backgroundPosition: 'center',
                                width: 700,
                                height: 500,
                                backgroundSize: '120%',
                                backgroundRepeat: 'no-repeat',
                                padding: '10px',
                            }}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

ImageModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const SimpleModalWrapped = withStyles(styles)(ImageModal);

export default SimpleModalWrapped;