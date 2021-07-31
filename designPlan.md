# Refactor code suing container and presentational components:

## seperation of concern (SoC)
    logic goes in containers
    view goes in presentational components

This will allow us to test logic seperated from views (regular JS tests || react component test)

## Best practices found in [this article](https://areknawo.com/separation-of-concerns-with-custom-react-hooks/): 

* Only apply this tactic if your component's logic takes >10 lines or has a lot of smaller hook calls;
* Put your hook in a separate file, which ideally should have no JSX in it (`.js` vs .jsx files);
* Keep your naming consistent - e.g. hook in logic.js or hook.js (with appropriate hook naming as well, e.g. useComponentNameLogic()) and the component itself in view.jsx or index.jsx under a single folder, with optional index.js file (if it isn't reserved for the component already) for re-exporting the necessary bits;
* Keep only the simplest callbacks and event listeners in the JSX file, and move the rest to the hook;
* If using CSS-in-JS library that deals with hooks (e.g. useStyles()) then place it in a separate file, or at the top of the component file if it's not too big;
* Remember to organize your hook's code correctly - separate some of it to outer functions, and maybe even smaller hooks, if the logic is reused across different components.