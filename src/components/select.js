import React from 'react';
import Star from './star';
import RequireText from './requireText';
class Radio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { radioValue: this.props.data.value, count: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.selectEle = React.createRef();
    // this.hasValue = this.hasValue.bind(this);
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

  // componentDidMount() {
  //   if (this.props.data.value) this.hasValue(this.props.data.value);
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (!this.state.count) {
  //   // if (prevProps.data.value != this.state.radioValue) {
  //     this.setState({count: 1});
  //     this.hasValue(prevProps.data.value);
  //   }
  // }

  handleChange(e) {
    // this.setState({radioValue: e.target.value});
    // if (e.target.value !== this.state.radioValue) this.hasValue(e.target.value);
    // this.selectEle.current.value = value;
    let value = e.target.value;
    this.setState({radioValue: value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value});
    });
  }

  // hasValue(value) {
  //   // if (value === this.state.radioValue) return;
  //   this.setState({radioValue: value});
  //   this.selectEle.current.value = value;
  //   // setTimeout(() => {
  //   //   this.props.handleChange({id: this.props.data.id, value: this.state.radioValue});
  //   // });
  // }
}

export default Radio;
