import React from 'react';
import ReactDOM from 'react-dom';
import App from 'form-package-react';
import data from './fields';

ReactDOM.render(<App data={data || []}/>, document.getElementById('root'));
