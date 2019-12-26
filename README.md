## Form-package-react

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
				<Form data={data || []} submit={this.submit} />
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

### Data for form type

Type: input, inputFile, radio, select, textarea

### Data for form the source config
```data
const data = [
	{id: 'userName', label: '姓名', type: 'input'},
	{id: 'img1', label: '个人相片', type: 'inputFile'},
	{id: 'sex', label: '性别', type: 'radio', options: [{label: '男', value: 1}, {label: '女', value: 2}] },
	{id: 'provice', label: '省份', type: 'select', options: [{label: '北京', value: 1}, {label: '上海', value: 2}, {label: '广州', value: 3},{label: '深圳', value: 4},{label: '武汉', value: 5},{label: '郑州', value: 6} ] },
	{id: 'introduce', label: '简介', type: 'textarea'}
];

export default data;
```

##### id
表单里面每一个属性的唯一绑定 key 值, 也是表单所要提交的 key (The unique binding key value of each attribute in the form is also the key to be submitted by the form。)
##### label
每一个属性的 label 值 (Label value for each attribute。)
##### options
radio 类型和 select 类型的专有对象数组属性，包含 label 和 value 两个属性。(Radio type and select type proprietary object array attributes, including label and value attributes。)
##### Todo
    - Validation
    - Custom style
##### 效果图
<img style="display:inline-block;width:388px;" src="https://s2.ax1x.com/2019/12/26/lkXWaq.png" />
