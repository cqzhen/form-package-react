import React from 'react';
class Radio extends React.Component {
	constructor(props) {
		super(props);
		this.state = { radioValue: '' };
		this.handleChange = this.handleChange.bind(this);
	}

	render() {
		return (
			<div>
				<label className="label">{this.props.data.label}:</label>
				{
					this.props.data.options.map((item, index) => {
						return <div className="radio" key={index}><label>{item.label}</label><input type="radio" name={this.props.data.id} onChange={this.handleChange} value={item.value} /></div>
					})
				}
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
		this.setState({radioValue: e.target.value});
		setTimeout(() => {
			this.props.handleChange({id: this.props.data.id, value: this.state.radioValue});
		});
	}
}

export default Radio;
