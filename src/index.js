import React from 'react';
import { Input, Radio, Select, Textarea, InputFile, InputDate } from './components/index';
import './index.css';
import Element from './element.js';
class Form extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
      fields: props.data || [],
      type: 'web'
    };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	render() {
		return (
			<div className={`${this.state.type} reactForm`}>
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
							if(item.type === 'date') {
								return <InputDate key={item.id} handleChange={this.handleChange} data={item} />
							}
							return null;
						})
					}
					<div className="submit"><label className="label"></label><button type="submit">提交</button></div>
				</form>
			</div>
		)
	}

  componentDidMount() {
    if (this.isMobile()) {
      this.setState({
        type: 'phone' 
      })
    }
  }
  
  isMobile() {
    let ua = navigator.userAgent;
    console.log('ua:', ua);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/),

        isIphone =!ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/),

        isAndroid = ua.match(/(Android)\s+([\d.]+)/),

        isMobile = isIphone || isAndroid;

    if (isMobile) {
      return true;
    }
    return false;
  }

  handleChange(data, e) {
    let fields = this.state.fields;
    let index = fields.findIndex(item => item.id === data.id);
    fields[index].value = data.value;
    fields[index] = (new Element(fields[index])).getElement();
    this.setState({
      fields
    })
    this.setState({
      [data.id]: data.value
    })
  }

  getErrorObjs() {
    let fields = this.state.fields;
    let errs = [];
    fields.forEach((item, index) => {
      let element = new Element(item);
      item = element.getElement();
      if (item.remindText) errs.push(item);
    });
    this.setState({
      fields
    })
    return errs;
  }

  handleSubmit(event) {
    event.preventDefault();
    let errorObjs = [];
    let fields = this.state.fields;

    errorObjs = this.getErrorObjs();

    if (errorObjs.length) {
      this.setState({
        fields
      });
      return;
    }

    console.log('data:', this.state);

    if (typeof this.props.submit === "function") {
      this.props.submit(this.state);
    } else {
      console.warn('warn', "are you sure don't bind the function for the submit?")
    }

    return [];
  }

}

export default Form;
