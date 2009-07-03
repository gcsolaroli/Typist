if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.MainController = function (args) {
	this._currentLessonIndex	= -1;
	this._currentTestIndex		= 0;

	return this;
};

Typist.MainController.prototype = {
	__class__: Typist.MainController,

	//-------------------------------------------------------------------------

	'currentLessonIndex': function () {
		return this._currentLessonIndex;
	},
	
	'currentTestIndex': function () {
		return this._currentTestIndex;
	},
	
	//-------------------------------------------------------------------------

	'nextTarget': function () {
		if (this.currentLessonIndex() == -1) {
			this._currentLessonIndex = 0;
		} else {
			if (this.currentTestIndex() < Typist.Lessons[this.currentLessonIndex()].length - 1) {
				this._currentTestIndex ++
			} else if (this.currentLessonIndex() < Typist.Lessons.length - 1) {
				this._currentLessonIndex ++;
				this._currentTestIndex = 0;
			} else {
				this._currentLessonIndex = 0;
				this._currentTestIndex = 0;
			}
		}

		return Typist.Lessons[this.currentLessonIndex()][this.currentTestIndex()]
	},

	//-------------------------------------------------------------------------

	'dropTarget': function () {
		var deferredResult;
		var	target;
		var targetController;

		target = new Typist.Target({value:this.nextTarget()});
		targetController = new Typist.TargetController({target:target, availableTime:10});
		
		deferredResult = new Clipperz.Async.Deferred("Typist.MainController.dropTarget", {trace:true});
		deferredResult.addMethod(targetController, 'run');
		deferredResult.addMethod(this, 'dropTarget');
		deferredResult.callback('go');

		return deferredResult;
	},

	//-------------------------------------------------------------------------

	'run': function () {
		this.dropTarget();
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
