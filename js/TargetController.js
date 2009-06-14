if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.TargetController = function (args) {
	this._target		= args.target			|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._availableTime	= args.availableTime	|| Clipperz.Base.exception.raise('MandatoryParameter');

	MochiKit.Signal.connect(MochiKit.DOM.currentDocument(),	'onkeypress',	this, 'onkeypressDocumentHandler');

	this._deferredResult	= null;
//	this._targetNode		= null;

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

	'onkeypressDocumentHandler': function (anEvent) {
		this.target().handleKey(anEvent.key()['string']);
	},

	//-------------------------------------------------------------------------

	'deferredResult': function () {
		if (this._deferredResult == null) {
			this._deferredResult = new Clipperz.Async.Deferred("TargetController.deferredResult", {trace:true});
			this._deferredResult.addBothPass(MochiKit.Base.method(this, 'clear'));
		}
		
		return this._deferredResult;
	},

	//-------------------------------------------------------------------------
/*
	'targetNode': function () {
		if (this._targetNode == null) {
			MochiKit.DOM.replaceChildNodes(MochiKit.DOM.getElement('targets'), MochiKit.DOM.DIV({'class':'target'}));
			this._targetNode = MochiKit.Selector.findChildElements(MochiKit.DOM.getElement('targets'), ['.target'])[0];
		}
		
		return this._targetNode;
	},
*/
	//-------------------------------------------------------------------------

	'placeTargetOnScreen': function () {
		this.target().update();
		MochiKit.Style.setElementPosition(this.target().node(), {
			x:((MochiKit.Style.getViewportDimensions()['w'] - MochiKit.Style.getElementDimensions(this.target().node())['w']) / 2),
			y:0
		});
	},

	//-------------------------------------------------------------------------

	'dropTarget': function () {
		var maxY;
		
		maxY = MochiKit.Style.getViewportDimensions()['h'] - MochiKit.Style.getElementDimensions(this.target().node())['h'] - 1;

		MochiKit.Visual.Move(this.target().node(), {
			x:0,
			y:maxY,
			duration:5,
			transition:MochiKit.Visual.Transitions.parabolic,
			afterFinish:MochiKit.Base.method(this.deferredResult(), 'errback'),
			queue:'replace'
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
