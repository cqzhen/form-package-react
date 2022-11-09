import React from 'react';
import Star from './star';
import RequireText from './requireText';
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.data.value, count: 0 };
    this.handleChange = this.handleChange.bind(this);
    // this.hasValue = this.hasValue.bind(this);
    this.inputEle = React.createRef();
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        <input value={this.state.text || ''} ref={this.inputEle} onChange={this.handleChange} maxLength={this.props.data.maxLength} />
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
      </div>
    )
  }

  componentDidMount() {
    if (!this.props.data.attributeStr) return;
    this.props.data.attributeStr.split(';').forEach((item, index) => {
      if (!item) return;
      let attr = item.split('=');
      this.inputEle.current.setAttribute(attr[0], attr[1]);
    });
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (!this.state.count) {
  //   // if (prevProps.data.value != this.state.text) {
  //     this.setState({count: 1});
  //     this.hasValue(prevProps.data.value);
  //   }
  // }

  handleChange(e) {
    if (e.target.value == this.state.text) return;
    // this.hasValue(e.target.value);
    this.setState({text: e.target.value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value: e.target.value });
    });
  }

  // hasValue(value) {
  //   if (value === this.state.text) return;
  //   this.setState({text: value});
  // }
}

export default Input;
