# Guide to Adulting frontend

This is built using React and other awesome web component stuff, so it's probably new to what you're used to. If you want to get your hands dirty, read on.

What you need to know!

## Build Spec
This project uses the following items to be awesome

 * ReactJS
 * Babel 6
 * WebPack
 * NPM
 * PubSub
 * Redis
 * Node
 * Express
 * LoDash

We suggest reading up on all of those things at some point in the project to encourage speedy development

## Before you start
Once you've cloned this repo you'll need to run `npm install` to gather all of the dependencies.
It's also worth looking inside the `package.json` to check all of the npm tasks which you can run.

`npm start` is the task to get everything running locally. To view in your browser visit localhost:3002

Install redis `brew install redis` on a mac `apt-get install redis-server` on Ubuntu.

Install flow `brew update && brew install flow` and the npm wrapper `npm install flow-bin --global`.

## File Naming Conventions
All JS files to be named using camelCase with a lowercase first letter. All class declarations inside these files to be CamelCase beginning with an uppercase letter.

## How it's structured
The main parts of a flux and react set-up are the Views, Actions, Stores
we will cover the struction in relation to them.

The Views in our case are react components. React begins it's rendering at a
single root component which begins the nesting of other components. For our case
the react-router provides the root element `<Handler />` from within it's run method.

Both the server and the client render the Router via it's run method:

```
Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler />, document.getElementById('app'));
});
```

The above snippet can be found in `src/client/entry.js`.

Here the `Router` is running and using the pre-defined `routes` to determine which
route to render. The `HistoryLocation` tells it to use clean URIs rather than
`#/hasbangs` when determining it's location, . The router gets the `<Handler />`
component from within the `routes`. Looking inside `src/shared/routes.js` the
first `<Route >` element has a handler prop, this is our app.

app.js: `src/shared/app.js`

The app has the `Router.State` mixin, this gives it access to the active route
path. This information can be used to determin which sub components to render and
so on within the sup component's own render methods.


## JSX Templates
Read this: https://facebook.github.io/react/docs/jsx-in-depth.html

## npm commands

**`npm start`**

Runs the development webpack and node servers.
The site can be accessed on `http://localhost:3002`, or set your own port in your
`/script/local.sh` file.
The webpack server runs on `http://localhost:8080` making hot loading accessible
to the client app. You shouldn't need to access the webpack server otherwise.

**`npm run deploy`**
