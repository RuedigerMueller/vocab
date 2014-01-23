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
	onBeforeRendering: function() {
		var quizVocablesURL = getODataServiceURL() + oLessonContext + '/VocableDetails?$format=json';
		this.quizVocables = {};
		
		this.quizVocables= jQuery.parseJSON(
				jQuery.ajax({
					type: 'GET',
					url: quizVocablesURL,
					dataType : 'json',
					success: function() {},
					data: {},
					async: false
				}).responseText
		);
		this.shuffleArray(this.quizVocables["d"]["results"]);
		
		this.numberVocables = this.quizVocables["d"]["results"].length;
				
		sap.ui.getCore().getControl('knownQuizID').setValue(this.quizVocables["d"]["results"][0]["Known"]);
		sap.ui.getCore().getControl('solutionQuizID').setValue(this.quizVocables["d"]["results"][0]["Learned"]);
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
  back: function() {
	  oLessonsView.placeAt("content", "only");
  },

  display: function() {
	  
  },
  
  correct: function() {
	  
  },
  
  wrong: function() {
	  
  },
  
  shuffleArray: function(array) {
	    for (var i = array.length - 1; i > 0; i--) {
	        var j = Math.floor(Math.random() * (i + 1));
	        var temp = array[i];
	        array[i] = array[j];
	        array[j] = temp;
	    }
	    return array;
	}

});