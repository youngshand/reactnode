import ReactDOM from 'react-dom';

class ImageHandler {

	init(component) {

		this.imageWrap = null;
		this.imageInt = null;
		this.component = null;
		this.orientation = window.orientation == 0 ? 'portrait' : 'landscape';

		this.component = component;
		this.imageWrap = ReactDOM.findDOMNode(this.component);

		this.image = this.imageWrap.getElementsByTagName('img')[0];

		this.loadImage(this.image, this.imageWrap);

	}

	loadImage(image, frame) {

		let imageObj = new Image();

		window.addEventListener('resize', () => {
			this.orientation = window.orientation == 0 ? 'portrait' : 'landscape';
			this.setSrc(image, frame, imageObj);

			imageObj.onload = () => {
				this.imageResize(image, frame, imageObj);
			}
		});

		window.addEventListener('orientationchange', () => {
			this.orientation = window.orientation == 0 ? 'portrait' : 'landscape';
			this.setSrc(image, frame, imageObj);

			imageObj.onload = () => {
				this.imageResize(image, frame, imageObj);
			}
		});

		imageObj.onload = () => { this.imageResize(image, frame, imageObj); }

		this.setSrc(image, frame, imageObj);

	}

	setSrc(image, frame, imageObj) {

		let src = '';

		if ((window.innerWidth <= 768) && (this.orientation == 'portrait') && (frame.getAttribute('data-portrait') != '')) {
			// Portrait
			src = frame.getAttribute('data-portrait');

		} else if ((window.innerWidth <= 1024) && (this.orientation == 'landscape') && (frame.getAttribute('data-landscape') != '')) {
			// Landscape
			src = frame.getAttribute('data-landscape');

		} else if (frame.getAttribute('data-desktop')) {
			// Desktop
			src = frame.getAttribute('data-desktop');

		} else {
			// Desktop
			src = image.src;

		}

		imageObj.src = src;
	}

	// Handles the resizing of the images to ensure they are proportional.
	imageResize(image, frame, imageObj) {

		let contW = frame.offsetWidth + 10,
				contH = frame.offsetHeight + 10,
				ratio = 0,
				imgW = imageObj.width,
				imgH = imageObj.height;

		ratio = contH / imgH;
		if (imgW*ratio >= contW) {
			imgW = imgW*ratio;
			imgH = contH;
		} else {
			ratio = contW / imgW;
			if (imgH*ratio >= contH) {
				imgH = imgH*ratio;
				imgW = contW;
			}
		}

		image.src = imageObj.src;

		image.style.height = imgH+'px';   // Set new height
		image.style.width = imgW+'px';    // Scale width based on ratio

		// Load in the actual image
		image.setAttribute('data-show', 'true');
	}

}

export default new ImageHandler;
