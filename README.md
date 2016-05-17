## Transform JSX/ES 2015 during development using Babel-core via Webpack

This setup involves using webpack and several loaders to transform JSX/ES 2015 to ES5 code. By using webpack JavaScript modules can be loaded using [ES 2015 module format](https://github.com/lukehoban/es6features#modules) (commonJS behind the scenes), properly transformed, then bundled.

We'll create this setup in seven steps. Or, follow the four steps below which uses a Github repo to speed up this setup.

1. [Clone/download](https://github.com/codylindley/simple-react-webpack-setup-4-apps) code
2. Follow step 1
3. Run npm install from the cloned directory
4. Follow last step

### Step 1: Verify Node.js and npm then install global packages

In this step make sure you have installed or have the most recent stable version of [Node.js and npm](https://nodejs.org/en/). Then run the following command to install [webpack](https://www.npmjs.com/package/webpack) and [browser-sync](https://www.browsersync.io/)  globally.

```
> npm install webpack browser-sync -g
```

You may need to use "sudo" to install the packages globally.

### Step 2: Create project directory and files

On your local file system create a directory with the following sub-directories and files.

```
├── build
├── index.html
├── package.json
├── src
│   ├── app.js
│   ├── app.css
│   └── math.js
└── webpack.config.js
```

Open the `package.json` file and place the following empty JSON object inside of it:

```
{}
```

### Step 3: Install npm devdependencies and dependencies

Open a command prompt from the root of the directory you created in step 2. Then run the following npm commands:

```
> npm install babel-core babel-loader babel-preset-es2015 babel-preset-react babel-preset-stage-0 browser-sync css-loader extract-text-webpack-plugin style-loader webpack --save-dev
```

Next run:

```
> npm install react react-dom @telerik/kendo-react-buttons --save
```

Running these two commands will install the necessary npm packages for this setup. The project directory `node_modules` folder should now contain the following npm packages:

```
├── build
├── index.html
├── node_modules
│   ├── @telerik
│   ├── babel-core
│   ├── babel-loader
│   ├── babel-preset-es2015
│   ├── babel-preset-react
│   ├── babel-preset-stage-0
│   ├── browser-sync
│   ├── css-loader
│   ├── extract-text-webpack-plugin
│   ├── react
│   ├── react-dom
│   ├── style-loader
│   └── webpack
├── package.json
├── src
│   ├── app.js
│   ├── app.css
│   └── math.js
└── webpack.config.js
```

### Step 4: Update app.js, app.css, math.js, and index.html

Open `app.js` and add the following to the file:

```
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
```

Open `app.css` and add the following to the file:

```
body{
	margin:50px;
}
```

Open math.js and add the following to the file:

```
export const sqrt = Math.sqrt;

export function square(x) {
    return x * x;
}
export function diag(x, y) {
    return sqrt(square(x) + square(y));
}
```

Open `index.html` and add the following to the file:

```
<!DOCTYPE html>
<html>
    <head>
		<title>webpack</title>
		 <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="./build/style.css">
    </head>
<body>
    <div id="app"></div>
	<script src="./build/appBundle.js"></script>
</body>
</html>
```

### Step 5: Update webpack.config.js

Open webpack.config.js and add the following to the file:

```
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: ['./src/app.js'],
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'appBundle.js'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract("style-loader", "css-loader")
		}, {
			loader: 'babel-loader',
			exclude: /node_modules/,
			test: /\.js$/,
			query: {
				presets: ['es2015', 'react', 'stage-0'],
			},
		}]
	},
	plugins: [
		new ExtractTextPlugin("style.css", {
			allChunks: true
		})
	]
};
```

### Step 6: Update package.json

Open the package.json file which should look something like this:

```
{
  "devDependencies": {
    "babel-core": "^6.8.0",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "browser-sync": "^2.12.7",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "style-loader": "^0.13.1",
    "webpack": "^1.13.0"
  },
  "dependencies": {
    "@telerik/kendo-react-buttons": "^0.1.0",
    "react": "^15.0.2",
    "react-dom": "^15.0.2"
  }
}
```

Add the following scripts configurations to the `package.json` file.

```
{
  "scripts": {
    "webpack": "webpack --watch",
    "server": "browser-sync --port 4000 start --server --files \"**/*.html\" \"build/**/*.css\" \"build/**/*.js\" "
  },
  "devDependencies": {
    "babel-core": "^6.8.0",
    "babel-loader": "^6.2.4",
    "babel-preset-es2015": "^6.6.0",
    "babel-preset-react": "^6.5.0",
    "babel-preset-stage-0": "^6.5.0",
    "browser-sync": "^2.12.7",
    "css-loader": "^0.23.1",
    "extract-text-webpack-plugin": "^1.0.1",
    "style-loader": "^0.13.1",
    "webpack": "^1.13.0"
  },
  "dependencies": {
    "@telerik/kendo-react-buttons": "^0.1.0",
    "react": "^15.0.2",
    "react-dom": "^15.0.2"
  }
}
```

### Step 7: Run webpack and server

From the root of the setup directory open a command prompt and run the following npm command

```
> npm run webpack
```

Next, open another new command prompt and run the following npm command

```
> npm run server
```

Both of these commands will continue to run while developing.

If you followed all the steps correctly Browser Sync should have open a browser running the `index.html` file and `app.js` file at [http://localhost:4000](http://localhost:4000). Both webpack and Browser Sync have been configured to re-run when changes are made.
