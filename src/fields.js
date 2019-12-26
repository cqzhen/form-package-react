const fields = [
	{id: 'userName', label: '姓名', type: 'input'},
	{id: 'img1', label: '个人相片', type: 'inputFile'},
	{id: 'company', label: '公司', type: 'input' },
	{id: 'sex', label: '性别', type: 'radio', options: [{label: '男', value: 1}, {label: '女', value: 2}] },
	{id: 'img2', label: '个人相片', type: 'inputFile'},
	{id: 'provice', label: '省份', type: 'select', options: [{label: '北京', value: 1}, {label: '上海', value: 2}, {label: '广州', value: 3},{label: '深圳', value: 4},{label: '武汉', value: 5},{label: '郑州', value: 6} ] },
	{id: 'introduce', label: '简介', type: 'textarea'},
	{id: 'img3', label: '个人相片', type: 'inputFile'},
];

export default fields;
