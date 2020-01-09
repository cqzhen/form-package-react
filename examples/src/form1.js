import React from 'react';
import Form from 'form-package-react';
import data from './fields';

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
