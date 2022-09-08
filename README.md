## Form-package-react

form-package-react 是一款基于 React 根据 Json 数据配置 form 表单的工具库，用户只需要关心 Json 数据配置，摆脱手写 form。form-package-react 还可以在浏览器和手机之间无缝衔接，无需手机和浏览器各写一套。（写一套，即可得两套：写一套，送一套）

form-package-react is a tool library based on React to configure form forms based on Json data. Users only need to care about Json data configuration and get rid of handwritten forms. form-package-react can also seamlessly connect between the browser and the mobile phone, without the need for a browser to write a set and a mobile phone to write a set. (Write one set and get two sets: write one set, send one set)

### Example

```formPackageReact
import Form from 'form-package-react';
// the data for render form source
import data from './data';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.submit = this.submit.bind(this);
	}

	render() {
		return (
			<div>
				<Form data={data || []} config={config || {}} type={"web web_mini" || "web web_middle"} submit={this.submit} />
			</div>
		)
	}

	submit(data, e) {
		// the data for submit form data
		console.log('data:', data);
	}

}

export default App;
```
[![rSJbsf.png](https://s3.ax1x.com/2020/12/08/rSJbsf.png)](https://imgchr.com/i/rSJbsf)

### Data for form type

Type: input, inputFile, radio, select, textarea, date

### Data for form the source config
```data
const data = [
  {
    id: 'userName',
    label: '姓名',
    type: 'input',
    require: true,
    remindText: '',
    nullText: '内容不为空',
    maxLength: 10,
    value: 'test', // 为了支持编辑或默认值 support setting default values and re-editing of submitted forms
  },
  {
    id: 'phone',
    label: '电话',
    type: 'input',
    require: false,
    remindText: '',
    regex: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/,
    nullText: '内容不为空(其实这个没有用，因为 require false)',
    regexText: '请填写正确的电话号码',
    maxLength: 12,
  },
  {id: 'quitDate', label: '出生日期', type: 'date', require: true, remindText: '', nullText: '内容不为空' },
  {id: 'company', label: '公司', type: 'input', require: false, remindText: '', nullText: '', maxLength: 10 },
  {id: 'sex', label: '性别', type: 'radio', options: [{label: '男', value: 1}, {label: '女', value: 2}], require: true, remindText: '', nullText: '内容不为空', },
  {id: 'img1', label: '个人相片', type: 'inputFile', accept: '.xlsx', uploadApi: 'http://localhost:upload/', serverFilePath: 'http://localhost:1515', require: true, remindText: '', nullText: '内容不为空', },
  {id: 'provice', label: '省份', type: 'select', options: [{label: '北京', value: 1}, {label: '上海', value: 2}, {label: '广州', value: 3},{label: '深圳', value: 4},{label: '武汉', value: 5},{label: '郑州', value: 6} ], require: true, remindText: '', nullText: '内容不为空', },
  {id: 'introduce', label: '简介', type: 'textarea', require: true, remindText: '', nullText: '内容不为空', },
  {id: 'img2', label: '个人相片', type: 'inputFile', accept: '.png,.jpg,.xlsx', require: true, remindText: '', nullText: '内容不为空', uploadApi: '', serverFilePath:'', },
];

export default data;
```
### config for form the config
```data
const config = {
  enctype: '',
  method: '',
  noSubmit: '',
  submitText: '',
};

export default data;
```
### config for form the css 
```type
// 默认样式是 web，针对表单样式，基于 web 做了 mini 和 middle 适配
<Form data={data || []} config={config || {}} type={"web web_mini" || "web web_middle"} submit={this.submit} />
```

### Version changes 

| Version | Changes |
|   :-:   |  :-  |
| 0.0.7 - 0.0.74 |1.表单校验（Validation）<br>2.适配手机样式（Adapt to mobile phone）| 
      
      

##### id
表单里面每一个属性的唯一绑定 key 值, 也是表单所要提交的 key (The unique binding key value of each attribute in the form is also the key to be submitted by the form。)
##### label
每一个属性的 label 值 (Label value for each attribute。)
##### type
每一个元素的类型：input, inputFile, radio, select, textarea（The type of each element: input, inputFile, radio, select, textarea, date） 
##### attributeStr
每一个元素的属性：目前只支持 input 类型（The attributeStr of each element: currently only supports input） 
##### options
radio 类型和 select 类型的专有对象数组属性，包含 label 和 value 两个属性。(Radio type and select type proprietary object array attributes, including label and value attributes。)
##### require
boolean 字段是否需要校验 （Whether the field needs to be verified）
##### nullText
字段为空时的提示语，如果 require 为 false 则不需要设置 （Prompt when the field is empty, if require is false, no need to set）
##### regex
字段校验的正则表达式 （Regular expression for field validation）
##### regexText
正则表达式校验的提示语，如果 regex 为空则不需要设置（Prompt for regular expression verification, if regex is empty, no need to set）
##### remindText
字段校验有问题时的提示语，依赖于 nullText 和 regexText，可以不设置此字段（The prompt language when there is a problem with the field verification, which depends on nullText and regexText, and this field may not be set）
##### maxLength
input 或 textarea 类型的字段，设置可输入字段的最大长度（Input or textarea type field, set the maximum length of the input field）
##### value
input 或 textarea 类型的字段，通常用于支持设置默认值和已提交的表单再编辑（Input or textarea type field, Usually used to support setting default values and re-editing of submitted forms)
##### uploadApi
string inputFile 类型的字段，用于上传文件，及上传文件的接口（A field of inputFile type, used to upload files, and upload file interface）
##### deleteApi
string inputFile 类型的字段，用于删除文件，及删除当前文件的接口（A field of inputFile type, Interface for deleting files and deleting the current file）
##### fileNumber
number inputFile 类型的字段，默认值为 1 。用于上传文件最大数量（A field of inputFile type,The default value is 1. The maximum number of uploaded files）
##### isShowFilePath
boolean inputFile 类型的字段，用于上传文件后查看服务器上传文件（A field of inputFile type, Used to display files on the server after the file is uploaded）
##### serverFilePath
string inputFile 类型的字段，用于上传文件后查看服务器归档的文件夹列表（A field of inputFile type, used to view the list of folders archived by the server after uploading a file）
##### Done
    - Validation
    - Adapt to mobile phone
    - Support editing for input
##### Todo
    - Custom style
    - Loading when submitting
##### Web 效果图
<img style="display:inline-block;width:388px;" src="https://s3.ax1x.com/2020/12/16/r1VPAA.png" />

##### Mobile 效果图
<img style="display:inline-block;width:388px;" src="https://s3.ax1x.com/2020/12/16/r1VUHJ.png" />

<!--
[![rSJPVe.png](https://s3.ax1x.com/2020/12/08/rSJPVe.png)](https://imgchr.com/i/rSJPVe)
[![rlOFMV.png](https://s3.ax1x.com/2020/12/16/rlOFMV.png)](https://imgchr.com/i/rlOFMV)
[![Dxlres.png](https://s3.ax1x.com/2020/12/07/Dxlres.png)](https://imgchr.com/i/Dxlres)
[![DxpZ5t.png](https://s3.ax1x.com/2020/12/07/DxpZ5t.png)](https://imgchr.com/i/DxpZ5t)
<img style="display:inline-block;width:388px;" src="https://s2.ax1x.com/2019/12/26/lkXWaq.png" />
-->
