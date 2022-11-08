import React from 'react';
import Star from './star';
import RequireText from './requireText';
import Axios from './../utils/axios';
class Cascader extends React.Component {
  constructor(props) {
    // 级联组件的配置
    super(props);
    this.state = { radioValue: '', count: 0 };
    this.handleChange = this.handleChange.bind(this);
    this.hasValue = this.hasValue.bind(this);
    // this.data = props.data;
    // this.elements = props.data.elements;
    this.childName = props.data.childName;
    for(let i = 0; i < props.data.elements.length; i++) {
      this[`elements_${i}`] = React.createRef();
      // this.setState(this.props.data.elements[i].name, '');
    }
  }

  render() {
    return (
      <div>
        <label className="label">{this.props.data.label}</label>
        <div className="cascader">
          <div className="container">
            {this.props.data.elements.map((item, index) => {
              return <select ref={this[`elements_${index}`]} disabled={item.disabled} type="radio" className="radio cascader_select" name={item.name} onChange={this.handleChange.bind(this, {index, item})} >
                <option key={-1} value={''}></option>
              {
                item.options.map((option, key) => {
                  return <option key={key} value={option.id}>{option.name || option.fullname}</option>
                })
              }
              </select>
            })}
          </div>
        </div>
        <Star data={this.props.data}></Star>
        <RequireText data={this.props.data}></RequireText>
      </div>
    )
  }
  
  componentDidMount() {
  // componentWillMount() {
    Axios.get(this.props.data.serviceApi)
      .then((res) => {
        let data = res.data.data;
        this.props.data.elements[0].options = data;
        this.setState({'parent': data});
      });
    console.log('elements_did:', this.props.data.elements);
  }

  componentDidUpdate(prevProps, prevState) {
    // if (!this.state.count) {
    if (this.state.count < 2 && prevProps.data.value != this.state.radioValue) {
      console.log('elements_update_count:', this.state.count);
      console.log('elements_update_value:', prevProps.data.value);
      this.setState(state => ({count: state.count + 1}));
      this.setState({radioValue: prevProps.data.value});
      this.hasValue(prevProps.data.value);
    }
  }

  handleChange(obj, e) {
    let index = obj.index;
    let item = obj.item;
    let itemLength = this.props.data.elements.length;
    let value = e.target.value;
    let childrenContainer = item.options.filter(x => x.id === value);
    let children = childrenContainer.length && childrenContainer[0][this.childName] || [];
    let textValue = '';
    for(let i = 0; i <= index; i++) {
      textValue += this[`elements_${i}`].current.value;
      if (i != index) textValue += ',';
    }
    console.log('textValue:', textValue);
    this.setState({'radioValue': textValue});
    if (index + 1 >= itemLength) {
      setTimeout(() => {
        this.props.handleChange({id: this.props.data.id, value: textValue});
      });
      return;
    };
    if (!children.length) {
      setTimeout(() => {
        this.props.handleChange({id: this.props.data.id, value: textValue});
      });
    };
    for (let i = index + 1; i < itemLength; i++) {
      this.props.data.elements[i].options = [];
      this[`elements_${i}`].current.value = null;
      if (!children.length) {
        this.props.data.elements[i].disabled = true;
      } else {
        this.props.data.elements[i].disabled = false;
      }
    }
    this.props.data.elements[index + 1].options = children;
    this.setState(state => ({
      'test': !state.test
    }));
  }

  hasValue(value) {
    // let { value } = data;
    if (!value) return;
    console.log('ref_value:', value);
    let citys = value.split(',');
    console.log('citys:', citys);
    for (let i = 0; i < citys.length; i++) {
      setTimeout(() => {
        this[`elements_${i}`].current.value = citys[i];
        let childrenContainer = this.state.parent.filter(x => x.id === citys[i]) || [];
        let children = childrenContainer.length && childrenContainer[0][this.childName] || [];
        this.setState({parent: children});
        if (i + 1 < this.props.data.elements.length) this.props.data.elements[i+1].options = children; 
        this.setState(state => ({
          'test': !state.test
        }));
      }, i * 100);
    }
    for (let i = this.props.data.elements.length - 1; i > citys.length - 1; i--) {
      this.props.data.elements[i].disabled = true;
      this.setState(state => ({
        'test': !state.test
      }));
    }
    // this.setState({radioValue: value});
    setTimeout(() => {
      this.props.handleChange({id: this.props.data.id, value});
    });
  }
}

export default Cascader;
