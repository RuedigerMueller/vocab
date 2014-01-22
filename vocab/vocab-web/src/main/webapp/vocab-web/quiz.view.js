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
		// Text element for "known Language"
		var oLabel = new sap.ui.commons.Label({
			id: "knownQuizID",
			text: "Testing",
		});
		
		var oTextField =  new sap.ui.commons.TextField({
			id: "learnedQuizID",
			value: "",
		});
		
		// button Display
		var oDisplayButton = new sap.ui.commons.Button({
			id : 'displayButtonId',
			text : "{i18n>DISPLAY}",
			press : function() {oController.display();}
		});
		
		// button Correct
		var oCorrectButton = new sap.ui.commons.Button({
			id : 'correctButtonId',
			text : "{i18n>CORRECT}",
			press : function() {oController.correct();}
		});
		
		// button Wrong
		var oWrongButton = new sap.ui.commons.Button({
			id : 'wrongButtonId',
			text : "{i18n>WRONG}",
			press : function() {oController.wrong();}
		});
		
		// button Finish
		var oFinishButton = new sap.ui.commons.Button({
			id : 'finishButtonId',
			text : "{i18n>FINISH}",
			press : function() {oController.back();}
		});
		
		var oHorizontalLayout =  new sap.ui.layout.HorizontalLayout({
			id : 'quizHorizontalLayoutID',
			content: [oDisplayButton, oCorrectButton, oWrongButton, oFinishButton ],
		});
		
		var oVerticalLayout =  new sap.ui.layout.VerticalLayout({
			id : 'quizVerticalLayoutID',
			content: [oLabel, oTextField, oHorizontalLayout],
		});
		return oVerticalLayout;
	}

});
