import React from 'react';
import Star from './star';
import RequireText from './requireText';
class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: this.props.data.value, count: 0 };
    this.handleChange = this.handleChange.bind(this);
    // this.hasValue = this.hasValue.bind(this);
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        <textarea value={this.state.text || ''} onChange={this.handleChange} maxLength={this.props.data.maxLength} />
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
  //   // if (prevProps.data.value != this.state.text) {
  //     this.setState({count: 1});
  //     this.hasValue(prevProps.data.value);
  //   }
  // }

  handleChange(e) {
    let value = e.target.value;
    // if (value !== this.state.text) this.hasValue(value);
    this.setState({text: value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value});
    });
  }

  // hasValue(value) {
  //   if (value === this.state.text) return;
  //   this.setState({text: value});
  //   // setTimeout(() => {
  //   //   this.props.handleChange({id: this.props.data.id, value: this.state.text});
  //   // });
  // }
}

export default TextArea;
