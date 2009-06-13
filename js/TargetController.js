if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.TargetController = function (args) {
	this._target		= args.target			|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._availableTime	= args.availableTime	|| Clipperz.Base.exception.raise('MandatoryParameter');

//	MochiKit.Signal.connect(MochiKit.DOM.currentDocument(), 'onkeydown',	this, 'onkeydownHandler');
	MochiKit.Signal.connect(MochiKit.DOM.currentDocument(), 'onkeypress',	this, 'onkeypressHandler');

	this._deferredResult;

	return this;
};

Typist.TargetController.prototype = {
	__class__: Typist.TargetController,

	//-------------------------------------------------------------------------

	'clear': function () {
		MochiKit.Signal.disconnectAllTo(this);
	},

	//-------------------------------------------------------------------------

	'target': function () {
		return this._target;
	},

	//-------------------------------------------------------------------------

	'onkeypressHandler': function (anEvent) {
//console.log("onkeypressHandler", anEvent, anEvent.key());
console.log(anEvent.key()['string']);
		this.deferredResult().callback();
	},
	
//	'onkeydownHandler': function (anEvent) {
//console.log("onkeydownHandler", anEvent, anEvent.key());
//	},

	//-------------------------------------------------------------------------

	'deferredResult': function () {
		if (this._deferredResult == null) {
			this._deferredResult = new Clipperz.Async.Deferred("TargetController.deferredResult", {trace:true});
			this._deferredResult.addBothPass(MochiKit.Base.method(this, 'clear'));
		}
		
		return this._deferredResult;
	},

	//-------------------------------------------------------------------------

	'targetNode': function () {
		return MochiKit.DOM.getElement('target');
	},

	//-------------------------------------------------------------------------

	'placeTargetOnScreen': function () {
		//	matched
		//	currentTarget
		//	unmatched

		MochiKit.DOM.replaceChildNodes(this.targetNode(), [MochiKit.DOM.SPAN({'class':'matched'}, 'ab'), MochiKit.DOM.SPAN({'class':'currentTarget'}, 'c'), MochiKit.DOM.SPAN({'class':'unmatched'}, 'def')]);
		MochiKit.Visual.Move(this.targetNode(), {
			x:((MochiKit.Style.getViewportDimensions()['w'] - MochiKit.Style.getElementDimensions(this.targetNode())['w']) / 2),
//			x:0,
			y: 0,
			mode:'absolute',
			duration:0,
			queue:'break'
		});
		MochiKit.Style.setElementPosition(this.targetNode(), {
			x:((MochiKit.Style.getViewportDimensions()['w'] - MochiKit.Style.getElementDimensions(this.targetNode())['w']) / 2),
			y:0
		});
//		MochiKit.Visual.Move(this.targetNode(), {
//			x:((MochiKit.Style.getViewportDimensions()['w'] - MochiKit.Style.getElementDimensions(this.targetNode())['w']) / 2),
//			y: 0,
//			mode:'absolute',
//			duration:0
//		});
	},

	//-------------------------------------------------------------------------

	'dropTarget': function () {
		var maxY;
		
		maxY = MochiKit.Style.getViewportDimensions()['h'] - MochiKit.Style.getElementDimensions(this.targetNode())['h'] - 1;

		MochiKit.Visual.Move(this.targetNode(), {
			x:0,
			y:maxY,
			duration:5,
			transition:MochiKit.Visual.Transitions.parabolic,
			afterFinish:MochiKit.Base.method(this.deferredResult(), 'errback'),
			queue:'break'
		});
		
	},

	//-------------------------------------------------------------------------

	'run': function () {
		this.placeTargetOnScreen();
		this.dropTarget();
		
		return this.deferredResult();
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
