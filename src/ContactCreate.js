import React from 'react';
import PropTypes from 'prop-types';

class ContactCreate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			phone: '',
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}

	handleChange(e) {
		let nextState = {};
		nextState[e.target.name] = e.target.value;
		this.setState(nextState);
	}

	handleClick() {
		const contact = {
			name: this.state.name,
			phone: this.state.phone,
		};

		this.props.onCreate(contact);

		this.setState({
			name: '',
			phone: '',
		});

		this.nameInput.focus();
	}

	handleKeyPress(e) {
		if (e.charCode === 13) {
			this.handleClick();
		}
	}

	render() {
		return (
			<div className="contact_create_container">
				<h2>Create Contact</h2>
				<div>
					<input
						type="text"
						name="name"
						placeholder="name"
						value={this.state.name}
						onChange={this.handleChange}
						ref={ref => {
							this.nameInput = ref;
						}}
					/>
					<br />
					<input
						type="text"
						name="phone"
						placeholder="phone"
						value={this.state.phone}
						onChange={this.handleChange}
						onKeyPress={this.handleKeyPress}
					/>
				</div>
				<button onClick={this.handleClick}>Create</button>
			</div>
		);
	}
}

ContactCreate.propTypes = {
	onCreate: PropTypes.func,
};

ContactCreate.defaultProps = {
	onCreate: () => {
		console.error('onCreate not defined');
	},
};

export default ContactCreate;
