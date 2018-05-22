const assert = require('chai').assert;
// const sayHello = require('../app').sayHello;
// const addNumbers = require('../app').addNumbers;
const app = require('../app');
var messageSample = {user:"A",room:"B", message:"C"};

messageSampleResult = app.messageSample();
// sayHelloResult = app.sayHello();
// addNumbersResult = app.addNumbers(5,5);
//messageSampleTextResult = app.messageSampleText();

var validatePhoneNumber = require("./validate");

// describe.skip("phone numbers testing", ()=>{
    // test("a valid phone number", ()=>{
        // expect(validatePhoneNumber("7781234567")).toBe("7781234567"); 
    // });
describe.skip("messageSample testing", ()=>{
    test("a valid messageSample", ()=>{
        expect(messageSample({user:"A",room:"B", message:"C"})).toBe({user:"A",room:"B", message:"C"}); 
    });





// describe('App', function(){
	
	// describe('messageSample', function(){
		// it('messageSample should return chatMessage', function(){
		// // let result = app.sayHello();
		// assert.equal(messageSampleResult, '{user:"A",room:"B", message:"C"}');
	// });
	
	// it('messageSample should return type array', function(){
		// // let result = app.sayHello();
		// assert.typeOf(messageSampleResult, 'array');
	// });
	// });	
	
	
	
	
	
	// describe('sayHello', function(){
		// it('sayHello should return hello', function(){
		//let result = app.sayHello();
		// assert.equal(sayHelloResult, 'hello');
	// });
	
	// it('sayHello should return type string', function(){
		//let result = app.sayHello();
		// assert.typeOf(sayHelloResult, 'string');
	// });
	// });
	
	
	// describe('addNumbers()', function(){
		// it('addNumbers should be above 5', function(){
		//let result = app.addNumbers(5,5);
		// assert.isAbove(addNumbersResult,5);
	// });
	
	// it('addNumbers should type of number', function(){
		//let result = app.addNumbers(5,5);
		// assert.typeOf(addNumbersResult, 'number');
	// });
	// });

	
});