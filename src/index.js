import React from 'react';
import { Input, Radio, Select, Textarea, InputFile } from './components/index';
import './index.css';
class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = { fields: props.data || [] };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className="reactForm">
				<form onSubmit={this.handleSubmit}>
					{
						this.state.fields.map(item => {
							if(item.type === 'input') {
								return <Input key={item.id} handleChange={this.handleChange} data={item} />
							}
							if(item.type === 'radio') {
								return <Radio key={item.id} handleChange={this.handleChange} data={item} />
							}
							if(item.type === 'select') {
								return <Select key={item.id} handleChange={this.handleChange} data={item} />
							}
							if(item.type === 'textarea') {
								return <Textarea key={item.id} handleChange={this.handleChange} data={item} />
							}
							if(item.type === 'inputFile') {
								return <InputFile key={item.id} handleChange={this.handleChange} data={item} />
							}
							return null;
						})
					}
					<div><label className="label"></label><button type="submit">提交</button></div>
				</form>
			</div>
		)
	}

	handleChange(data, e) {
		this.setState({
			[data.id]: data.value
		})
	}

	handleSubmit(event) {
		event.preventDefault();
		console.log('数据:', this.state);
		return [];
	}

}

export default Form;
