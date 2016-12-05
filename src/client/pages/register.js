// @flow
import React from 'react';
import { connect } from 'react-redux';
import pick from 'lodash/pick';

import User from '../../server/models/user';

const emailRe = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

class Register extends React.Component {

	inputs:Object;
	user:Object;
	constructor () {
		super();

		this.inputs = {};

		this.state = {
			formStateClass: '',
			nameValid: null,
			emailValid: null,
			subjectValid: null,
			messageValid: null
		};

		(this:any).handleChange = this.handleChange.bind(this);
		(this:any).handleSubmit = this.handleSubmit.bind(this);

	}

	/**
	 * Handles a change event coming from an input
	 */

	handleChange(event) {

		this.setState({value: event.target.value});

	}

	validate(item, itemType = null) {

		if(!item || (itemType === 'email' && !emailRe.test(item))){

			return false;

		}

		return true;

	}

	/**
	 * Handles the form being submitted
	 */

	handleSubmit(e) {

		e.preventDefault();

		const validation = { errorMessage: false };
		const firstName = this.inputs.firstName.value;
		const lastName = this.inputs.lastName.value;
		const email = this.inputs.email.value;

		// if all our values are valid post them to the api
		if (this.validate(firstName) && this.validate(lastName) && this.validate(email, 'email')) {

			this.user = new User({
			  firstName: firstName,
			  lastName: lastName,
			  email: email,
			  ip: String,
			  userAgent: String,
			  ageRange: String,
				})

		} else {

			// updated the state with the failed validation messages
			this.setState(validation);
		}
	}

  render() {
    return (
      <div className="main-content">
			  <section class="step-1 details-form">
			    <div class="inner">
			      <form>
			        <div class="row">
			          <div class="form-group col-xs-6">
			            <label for="register-first-name">First name</label>
			            <input type="text" id="register-first-name" placeholder="First name" class="form-control input-lg"/>
			          </div>
			          <div class="form-group col-xs-6">
			            <label for="register-last-name">Last name</label>
			            <input type="text" id="register-last-name" placeholder="Last name" class="form-control input-lg"/>
			          </div>
			        </div>
			        <div class="form-group">
			          <label for="register-gender">Gender</label>
			          <select id="register-gender" class="form-control input-lg">
			            <option>Choose your gender...</option>
			            <option value="Male">Male</option>
			            <option value="Female">Female</option>
			            <option value="Prefer not to say">Prefer not to say</option>
			          </select>
			        </div>
			        <div class="form-group">
			          <label for="register-age">Age</label>
			          <select id="register-age" class="form-control input-lg">
			            <option>Choose your age group...</option>
			            <option value="Under 18">Under 18</option>
			            <option value="18-29">18 &ndash; 29</option>
			            <option value="30-39">30 &ndash; 39</option>
			            <option value="40-49">40 &ndash; 49</option>
			            <option value="50-59">50 &ndash; 59</option>
			            <option value="60-69">60 &ndash; 69</option>
			            <option value="70+">70+</option>
			          </select>
			        </div>
			        <div class="form-group">
			          <label for="register-email">Email address</label>
			          <input type="email" id="register-email" placeholder="Email" class="form-control input-lg"/>
			        </div>
			        <div class="form-group">
			          <label for="register-region">Region</label>
			          <select id="register-region" class="form-control input-lg">
			            <option>Choose your region...</option>
			            <option value="Auckland">Auckland</option>
			            <option value="Bay of Plenty">Bay of Plenty</option>
			            <option value="Canterbury">Canterbury</option>
			            <option value="Gisborne">Gisborne</option>
			            <option value="Hawke's Bay">Hawke's Bay</option>
			            <option value="Manawatu-Whanganui">Manawatu-Whanganui</option>
			            <option value="Marlborough">Marlborough</option>
			            <option value="Nelson">Nelson</option>
			            <option value="Northland">Northland</option>
			            <option value="Otago">Otago</option>
			            <option value="Southland">Southland</option>
			            <option value="Taranaki">Taranaki</option>
			            <option value="Tasman">Tasman</option>
			            <option value="Waikato">Waikato</option>
			            <option value="Wellington">Wellington</option>
			            <option value="West Coast">West Coast</option>
			          </select>
			        </div>
			        <div class="checkbox">
			          <label>
			            <input type="checkbox" id="register-terms"/>I agree to the terms &amp; conditions
			          </label>
			        </div>
			        <input type="submit" value="Next" class="btn-next btn btn-primary btn-lg"/>
			      </form>
			    </div>
			  </section>
      </div>
    );
  }

}

/**
 * Add prop types here
 */
Register.propTypes = {}

/**
 * Returns only the props required for this component to render
 */
function mapStateToProps(state) {
  // Add prop names to the pick array which need to be used in the Register
  return pick(state, []);
}

export default connect(mapStateToProps)(Register);
