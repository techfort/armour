# Armour

A micro-module to prevent side-effects.

(Utilizes [deep-copy](https://developer.mozilla.org/en-US/docs/Web/Guide/API/DOM/The_structured_clone_algorithm))

# why?

Side-Effects are evil. Protect your functions from the bane of side-effects with `armour`, the paladin of JS functions.

# what's a side-effect?

Quoting wikipedia: "In computer science, a function or expression is said to have a side effect if, in addition to returning a value, it also modifies some state or has an observable interaction with calling functions or the outside world."

# hey! JS is pass-by-value

Yes, but JS does pass-by-value of a reference for non-primitive types, hence why - while JS technically is not a pass-by-reference language - the result is the same as a pass-by-reference... I believe I read something about [call-by-sharing](https://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)

And who cares! all that matter is that if you do:

```javascript
var o = { name: 'joe'};
function change(obj) {
  o.name = 'changed';
}
change(o); // o.name is now 'changed'
```

your object is busted.

JavaScript is susceptible to side-effects because it is possible to modify variables outside of a function's scope (something that is very useful when using closures, if you know what you're doing), and because of call-by-value/sharing/mood behaviour.

For example, your junior developer has developed this beauty:

```javascript
function mul(arr, val) {
  var i = 0,
    len = arr.length;
  for (i; i < len; i += 1) {
    arr[i] = arr[i] * val;
  }
  return arr;
}
```

after appropriate corporal punishment of the developer in question, you decide to prevent the original array from being ruined by inexperienced/ insane / sado-masochist developers.

# Usage
```javascript
var armour = require('armour');
var safeMul = armour.protect(mul); // that piece of genius code above
```

now if you have an array `var a = [1, 2, 3];` and pass it into `mul`:
```javascript
var b = mul(a, 3); // a and b are now [3, 6, 9]
var c = safeMul(b, 3); // b is [3, 6, 9] and c is [9, 18, 27]
```

You can also protect an entire object with `protectObject`: this means you can pass an object and if any of its properties are functions, they will be protected so they don't cause side effects:
```javascript
var o = { mul: mul }; // re-utilizing the code-of-the-century function above
var protected = armour.protectObject(o); // now protected.mul is side-effects-safe
```
