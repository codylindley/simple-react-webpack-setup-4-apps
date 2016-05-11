import React from 'react';
import ReactDOM from 'react-dom';
import * as KendoReactButtons from '@telerik/kendo-react-buttons';
import '@telerik/kendo-react-buttons/dist/npm/css/main.css';
import { square, diag } from './math.js';
import './app.css';

console.log(square(11)); // 121
console.log(diag(4, 3)); // 5

class ButtonContainer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			disabled: false
		};
	}
	onClick = () => {
		this.setState({ disabled: !this.state.disabled });
	}
	render() {
		return (
			<div>
				<KendoReactButtons.Button onClick={this.onClick}>Button 1</KendoReactButtons.Button>
				<KendoReactButtons.Button disabled={this.state.disabled}>Button 2</KendoReactButtons.Button>
			</div>
		);
	}
}

ReactDOM.render(
	<div>
		<p>Button</p>
		<KendoReactButtons.Button>Button test</KendoReactButtons.Button>
		<p>Disabled Button</p>
		<KendoReactButtons.Button disabled>Button</KendoReactButtons.Button>
		<p>Primary Button</p>
		<KendoReactButtons.Button primary>Primary Button</KendoReactButtons.Button>
		<p>Button with icon</p>
		<KendoReactButtons.Button icon="refresh">Refresh</KendoReactButtons.Button>
		<p>Button with icon (imageUrl)</p>
		<KendoReactButtons.Button imageUrl="http://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png">Snowboarding</KendoReactButtons.Button>
		<p>Button with a custom icon (iconClass) [FontAwesome icon]</p>
		<KendoReactButtons.Button iconClass="fa fa-key fa-fw">FontAwesome icon</KendoReactButtons.Button>
		<p>Toggleable Button</p>
		<KendoReactButtons.Button togglable>Togglable button</KendoReactButtons.Button>
		<p>onClick event handler</p>
		<ButtonContainer />
	</div>,
	document.getElementById('app')
);
