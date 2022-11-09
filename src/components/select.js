import React from 'react';
import Star from './star';
import RequireText from './requireText';
class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { radioValue: this.props.data.value, count: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.selectEle = React.createRef();
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        <select value={this.state.radioValue} ref={this.selectEle} type="radio" className="radio" name={this.props.data.id} onChange={this.handleChange} >
        {
          this.props.data.options.map((item, index) => {
            return <option key={index} value={item.value}>{item.label}</option>
          })
        }
        </select>
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
      </div>
    )
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({radioValue: value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value});
    });
  }

}

export default Radio;
