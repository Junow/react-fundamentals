import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';
import ContactCreate from './ContactCreate';
import './Contact.css';

class Contact extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedKey: -1,
			keyword: '',
			contactData: [
				{
					name: 'Abet',
					phone: '010-0000-0001',
				},
				{
					name: 'Betty',
					phone: '010-0000-0002',
				},
				{
					name: 'Charlie',
					phone: '010-0000-0003',
				},
				{
					name: 'David',
					phone: '010-0000-0004',
				},
			],
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.handleCreate = this.handleCreate.bind(this);
		this.handleRemove = this.handleRemove.bind(this);
		this.handleEdit = this.handleEdit.bind(this);
	}

	componentWillMount() {
		const contactData = localStorage.contactData;
		if (contactData) {
			this.setState({
				contactData: JSON.parse(contactData),
			});
		}
	}
	componentDidUpdate(prevProps, prevState) {
		if (JSON.stringify(prevState.contactData) !== JSON.stringify(this.state.contactData)) {
			console.log('different');
			localStorage.contactData = JSON.stringify(this.state.contactData);
		}
	}

	handleChange(e) {
		this.setState({
			keyword: e.target.value,
		});
	}

	handleClick(key) {
		this.setState({
			selectedKey: key,
		});
	}

	handleCreate(contact) {
		this.setState({
			contactData: update(this.state.contactData, { $push: [contact] }),
		});
	}

	handleRemove() {
		if (this.state.selectedKey < 0) return;
		this.setState({
			contactData: update(this.state.contactData, { $splice: [[this.state.selectedKey, 1]] }),
			selectedKey: -1,
		});
	}

	handleEdit(name, phone) {
		this.setState({
			contactData: this.state.contactData.map((el, index) => {
				if (index === this.state.selectedKey) {
					el.name = name;
					el.phone = phone;
				}
				return el;
			}),
		});
		// this.setState({
		// 	contactData: update(this.state.contactData, {
		// 		[this.state.selectedKey]: {
		// 			name: { $set: name },
		// 			phone: { $set: phone },
		// 		},
		// 	}),
		// });
	}
	render() {
		const mapToComponents = data => {
			data.sort();
			data = data.filter(contact => {
				return contact.name.toLowerCase().indexOf(this.state.keyword.toLowerCase()) > -1;
			});
			return data.map((contact, i) => (
				<ContactInfo contact={contact} key={i} onClick={() => this.handleClick(i)} />
			));
		};

		return (
			<div>
				<h1 className="contact_header">Contacts</h1>
				<div>
					<p className="search_item">Search: </p>
					<input
						name="keyword"
						placeholder="Name for Search"
						value={this.state.keyword}
						onChange={this.handleChange}
						className="search_item search_input"
					/>
				</div>

				<div className="contacts">{mapToComponents(this.state.contactData)}</div>
				<ContactDetails
					isSelected={this.state.selectedKey != -1}
					contact={this.state.contactData[this.state.selectedKey]}
					onRemove={this.handleRemove}
					onEdit={this.handleEdit}
				/>
				<ContactCreate onCreate={this.handleCreate} />
			</div>
		);
	}
}

export default Contact;
