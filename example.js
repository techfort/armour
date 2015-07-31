"use strict";
var armour = require('./index'),
  assert = require('assert');

var o = {
  name: 'joe',
  test: function () {
    return o.name;
  }
};

function change(obj) {
  obj.name = 'changed';
  obj.test = function () {
    return 1;
  };
  return obj;
}

var armouredChange = armour.protect(change);
var p = armouredChange(o);
console.log('Should not have changed', o, p);
assert.notEqual(o, p);

var q = change(o);
assert.equal(o, q);
console.log('Should have changed', o, q);


var arr = [1, 2, 3];

function mul(arr, val) {
  var i = 0,
    len = arr.length;
  for (i; i < len; i += 1) {
    arr[i] = arr[i] * val;
  }
  return arr;
}

function s_e(array) {
  array[0] = 666;
}

s_e(arr);

console.log('S-E', arr);

console.log('Before side-effect function', arr);
var brr = mul(arr, 3);
console.log('After side-effect function', arr, brr);

var armouredMul = armour.protect(mul);
console.log('Before side-effect function', arr);
var crr = armouredMul(arr, 3);
console.log('After side-effect function', arr, crr);

var a = {
  mul: mul
};

var b = armour.protectObject(a);
console.log('protected obj', b);
console.log('Before side-effect function', arr);
var drr = b.mul(arr, 3);
console.log('After side-effect function', arr, drr);
