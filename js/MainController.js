if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.MainController = function (args) {
	
	return this;
};

Typist.MainController.prototype = {
	__class__: Typist.MainController,

	//-------------------------------------------------------------------------

	'dropTarget': function () {
		var deferredResult;
		var	target;
		var targetController;

		target = new Typist.Target({value:'ciao'});
		targetController = new Typist.TargetController({target:target, availableTime:10});
		
		deferredResult = new Clipperz.Async.Deferred("Typist.MainController.dropTarget", {trace:true});
		deferredResult.addMethod(targetController, 'run');
		deferredResult.addMethod(this, 'dropTarget');
		deferredResult.callback('go');

		return deferredResult;
	},

	//-------------------------------------------------------------------------

	'run': function () {
//console.log(">>> run");
		this.dropTarget();
	},

	//-------------------------------------------------------------------------
    'toString': MochiKit.Base.forwardCall("repr")
};
