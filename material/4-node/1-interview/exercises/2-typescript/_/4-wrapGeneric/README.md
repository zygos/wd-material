## Function Wrapper

Now we will try to write a function wrapper. Function wrappers take in a function and return a new function that adds some kind of functionality to the original function. This is a common pattern in TypeScript and JavaScript in general.

Before we can add new functionality wrapping a function, we need to first be able to write a pass-through wrapper which does nothing but call the original function.

The idea is to write a function which can add new behaviour while calling the original function and preserving its return value. This is a building block for more advanced functionality.
