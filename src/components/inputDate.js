import React from 'react';
import Star from './star';
import RequireText from './requireText';
class InputDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.data.value, count: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.hasValue = this.hasValue.bind(this);
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        <input value={this.state.text || ''} onChange={this.handleChange} type="date" />
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
      </div>
    )
  }

  componentDidMount() {
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (!this.state.count) {
  //     this.setState({count: 1});
  //     this.hasValue(prevProps.data.value);
  //   }
  // }

  handleChange(e) {
    let value = e.target.value;
    if (value !== this.state.text) return;
    // this.hasValue(e.target.value);
    this.setState({text: value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value});
    });
  }

  // hasValue(value) {
  //   // if (value === this.state.text) return;
  //   this.setState({text: value});
  // }

}

export default InputDate;
