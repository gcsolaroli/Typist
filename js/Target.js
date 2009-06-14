if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Target = function (args) {
	this._value					= args.value	|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._currentTargetIndex	= 0;
//	this._node					= null;
	
	return this;
};

Typist.Target.prototype = {
	__class__: Typist.Target,

	//-------------------------------------------------------------------------

	'value': function () {
		return this._value;
	},
	
	//-------------------------------------------------------------------------

	'currentTargetIndex': function () {
		return this._currentTargetIndex;
	},

	//-------------------------------------------------------------------------
/*
	'node': function () {
		if (this._node == null) {
			this._node = MochiKit.DOM.DIV({'class':'target'});
			MochiKit.DOM.replaceChildNodes(MochiKit.DOM.getElement('targets'), this._node);
		}
		
		return this._targetNode;
	},
*/
	//-------------------------------------------------------------------------

	'domElements': function () {
		return [
			MochiKit.DOM.SPAN({'class':'matched'},			this.value().substring(0, this.currentTargetIndex())),
			MochiKit.DOM.SPAN({'class':'currentTarget'},	this.value().charAt(this.currentTargetIndex())),
			MochiKit.DOM.SPAN({'class':'unmatched'},		this.value().substring(this.currentTargetIndex() + 1))
		];
	},

	//-------------------------------------------------------------------------

	'handleKey': function (aKey) {
		if (this.value().charAt(this.currentTargetIndex()) == aKey) {
			this._currentTargetIndex ++
		}
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
