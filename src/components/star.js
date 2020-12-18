import React from 'react';
class Star extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <span>
        {this.props.data.require === true && !this.props.data.remindText &&
          <span style={{color: "red", marginLeft: "10px"}} className="require_star">*</span>
        }
      </span>
    )
  }
}

export default Star;
