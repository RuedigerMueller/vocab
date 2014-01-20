sap.ui.jsview("vocab-web.quiz", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf vocab-web.quiz
	*/ 
	getControllerName : function() {
		return "vocab-web.quiz";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf vocab-web.quiz
	*/ 
	createContent : function(oController) {
		// button 
		var oButton = new sap.ui.commons.Button({
			id : 'ButtonId',
			text : "{i18n>FINISH}",
			press : function() {oController.back();}
		});
		return oButton;
	}

});
