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
			if (this.currentTestIndex() < Typist.Lessons['data'][this.currentLessonIndex()].length - 1) {
				this._currentTestIndex ++
			} else if (this.currentLessonIndex() < Typist.Lessons[data].length - 1) {
				this._currentLessonIndex ++;
				this._currentTestIndex = 0;
			} else {
				this._currentLessonIndex = 0;
				this._currentTestIndex = 0;
			}
		}

		return Typist.Lessons[data][this.currentLessonIndex()][this.currentTestIndex()]
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

	'populateInitialLessonSelectOptions': function () {
		MochiKit.Iter.forEach(Typist.Lessons.lessons(), function (aLesson) {
			MochiKit.DOM.appendChildNodes(MochiKit.DOM.getElement('initialLessonSelect'), MochiKit.DOM.OPTION({
				'value':aLesson.title()
			}, aLesson.title()))
		})
	},

	//-------------------------------------------------------------------------

	'showSplashScreen': function () {
		MochiKit.Style.showElement('splashScreen');
		this.populateInitialLessonSelectOptions();
		MochiKit.Signal.connect(MochiKit.DOM.getElement('startButton'),	  'onclick',  this, 'startEventHandler');
		MochiKit.Signal.connect(MochiKit.DOM.getElement('initialLesson'), 'onsubmit', this, 'startEventHandler');
	},

	//-------------------------------------------------------------------------

	'startEventHandler': function (anEvent) {
		var selectedLesson;
		
		anEvent.preventDefault();
		selectedLesson = Typist.Lessons.lessonWithTitle(MochiKit.DOM.getElement('initialLessonSelect').value);
		
		this.start(selectedLesson);
	},

	//-------------------------------------------------------------------------

	'readySteadyGoAnimation': function () {
		var deferredResult;
		var transitionDuration;
		
		MochiKit.Style.hideElement('ready');
		MochiKit.Style.hideElement('steady');
		MochiKit.Style.hideElement('go');

		MochiKit.Style.showElement('readySteadyGo');

		transitionDuration = 0.2;

		deferredResult = new Clipperz.Async.Deferred("readySteadyGoAnimation", {trace:true});
		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.appear, 'ready',  {from:0.0, to:1.0, duration:transitionDuration});
		deferredResult.addCallback(MochiKit.Async.wait, 0.7);
		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.fade,	  'ready',  {from:1.0, to:0.0, duration:transitionDuration});

		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.appear, 'steady', {from:0.0, to:1.0, duration:transitionDuration});
		deferredResult.addCallback(MochiKit.Async.wait, 1.0);
		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.fade,	  'steady', {from:1.0, to:0.0, duration:transitionDuration});

		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.appear, 'go',     {from:0.0, to:1.0, duration:transitionDuration});
		deferredResult.addCallback(MochiKit.Async.wait, 1.5);
		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.fade,	  'go',     {from:1.0, to:0.0, duration:transitionDuration});
		deferredResult.addCallback(MochiKit.Style.hideElement, 'readySteadyGo');

		deferredResult.callback();
		
		return deferredResult;
		
	},

	//-------------------------------------------------------------------------

	'start': function (aLesson) {
		var deferredResult;

		deferredResult = new Clipperz.Async.Deferred("start");
		deferredResult.addCallback(Clipperz.Visual.deferredAnimation, MochiKit.Visual.fade, 'splashScreen', {from:1.0, to:0.0, duration:0.5}),
		deferredResult.addMethod(this, 'readySteadyGoAnimation');
		deferredResult.addMethod(aLesson, 'run');
		
		deferredResult.callback();
//		this.readySteadyGoAnimation();
		
		return deferredResult;
	},

	//-------------------------------------------------------------------------
	
	'run': function () {
		MochiKit.Iter.forEach(MochiKit.Selector.findDocElements('body > div'), MochiKit.Style.hideElement);

		this.showSplashScreen();
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
