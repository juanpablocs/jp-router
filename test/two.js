/**
 * @author Juan Pablo <juanpablocs21@gmail.com>
 * @description valid router index
 **/

var Routes = require('./../lib/routes');

var expect = '/:user/notifications';
var value = '/juan/notifications';
var count = 1;

var routerTest = new Routes().test(expect, value);

describe("Test url Router "+expect, function() {
  it("should boolean expect " + expect + " => true", function() {
  	routerTest.regex.should.be.true();
  });
  it("should count expect " + expect + " => " + count + " values", function() {
  	routerTest.values.length.should.equal(count);
  });
});
