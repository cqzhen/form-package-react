import React from 'react';
import Star from './star';
import RequireText from './requireText';
import Axios from './../utils/axios';
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imgUrl: '', files: []};
    this.handleChange = this.handleChange.bind(this);
    this.fileInput = React.createRef();
    this.data = props.data;
  }

  render() {
    return (
      <div>
        <label className="label">{this.data.label}:</label>
        <button onClick={() => { this.fileInput.current.click() }} type="button">上传</button>
        <Star data={this.data}></Star>
        <RequireText data={this.data}></RequireText>
        <input type="file" accept={this.data.accept} style={{display: "none"}} ref={this.fileInput} onChange={this.handleChange} />
        {this.state.imgUrl &&
          <img src={this.state.imgUrl} alt="图片" />
        }
        {
          <div style={{"padding-left": "110px"}}>
            {
              this.state.files.map((item, index) => (
                <div>
                 <span>查看上传文件：</span><a key={index} target="_blank" href={item.destination}><span style={{"color": "blue"}}>{item.filename}</span></a>
                {this.data.serverFilePath && 
                 <p><span>查看生成文件：</span><a key={index} target="_blank" href={this.data.serverFilePath}><span style={{"color": "blue"}}>查看详情</span></a></p>
                }
                </div>
            ))
            }
          </div>
        }
      </div>
    )
  }

  uploadFile() {
    const formData = new FormData();
    Array.prototype.forEach.call(this.fileInput.current.files, (item) => { formData.append('file', item); });
    Axios.post(this.data.uploadApi, formData, { headers: {
        'Content-Type': 'multipart/form-data',
    }}).then(res => {
      let files = res.data.data.files || [];
      this.setState({ files });
      setTimeout(() => {
        this.createUrl(this.state.file);
        this.props.handleChange({id: this.data.id, value: this.state.file});
        this.fileInput.current.value = '';
      });
    });
  }

  handleChange(e) {
    this.setState({file: this.fileInput.current.files});
    if (this.data.uploadApi) {
      this.uploadFile();
    }
  }

  async createUrl(files) {
    files = [...files];
    if (files.length === 0) return;
    let result = await Promise.all(
      files.filter(item => item.type.match('image')).map(file => {
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
