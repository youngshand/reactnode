// @flow
import React, { PropTypes } from 'react';
// import ImageHandler from '../../utils/imageHandler';

class ImageWrap extends React.Component {

	componentDidMount() {
		// ImageHandler.init(this);
	}

	render() {
		const src = this.props.src;
		const alt = this.props.altText;
		const classes = this.props.classes || '';
		const landscape = this.props.landscape ? this.props.landscape : '';
		const portrait = this.props.portrait ? this.props.portrait : '';
		const desktop = this.props.desktop ? this.props.desktop : '';

		return (
			<div className={`image-wrap ${classes}`} data-desktop={desktop} data-landscape={landscape} data-portrait={portrait}>
				<img src={src} alt={alt} />
			</div>
		);
	}

}

ImageWrap.propTypes = {
	src: PropTypes.string.isRequired,
	altText: PropTypes.string.isRequired,
	landscape: PropTypes.string.isRequired,
	portrait: PropTypes.string.isRequired,
	desktop: PropTypes.string.isRequired,
	classes: PropTypes.string.isRequired
}

export default ImageWrap;
