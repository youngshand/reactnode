import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import result from 'lodash/result';
import pick from 'lodash/pick';

import { closeModal } from '../../actions';


/**
 * Creates a popup modal.
 * Each modal uses space in the store to keep track of it's active state
 * When creating the modal a uniq tag prop must be provided.
 */
class Modal extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      tag: props.tag
    };
  }

  closeHandler(e, force = false) {
    // make sure the target is the modal screen and not a sibling
    if (force || this.modalScreen === e.target) {
      e.preventDefault();
      this.props.dispatch(closeModal(this.state.tag));
    }
  }

  render() {
    const curModal = result(this.props.modals, this.state.tag);
    const classNames = this.props.classNames || '';

    if (result(curModal, 'isActive')) {
      return (
        <div ref={node => this.modalScreen = node} className={`modal ${classNames}`} onClick={e => this.closeHandler(e)}>
          <div className="modal-inner">
            <a className="close-button modal-close-button" onClick={(e) => this.closeHandler(e, true)}>
              <svg className="icon icon-close" dangerouslySetInnerHTML={{ __html: '<use xlink:href="#ei-close-icon" />' }} />
            </a>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return false;
    }
  }

}

Modal.propTypes = {
  tag: PropTypes.string.isRequired,
  classNames: PropTypes.string,
  children: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  modals: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return pick(state, ['dispatch', 'modals']);
}

export default connect(mapStateToProps)(Modal);
