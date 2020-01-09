import React from 'react';
import data from './fields';
import Form from './../../src/index';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this)
  }

  render() {
    return (
			<div className="App" style={sectionCss}>
    	  <header className="App-header">
					<Form data={data || []} submit={this.submit.bind(this)}></Form>
    	  </header>
    	</div>
    )
  }

	submit(data) {
		console.log('text:', '我是例子。');
		console.log('data:', data);
	}

}

export default App;
