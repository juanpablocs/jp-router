/**
 * @author Juan Pablo <juanpablocs21@gmail.com>
 * @description valid router index => /
 **/

var Routes = require('./../lib/routes');

var expect = "/";
var value = "/";
var count = 0;

var routerTest = new Routes().test(expect, value);

describe("Test url Router " + expect, function() {
  it("should boolean expect " + value + " => true", function() {
  	routerTest.regex.should.be.true();
  });
  it("should count expect " + value + " => " + count + " values", function() {
  	routerTest.values.length.should.equal(count);
  });
});
