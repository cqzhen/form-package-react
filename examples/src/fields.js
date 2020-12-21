const fields = [
	{
    id: 'userName',
    label: '姓名',
    type: 'input',
    require: true,
    remindText: '',
    nullText: '内容不为空',
    maxLength: 10,
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
	{id: 'birthDay', label: '出生日期', type: 'date', require: true, remindText: '', nullText: '内容不为空' },
	{id: 'company', label: '公司', type: 'input', require: false, remindText: '', nullText: '内容不为空', maxLength: 10 },
	{id: 'sex', label: '性别', type: 'radio', options: [{label: '男', value: 1}, {label: '女', value: 2}], require: true, remindText: '', nullText: '内容不为空', },
	{id: 'img1', label: '个人相片', type: 'inputFile', require: true, remindText: '', nullText: '内容不为空', },
	{id: 'provice', label: '省份', type: 'select', options: [{label: '北京', value: 1}, {label: '上海', value: 2}, {label: '广州', value: 3},{label: '深圳', value: 4},{label: '武汉', value: 5},{label: '郑州', value: 6} ], require: true, remindText: '', nullText: '内容不为空', },
	{id: 'introduce', label: '简介', type: 'textarea', require: true, remindText: '', nullText: '内容不为空', maxLength: 100 },
	{id: 'img2', label: '个人相片', type: 'inputFile', require: true, remindText: '', nullText: '内容不为空', },
];

export default fields;
