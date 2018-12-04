const Enzyme = require('enzyme')
const EnzymeAdapter = require('enzyme-adapter-react-16')

// Global configuration of the enzyme adapter for React 16
// http://airbnb.io/enzyme/docs/installation/#working-with-react-16
Enzyme.configure({ adapter: new EnzymeAdapter() })

// HOCs outputs errors if in dev
global.PRODUCTION = false;

// Some components call CSS.supports(property, value)
global.CSS = undefined;
