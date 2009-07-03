if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Lesson = function (args) {
	this._title = args.title;
	this._tests = args.tests;
	
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

	'run': function () {
console.log("RUN - " + this.title());
		return MochiKit.Async.succeed();
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
