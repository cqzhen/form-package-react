import React from 'react';
class RequireText extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <span>
      {this.props.data.remindText &&
        <span style={{color: "red", marginLeft: "10px", position: "absolute" }} className="require_text">{this.props.data.remindText}</span>
      }
      </span>
    )
  }
}

export default RequireText;
