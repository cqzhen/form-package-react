import React from 'react';
class Input extends React.Component {
	constructor(props) {
		super(props);
		this.state = {file: '', imgUrl: ''};
		this.handleChange = this.handleChange.bind(this);
		this.fileInput = React.createRef();
	}

	render() {
		return (
			<div>
				<label className="label">{this.props.data.label}:</label>
				<button onClick={() => { this.fileInput.current.click() }} type="button">上传</button>
				{this.props.data.require === true && !this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px"}} className="require_star">*</span>
				}
				{this.props.data.remindText &&
					<span style={{color: "red", marginLeft: "10px", position: "absolute" }} className="require_text">{this.props.data.remindText}</span>
				}
				<input type="file" style={{display: "none"}} ref={this.fileInput} onChange={this.handleChange} />
				{this.state.imgUrl && 
					<img src={this.state.imgUrl} alt="图片" />
				}
			</div>
		)
	}

	handleChange(e) {
		this.setState({file: this.fileInput.current.files});
		setTimeout(() => {
			this.createUrl(this.state.file);
			this.props.handleChange({id: this.props.data.id, value: this.state.file});
		});
	}

	async createUrl(files) {
		files = [...files];
		if (files.length === 0) return;
		let result = await Promise.all(
			files.map(file => {
				let url = null;
				if (window.createObjectURL !== undefined) {
					url = window.createObjectURL(file)
				} else if (window.URL !== undefined) {
					url = window.URL.createObjectURL(file)
				} else if (window.webkitURL !== undefined) {
					url = window.webkitURL.createObjectURL(file)
				}
				return url;
			})
		);
		await this.setState({ imgUrl: result[0] })
		console.log(result)
	}

}

export default Input;
