import React from 'react';
import Star from './star';
import RequireText from './requireText';
import Axios from './../utils/axios';
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '', imgUrl: [], files: [], count: 0};
    this.handleChange = this.handleChange.bind(this);
    this.closeImage = this.closeImage.bind(this);
    this.fileInput = React.createRef();
    this.data = props.data;
    if (!this.data.fileNumber) this.data.fileNumber = 1;
    this.hasValue = this.hasValue.bind(this);
  }

  render() {
    return (
      <div>
        <label className="label">{this.data.label}</label>
        {this.data.fileNumber == this.state.files.length &&
          <button className="disabled" type="button">上传完毕</button>
        }
        {this.data.fileNumber != this.state.files.length &&
          <button onClick={() => { this.fileInput.current.click() }} type="button">上传</button>
        }
        <Star data={this.data}></Star>
        <RequireText data={this.data}></RequireText>
        <input type="file" accept={this.data.accept} style={{display: "none"}} ref={this.fileInput} onChange={this.handleChange} />
        <div className="img_container">
          {this.state.imgUrl.length > 0 &&
            this.state.imgUrl.map((item, index) => (
              <div className="img_context">
                <img src={item.imgUrl} alt="图片" />
                <span className="img_close" id={item.id} onClick={this.closeImage}>x</span>
              </div>
            ))
          }
        </div>
        {
          <div className="server_info">
            {
              this.state.files.map((item, index) => (
                <div>
                  {this.data.isShowFilePath &&
                    <p>
                      <span>查看上传文件：</span>
                      <a key={index} target="_blank" href={item.destination}><span style={{"color": "blue"}}>{item.filename}</span></a>
                    </p>
                  }
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
      // upload success 处理 service file info
      let resFiles = res.data.data.files || [];
      let files = this.state.files;
      files.push(resFiles[0]);
      console.log('files:', res.data.data.files);
      this.setState({ files });
      setTimeout(() => {
        this.createUrl(this.state.file, resFiles[0].id);
        this.props.handleChange({id: this.data.id, value: this.state.files});
        this.fileInput.current.value = '';
      });
    });
  }

  closeImage(e) {
    let imgs = this.state.imgUrl;
    let files = this.state.files;
    imgs = imgs.filter(x => x.id != e.target.id);
    files = files.filter(x => x.id != e.target.id);
    this.setState(state => ({imgUrl: imgs, files}));
    // 如何处理 !!!
    this.props.handleChange({id: this.data.id, value: files.length ? files : ''});
    if (!this.data.deleteApi) return;
    Axios.post(this.data.deleteApi, e.target.id)
    .then(res => {
      // 如果有删除接口，是否应该把前端删除逻辑放在此处
      // 比如下方
      // this.props.handleChange({id: this.data.id, value: files.length ? files : ''});
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.state.count) {
    // if (!this.state.imgUrl.length) {
      this.setState({count: 1});
      this.hasValue(prevProps.data.value);
    }
  }

  handleChange(e) {
    this.setState({file: this.fileInput.current.files});
    if (this.data.uploadApi) {
      this.uploadFile();
    }
  }

  hasValue(value) {
    if (this.state.imgUrl.length && value === this.state.imgUrl[0].imgUrl) return;
    let time = +new Date();
    this.setState({imgUrl: [{imgUrl: value, destination: value, href: value, id: time}]});
    this.setState(state => ({
      files: state.imgUrl
    }));
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value: this.state.imgUrl});
    });
  }

  async createUrl(files, id) {
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
    let imgs = this.state.imgUrl;
    imgs.push({imgUrl: result[0], id});
    await this.setState({ imgUrl: imgs });
    console.log(result);
  }
}

export default Input;
