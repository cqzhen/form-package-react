## Form-package-react

### Example

```formPackageReact
import App from 'form-package-react';
import data from './fields';

ReactDOM.render(<App data={data || []}/>, document.getElementById('root'));
```

### Data

Type: input, inputFile, radio, select, textarea

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
每一个属性的唯一绑定 key 值, 也是表单所要提交的 key
##### label
每隔一属性的中文
##### options
radio 类型和 select 类型的专有对象数组属性，包含 label 和 value 两个属性。
