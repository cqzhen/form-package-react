import React from 'react';
import Star from './star';
import RequireText from './requireText';
import Axios from './../utils/axios';
class Checkbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0, text: '', show: false, checkedList: [], checkedTextList: [], checkboxValue: props.data.value, checkboxList: [] };
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.inputEle = React.createRef();
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        
        <input element-type="checkbox_component" readOnly value={this.state.text || ''} ref={this.inputEle} onClick={this.handleInput} maxLength={this.props.data.maxLength} />
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
        {this.state.show && 
          <div element-type="checkbox_component" className="checkbox_container">
            {
              this.state.checkboxList.map((item, index) => {
                return <p element-type="checkbox_component" className={[item.isActive ? 'active': '', 'checkboxText'].join(' ')} key={index} id={item.value} onClick={this.handleChange.bind(this, item)}>{item.name}</p>
              })
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    document.addEventListener('click', (e) => {
      e.stopPropagation();
      if (!(e.target.getAttribute('element-type') === 'checkbox_component')) {
        this.setState(state => ({
          show: false 
        }));
      }
     })
    Axios.get(this.props.data.serviceApi)
      .then((res) => {
        let data = res.data.data;
        console.log('data_category:', data);
        // this.props.checkboxList = data;
        this.setState({'checkboxList': data});
        if (this.props.data.value) this.hasValue(this.props.data.value);
      });
    
    if (!this.props.data.attributeStr) return;
    this.props.data.attributeStr.split(';').forEach((item, index) => {
      if (!item) return;
      let attr = item.split('=');
      this.inputEle.current.setAttribute(attr[0], attr[1]);
    });
  }

  handleInput(e) {
    this.setState(state => ({
      show: !state.show
    }));
    return;
  }
  
  handleChange(item, e) {
    let list = this.state.checkedList;
    let textList = this.state.checkedTextList;
    if (!item.isActive && this.props.data.max && list.length == this.props.data.max) return;
    if (item.isActive) {
      list = list.filter(x => x != item.value);
      textList = textList.filter(x => x != item.name);
    } else {
      list.push(item.value);
      textList.push(item.name);
    } 
    this.setState({checkedList: list});
    this.setState({checkedTextList: textList});
    this.setState({checkboxValue: list.join(',')});
    this.setState({text: textList.join(',')});
    item.isActive = !item.isActive;
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value: list.join(',')});
    });
  }

  hasValue(value) {
    if (value) {
      let list = value.split(',');
      let checkboxList = this.state.checkboxList;
      let textList = [];
      for (let i = 0; i < checkboxList.length; i++) {
        if (!list.includes(checkboxList[i].value)) continue;
        checkboxList[i].isActive = true;
        textList.push(checkboxList[i].name);
      }
      this.setState({text: textList.join(',')});
      this.setState({checkedList: list});
      this.setState({checkboxValue: value});
    }
  }
}

export default Checkbox;
