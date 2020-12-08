import React from 'react';
class InputDate extends React.Component {
	constructor(props) {
		super(props);
		this.state = {text: ''};
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div>
				<label className="label">{this.props.data.label}:</label>
				<input value={this.state.text} onChange={this.handleChange} type="date" />
				{this.props.data.require === true && !this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px"}}>*</span>
				}
				{this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px", position: "absolute" }}>{this.props.data.remindText}</span>
				}
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

export default InputDate;
