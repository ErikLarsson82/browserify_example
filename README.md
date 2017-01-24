# Transpile bug
A repo reproducing a transpiling bug I'm trying to investigate and solve!

Edit: solution!
======
So, I found a solution the Box2D lib, namely that it does this to Object:

`Object.defineProperty = function(obj, p, cfg) {
  if(cfg.get instanceof Function)
    obj.__defineGetter__(p, cfg.get);
  if(cfg.set instanceof Function)
    obj.__defineSetter__(p, cfg.set);
}`

Removing this solves the problem. I also found a newer version of box2d as npm package [here](https://www.npmjs.com/package/box2dweb) where that part of the code is explicitly removed aswell.

Context
======
Basically, I want to write ES6 code (class, let, const) and transpile it using [Babel](https://babeljs.io/) to ES5 in order to run on specific devices. I also want to bundle the dependencies using [Browserify](http://browserify.org/).
In my example, I have two custom classes and one external lib. Now, the interesting thing is that the _order_ when doing require matters for the behaviour of the code.

Now, there is 3 different outcomes:
1. The (intermediate value) error
------
This one occurs when I require the Box2D module first. So my first question is, how can the code in this module affect the code in Kurt.js and Farmor.js?

2. Wrong inheritance-behaviour
------
This one occurs when I require the files in this order: Kurt -> Box2D -> Farmor. Now, the correct behaviour of the class Farmor is to overwrite the init function and supply a new one. But, when requiring the modules in this order, the init-function prints "kurt", ie is running the base-class function erroneusly.

3. The correct order
-----
In the order Kurt -> Farmor -> Box2D the class behaviour is as expected. Farmor().init() prints "farmor" as intended. All good and well, right? Well, no. Since at some point I'll want to include the Box2D-lib and after that include more custom classes, but these will then display the wrong behaviour as above.
