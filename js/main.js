
function run() {
	var	mainController;
	
	mainController = new Typist.MainController();
	mainController.run();
}

MochiKit.DOM.addLoadEvent(run);
