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
				<select type="radio" className="radio" name={this.props.data.id} onChange={this.handleChange} >
					{
						this.props.data.options.map((item, index) => {
							return <option key={index} value={item.value}>{item.label}</option>
						})
					}
				</select>
				{this.props.data.require === true && !this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px"}} className="require_star">*</span>
				}
				{this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px", position: "absolute" }} className="require_text">{this.props.data.remindText}</span>
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
