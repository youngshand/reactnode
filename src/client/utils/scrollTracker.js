// @flow
// import ReactDOM from 'react-dom';

// class ScrollTracker {

// 	constructor () {
// 		this.element = null;
// 		this.target = null;
// 		this.scrollInt = null;
// 	}

// 	init(component, element, target) {

// 		this.element = ReactDOM.findDOMNode(component.refs[element]);
// 		this.target = ReactDOM.findDOMNode(component.refs[target]);

// 		this.trackScrollPos(this.element, this.target);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.scrollInt);
// 		this.scrollInt = null;
// 	}

// 	trackScrollPos(element, target) {
// 		// const buffer = 200;
// 		const targetHeight = target.offsetHeight;

// 		// let elementTop = element.getBoundingClientRect().top;
// 		// let windowTop = window.pageYOffset;
// 		// let elementBottom = element.getBoundingClientRect().bottom;

// 		this.scrollInt = setInterval(() => {
// 			let elementTop = element.getBoundingClientRect().top;
// 			// let windowTop = window.pageYOffset;
// 			let elementBottom = element.getBoundingClientRect().bottom;

// 			// if (elementTop > (buffer / 2)) {
// 			//   // set pos to relative
// 			// } else if (elementTop < -(buffer / 2)) {
// 			//   // pos should be fixed
// 			// } else {
// 			//   const top = windowTop / buffer;
// 			//   // this.setState({ imageTop: top });
// 			// }

// 			if (elementTop <= 0) {
// 				target.setAttribute('data-fixed', 'true');
// 			} else {
// 				target.removeAttribute('data-fixed');
// 			}

// 			if (elementBottom <= targetHeight) {
// 				target.setAttribute('data-absolute', 'true');
// 			} else {
// 				target.removeAttribute('data-absolute');
// 			}
// 		}, 1);

// 	}

// }

// export default new ScrollTracker;
