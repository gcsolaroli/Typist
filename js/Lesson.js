if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Lesson = function (args) {
	this._title = args.title;
	this._tests = args.tests;

	this._currentTest = -1;

	return this;
};

Typist.Lesson.prototype = {
	__class__: Typist.Lesson,

	//-------------------------------------------------------------------------

	'title': function () {
		return this._title;
	},
	
	//-------------------------------------------------------------------------

	'tests': function () {
		return this._tests;
	},

	//-------------------------------------------------------------------------

	'nextTarget': function () {
		var result;
		
		this._currentTest ++;
		
		if (this._currentTest < this.tests().length) {
//console.log("currentTest", this._currentTest)
//console.log("TESTS", this.tests());
			result = new Typist.Target({value:this.tests()[this._currentTest], availableTime:5});
		} else {
			throw "NO MORE";
		}
		
		return result;
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
