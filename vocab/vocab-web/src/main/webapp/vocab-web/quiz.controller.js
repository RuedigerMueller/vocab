sap.ui.controller("vocab-web.quiz", {
	mode : "quiz",
	quizVocables : {},
	numberVocables : 0,
	index : -1,
	percentCorrect : 0,
	numberCorrect : 0,
	numberWrong : 0,
	statusMessage: "",
	lessonTitle : "",
	
	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf vocab-web.quiz
	 */
	onInit : function() {
		this.getView().setModel(odataModel);
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
	 * (NOT before the first rendering! onInit() is used for that one!).
	 * @memberOf vocab-web.quiz
	 */
	onBeforeRendering : function() {
		// Reset quiz
		this.quizVocables = {};
		this.numberVocables = 0;
		this.index = -1;
		this.percentCorrect = 0;
		this.numberCorrect = 0;
		this.numberWrong = 0;
		
		var sLessonTitlePath= oLessonContext.sPath + "/Title";
		this.lessonTitle = this.getView().getModel().getProperty(sLessonTitlePath);
					
		// build filter for Due Date; start with getting tomorrows date
		var dateTimeGTM = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		dateTimeGTM.setHours(0,0,0,0);	
	
		var formattedDate = dateTimeGTM.toISOString().replace("Z", "0000");
		
		var dueDateFilter = "$filter=DueDate+le+datetime%27" + formattedDate + "%27" +
							"+and+Level+lt+7";

		//URL to get vocables of selected lesson in JSON format
		var quizVocablesURL = "";
		if (this.mode == "quiz") {
			quizVocablesURL = getODataServiceURL() 
				+ oLessonContext.sPath
				+ '/VocableDetails?$format=json&'
				+ dueDateFilter;
		} else {
			quizVocablesURL = getODataServiceURL() 
				+ oLessonContext.sPath
				+ '/VocableDetails?$format=json';
		}

		// Get vocables of selected lesson
		this.quizVocables = jQuery.parseJSON(jQuery.ajax({
			type : 'GET',
			url : quizVocablesURL,
			dataType : 'json',
			success : function() {},
			data : {},
			async : false
		}).responseText);

		// shuffle vocables
		this.shuffleArray(this.quizVocables["d"]["results"]);

		// need to know how many vocables are part of the quiz
		this.numberVocables = this.quizVocables["d"]["results"].length;

		// start quiz
		if (this.numberVocables > 0) {
			this.nextVocable();
		}
	},

	/**
	 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * @memberOf vocab-web.quiz
	 */
	onAfterRendering: function() {
		if (this.mode == "quiz" && this.numberVocables <= 0) {
			alert("no vocables due");
			this.back();
		};
		
		// Use jquery to check if the user hit enter or tab
		var fnCheckForEnter = $.proxy(this.checkForEnter, this);
		$("#learnedQuizID").keyup(fnCheckForEnter);
				
		// set focus on learned field
		sap.ui.getCore().byId('learnedQuizID').focus();
	},
	/**
	 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
	 * @memberOf vocab-web.quiz
	 */
	//	onExit: function() {
	//
	//	}
	
	setMode : function(mode) {
		this.mode = mode;
	},
	
	updateStatusMessage : function() {		
		// status message is slightly different at end of test
		if (this.numberVocables == this.index) {
			this.statusMessage = this.lessonTitle + ": (" + (this.numberVocables) + "/" + this.numberVocables + ") - " + 
								 this.percentCorrect + "% " + oi18nModel.getProperty("CORRECT").toLowerCase() + ".";
		} else {
			this.statusMessage = this.lessonTitle + ": (" + (this.index+1) + "/" + this.numberVocables + ") - " + 
								 this.percentCorrect + "% " + oi18nModel.getProperty("CORRECT").toLowerCase() + ".";
		}
		sap.ui.getCore().byId('quizStatusMessageID').setText(this.statusMessage);
	},
	
	back : function() {
		// user hit back before reaching the end => don't count the last vocable
		if (this.index != this.numberVocables) {
			this.updatePercentCorrect();
			this.index--;
			this.updateStatusMessage();
		}
		
		// display quiz result
		sap.ui.commons.MessageBox.alert(this.statusMessage, null, oi18nModel.getProperty("QUIZ_RESULT"));
		
		// back to lessons view (and make sure that no lesson is selected)
		sap.ui.getCore().byId('LessonsTableID').setSelectedIndex(-1);
		oLessonsView.placeAt("content", "only");
	},

	display : function() {
		sap.ui.getCore().byId('correctButtonId').setEnabled(true);
		sap.ui.getCore().byId('wrongButtonId').setEnabled(true);
		sap.ui.getCore().byId('solutionQuizID').setValue(
				this.quizVocables["d"]["results"][this.index]["Learned"]);
	},

	correct : function() {
		// no need to update statistic in case of exam prep
		this.numberCorrect++;
		if (this.mode == "examPrep") {
			this.nextVocable();
			return;
		}
		
		// update due date and level
		var vocables = {};
		vocables.Learned = this.quizVocables["d"]["results"][this.index]["Learned"];
		vocables.Known = this.quizVocables["d"]["results"][this.index]["Known"];
		vocables.Level = this.quizVocables["d"]["results"][this.index]["Level"]+ 1;
		
		// calculate next due date based on level
		var nextDueDate = new Date();
		var waitForDays = 0;
		switch (vocables.Level) {
			case 2:
				waitForDays = 1;
				break;
			case 3:
				waitForDays = 3;
				break;
			case 4:
				waitForDays = 9;
				break;
			case 5:
				waitForDays = 27;
				break;
			case 6:
				waitForDays = 80;
				break;
			case 7:
				waitForDays = 9999;
				break;
		}
				
		nextDueDate.setDate(nextDueDate.getDate() + waitForDays);
		vocables.DueDate = nextDueDate.toISOString().replace("Z", "0000");
		
		var id = "/Vocables(" + this.quizVocables["d"]["results"][this.index]["Id"] + "L)";
		this.getView().getModel().update(id, vocables, null, null, null);
		
		var sText = oi18nModel.getProperty('CORRECT') + ' - ' + 
		            oi18nModel.getProperty('NEXT_QUERY') + ' ' +
		            waitForDays + ' ' +
		            oi18nModel.getProperty('DAYS') + '.';
		if (waitForDays == 9999) {
			sText = oi18nModel.getProperty('LONG-TERM_MEMORY');
		}
		
		noty({
	        text: sText,
	        layout: "bottomCenter",
	        type: 'information',
	        timeout: 1000
	      });

		this.nextVocable();
	},

	wrong : function() {
		this.numberWrong++;
		
		// no need to update statistic in case of exam prep
		if (this.mode == "examPrep") {
			this.nextVocable();
			return;
		}
		// update due date and level
		var vocables = {};
		vocables.Learned = this.quizVocables["d"]["results"][this.index]["Learned"];
		vocables.Known = this.quizVocables["d"]["results"][this.index]["Known"];
		vocables.Level = 1;
		
		var nextDueDate = new Date();
		nextDueDate.setDate(nextDueDate.getDate() + 1);
		vocables.DueDate = nextDueDate.toISOString().replace("Z", "0000");
		
		var id = "/Vocables(" + this.quizVocables["d"]["results"][this.index]["Id"] + "L)";
		this.getView().getModel().update(id, vocables, null, null, null);
		
		var sText = oi18nModel.getProperty('WRONG') + ' - ' + 
        		    oi18nModel.getProperty('BACK_TO_LEVEL_ONE');
		noty({
	        text: sText,
	        layout: "bottomCenter",
	        type: 'information',
	        timeout: 1000
	      });
		
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
		sap.ui.getCore().byId('correctButtonId').setEnabled(false);
		sap.ui.getCore().byId('wrongButtonId').setEnabled(false);
		sap.ui.getCore().byId('learnedQuizID').setValue("");
		sap.ui.getCore().byId('solutionQuizID').setValue("");
		if (this.index < this.numberVocables - 1) {
			this.index++;
			sap.ui.getCore().byId('knownQuizID').setValue(
					this.quizVocables["d"]["results"][this.index]["Known"]);
			this.updatePercentCorrect();
			this.updateStatusMessage();
			
			// wait some milliseconds; otherwise it can happen that an Enter is propagated to this field
			setTimeout(function () {
				sap.ui.getCore().byId('learnedQuizID').setEnabled(true).focus();
			}, 200);
			
		} else {
			this.index++;
			this.updatePercentCorrect();
			this.updateStatusMessage();
			this.back();
		}

	},

	learnedChanged : function() {
		sap.ui.getCore().byId('learnedQuizID').setEnabled(false);
		sap.ui.getCore().byId('wrongButtonId').setEnabled(true);
		sap.ui.getCore().byId('solutionQuizID').setValue(
				this.quizVocables["d"]["results"][this.index]["Learned"]);
		sap.ui.getCore().byId('correctButtonId').setEnabled(true);
		
		// Set focus on "Correct" or "Wrong" depending on answer
		// Getting value of learnedQuizID via jquery, because using sap.ui.getCore... 
		// returns an empty value if the textarea was left using "ENTER"...
	    // Need to wait some millisecond; otherwise the button does not focus :-(
		if ($("#learnedQuizID").val().trim() == 
			sap.ui.getCore().byId('solutionQuizID').getValue()) {
			setTimeout(function () {
				sap.ui.getCore().byId('correctButtonId').focus();
			}, 100);
		} else {
			setTimeout(function () {
				sap.ui.getCore().byId('wrongButtonId').focus();
			}, 100);
		}	
	},
	
	checkForEnter : function(event) {
		if(event.keyCode == jQuery.sap.KeyCodes.ENTER || event.keyCode == jQuery.sap.KeyCodes.TAB ){
			this.learnedChanged();
	    }
	},
	
	updatePercentCorrect : function() {
		if (this.index==0) {
			if (this.numberCorrect==0) {
				this.percentCorrect = 0;
			} else {
				this.percentCorrect = 100;
			}
		} else {
			this.percentCorrect = (this.numberCorrect/(this.index))*100;
			this.percentCorrect = this.percentCorrect.toFixed(0);
		};
	},
});