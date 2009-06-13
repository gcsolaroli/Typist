if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Target = function (args) {
	this._value					= args.value	|| Clipperz.Base.exception.raise('MandatoryParameter');
	this._matchPrefixSize		= 0;
	this._currentTargetIndex	= 0;
	
	return this;
};

Typist.Target.prototype = {
	__class__: Typist.Target,

	//-------------------------------------------------------------------------

	'value': function () {
		return this._value;
	},
	
	//-------------------------------------------------------------------------

	'matchPrefixSize': function () {
		return this._matchPrefixSize;
	},
	
	//-------------------------------------------------------------------------

	'currentTargetIndex': function () {
		return this._currentTargetIndex;
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
