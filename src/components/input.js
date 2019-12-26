import React from 'react';
class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div>
				<label className="label">{this.props.data.label}:</label>
				<input value={this.state.text} onChange={this.handleChange} />
			</div>
		)
	}

	handleChange(e) {
		this.setState({text: e.target.value});
		setTimeout(() => {
			this.props.handleChange({id: this.props.data.id, value: this.state.text});
		});
	}

}

export default Input;
