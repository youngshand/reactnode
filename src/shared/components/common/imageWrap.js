import React from 'react';
import ImageHandler from '../../utils/imageHandler';

class ImageWrap extends React.Component {

  static propTypes = {
    src: React.PropTypes.string.isRequired,
    altText: React.PropTypes.string.isRequired,
    landscape: React.PropTypes.string.isRequired,
    portrait: React.PropTypes.string.isRequired,
    desktop: React.PropTypes.string.isRequired,
    classes: React.PropTypes.string.isRequired
  }

  componentDidMount() {
    ImageHandler.init(this);
  }

  render() {

    let src = this.props.src,
        alt = this.props.altText,
        classes = '',
        landscape = this.props.landscape ? this.props.landscape : '',
        portrait = this.props.portrait ? this.props.portrait : '',
        desktop = this.props.desktop ? this.props.desktop : '';

    if (this.props.classes) {
      classes = this.props.classes;
    }

    return (
      <div className={`image-wrap ${classes}`} data-desktop={desktop} data-landscape={landscape} data-portrait={portrait}>
        <img src={src} alt={alt} />
      </div>
    );
  }
}

export default ImageWrap;
