import React from 'react';
import Star from './star';
import RequireText from './requireText';
class TextArea extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}:</label>
        <textarea value={this.state.text} onChange={this.handleChange} maxLength={this.props.data.maxLength} />
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
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

export default TextArea;
