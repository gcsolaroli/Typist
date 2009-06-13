if (typeof(Clipperz) == 'undefined') { Clipperz = {}; }
if (typeof(Clipperz.Visual) == 'undefined') { Clipperz.Visual = {}; }

Clipperz.Visual.VERSION = "0.1";
Clipperz.Visual.NAME = "Clipperz.Visual";

MochiKit.Base.update(Clipperz.Visual, {

	//-------------------------------------------------------------------------

	'__repr__': function () {
		return "[" + this.NAME + " " + this.VERSION + "]";
	},

	//-------------------------------------------------------------------------

	'toString': function () {
		return this.__repr__();
	},

	//-------------------------------------------------------------------------

	'deferredResize': function (anElement, someOptions) {
		var deferredResult;
		var moveTransition;
		var scaleTransition;
		var duration;
		
		duration = someOptions.duration || 0.5;

		deferredResult = new Clipperz.Async.Deferred("Visual.deferredResize", {trace:false});

		moveTransition	= MochiKit.Visual.Transitions.linear;	//MochiKit.Visual.Transitions.sinoidal;
		scaleTransition	= MochiKit.Visual.Transitions.linear;	//MochiKit.Visual.Transitions.sinoidal;

		MochiKit.Style.setElementPosition(anElement, {x:someOptions.from.position.x, y:someOptions.from.position.y }, 'px');

		new MochiKit.Visual.Parallel([
			new MochiKit.Visual.Move(anElement, {x:someOptions.to.position.x, y:someOptions.to.position.y, mode:'absolute', transition:moveTransition, sync:true}),
			new Clipperz.Visual.Resize(anElement, {fromSize:{h:someOptions.from.dimensions.h, w:someOptions.from.dimensions.w}, toSize:{h:someOptions.to.dimensions.h, w:someOptions.to.dimensions.w}, transition:scaleTransition, scaleContent:false, scaleFromCenter:false, restoreAfterFinish:true, sync:true})
		], {duration:duration, afterFinish:MochiKit.Base.method(deferredResult, 'callback')})

		deferredResult.addCallback(MochiKit.Async.succeed, arguments[arguments.length - 1]);

		return deferredResult;
	},

	//-------------------------------------------------------------------------

	'deferredAnimation': function (anAnimation, someParameters, someOptions) {
		var	deferredResult;
		var afterFinishCallback;
		
		deferredResult = new Clipperz.Async.Deferred("Clipperz.Visual.deferredAnimation", {trace:false});

		if (MochiKit.Base.isUndefinedOrNull(someOptions)) {
			someOptions = {}
		}
		
		if (MochiKit.Base.isUndefinedOrNull(someOptions['afterFinish'])) {
			someOptions['afterFinish'] = MochiKit.Base.noop;
		}

		MochiKit.Base.update(someOptions, {
			'afterFinish': MochiKit.Base.compose(someOptions['afterFinish'], MochiKit.Base.method(deferredResult, 'callback'))
		});

		new anAnimation(someParameters, someOptions);

		return deferredResult;
	},

	//-------------------------------------------------------------------------
	__syntaxFix__: "syntax fix"

});

//#############################################################################

/** @id Clipperz.Visual.Resize */
Clipperz.Visual.Resize = function (element, percent, options) {
	var cls = arguments.callee;
	if (!(this instanceof cls)) {
		return new cls(element, percent, options);
	}
	this.__init__(element, percent, options);
};

Clipperz.Visual.Resize.prototype = new MochiKit.Visual.Base();

MochiKit.Base.update(Clipperz.Visual.Resize.prototype, {
	__class__ : Clipperz.Visual.Resize,

	__init__: function (element, options) {
		this.element = MochiKit.DOM.getElement(element);
		options = MochiKit.Base.update({
			scaleX: true,
			scaleY: true,
			scaleContent: true,
			scaleFromCenter: false,
			scaleMode: 'box',  // 'box' or 'contents' or {} with provided values
            syntax_fix: 'syntax fix'
		}, options);

		this.start(options);
	},

	setup: function () {
		this.restoreAfterFinish = this.options.restoreAfterFinish || false;
		this.elementPositioning = MochiKit.Style.getStyle(this.element, 'position');

		var ma = MochiKit.Base.map;
		var b = MochiKit.Base.bind;
		this.originalStyle = {};
		ma(b(function (k) { this.originalStyle[k] = this.element.style[k]; }, this), ['top', 'left', 'width', 'height', 'fontSize']);

		this.originalTop = this.element.offsetTop;
		this.originalLeft = this.element.offsetLeft;

		var fontSize = MochiKit.Style.getStyle(this.element, 'font-size') || '100%';
		ma(b(function (fontSizeType) {
			if (fontSize.indexOf(fontSizeType) > 0) {
				this.fontSize = parseFloat(fontSize);
				this.fontSizeType = fontSizeType;
			}
		}, this), ['em', 'px', '%']);

		this.factor = 1;

		this.dims = [this.options.fromSize.h, this.options.fromSize.w];
	},

	update: function (position) {
		this.setDimensions(	(this.options.toSize.h - this.options.fromSize.h) * position + this.options.fromSize.h,
							(this.options.toSize.w - this.options.fromSize.w) * position + this.options.fromSize.w);
	},

	finish: function () {
		if (this.restoreAfterFinish) {
			MochiKit.Style.setStyle(this.element, this.originalStyle);
		}
	},

	setDimensions: function (height, width) {
		var d = {};
		var r = Math.round;
		if (/MSIE/.test(navigator.userAgent)) {
			r = Math.ceil;
		}
		if (this.options.scaleX) {
			d.width = r(width) + 'px';
		}
		if (this.options.scaleY) {
			d.height = r(height) + 'px';
		}
		if (this.options.scaleFromCenter) {
			var topd = (height - this.dims[0])/2;
			var leftd = (width - this.dims[1])/2;
			if (this.elementPositioning == 'absolute') {
				if (this.options.scaleY) {
					d.top = this.originalTop - topd + 'px';
				}
				if (this.options.scaleX) {
					d.left = this.originalLeft - leftd + 'px';
				}
			} else {
				if (this.options.scaleY) {
					d.top = -topd + 'px';
				}
				if (this.options.scaleX) {
					d.left = -leftd + 'px';
				}
			}
		}
		MochiKit.Style.setStyle(this.element, d);
	}
});


