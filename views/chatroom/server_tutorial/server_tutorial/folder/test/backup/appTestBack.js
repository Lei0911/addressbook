// const assert = require('chai').assert;
// const app = require('../app');

// describe('App', function(){
	// it('app should return hello', function(){
		// assert.equal(app(), 'hello');
	// });
// });



const assert = require('chai').assert;
//const sayHello = require('../app').sayHello;
//const addNumbers = require('../app').addNumbers;
const app = require('../app');

sayHelloResult = app.sayHello();
addNumbersRestult = app.addNumbers(5,5);

describe('App', function(){
	describe('sayHello', function(){
		it('sayHello should return hello', function(){
		//let result = app.sayHello();
		assert.equal(sayHelloResult, 'hello');
	});
	
	it('sayHello should return type string', function(){
		//let result = app.sayHello();
		assert.typeOf(sayHelloResult, 'string');
	});
	});
	// it('sayHello should return hello', function(){
		// //let result = app.sayHello();
		// assert.equal(sayHelloResult, 'hello');
	// });
	
	// it('sayHello should return type string', function(){
		// //let result = app.sayHello();
		// assert.typeOf(sayHelloResult, 'string');
	// });
	
	describe('addNumbers()', function(){
		it('addNumbers should be above 5', function(){
		//let result = app.addNumbers(5,5);
		assert.isAbove(addNumbersRestult,5);
	});
	
	it('addNumbers should type of number', function(){
		//let result = app.addNumbers(5,5);
		assert.typeOf(addNumbersRestult, 'number');
	});
	});
	// it('addNumbers should be above 5', function(){
		// //let result = app.addNumbers(5,5);
		// assert.isAbove(addNumbersRestult,5);
	// });
	
	// it('addNumbers should type of number', function(){
		// //let result = app.addNumbers(5,5);
		// assert.typeOf(addNumbersRestult, 'number');
	// });
});