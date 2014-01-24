sap.ui.controller("vocab-web.quiz", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf vocab-web.quiz
	 */
	//	onInit: function() {
	//		alert("onInit");
	//	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf vocab-web.quiz
	 */
	onBeforeRendering : function() {
		// Reset quiz
		this.quizVocables = {};
		this.index = -1;

		//URL to get vocables of selected lesson in JSON format
		var quizVocablesURL = getODataServiceURL() + oLessonContext
				+ '/VocableDetails?$format=json';
		
		// Get vocables of selected lesson
		this.quizVocables = jQuery.parseJSON(jQuery.ajax({
			type : 'GET',
			url : quizVocablesURL,
			dataType : 'json',
			success : function() {
			},
			data : {},
			async : false
		}).responseText);
		
		// shuffle vocables
		this.shuffleArray(this.quizVocables["d"]["results"]);

		// need to know how many vocables are part of the quiz
		this.numberVocables = this.quizVocables["d"]["results"].length;

		// start quiz
		this.nextVocable();
	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf vocab-web.quiz
	 */
	//	onAfterRendering: function() {
	//
	//	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf vocab-web.quiz
	 */
	//	onExit: function() {
	//
	//	}
	back : function() {
		oLessonsView.placeAt("content", "only");
	},

	display : function() {
		sap.ui.getCore().getControl('correctButtonId').setEnabled(true);
		sap.ui.getCore().getControl('wrongButtonId').setEnabled(true);
		sap.ui.getCore().getControl('solutionQuizID').setValue(
				this.quizVocables["d"]["results"][this.index]["Learned"]);
	},

	correct : function() {
		// update due date and level
		//Todo
		
		this.nextVocable();
	},

	wrong : function() {
		// update due date and level
		//Todo
	
		this.nextVocable();
	},

	shuffleArray : function(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	},

	nextVocable : function() {
		sap.ui.getCore().getControl('correctButtonId').setEnabled(false);
		sap.ui.getCore().getControl('wrongButtonId').setEnabled(false);
		sap.ui.getCore().getControl('learnedQuizID').setValue("");
		sap.ui.getCore().getControl('solutionQuizID').setValue("");
		if (this.index < this.numberVocables - 1) {
			this.index++;
			sap.ui.getCore().getControl('knownQuizID').setValue(
					this.quizVocables["d"]["results"][this.index]["Known"]);
		} else {
			oLessonsView.placeAt("content", "only");
		}
		
	},
	
	learnedChanged : function() {
		sap.ui.getCore().getControl('correctButtonId').setEnabled(true);
		sap.ui.getCore().getControl('wrongButtonId').setEnabled(true);
		sap.ui.getCore().getControl('solutionQuizID').setValue(
				this.quizVocables["d"]["results"][this.index]["Learned"]);
	},
	
	checkForEnter: function() {
		alert("Live Change");
	}

});