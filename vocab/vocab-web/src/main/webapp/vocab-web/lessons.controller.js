sap.ui.controller("vocab-web.lessons", {
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.lessons
	 */
	onInit : function() {
		this.getView().setModel(odataModel);

		// Get User Info and store it for later use
		var userInfoURL = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "")
				+ "/vocab-web/UserInfo";

		var fnSuccess = $.proxy(this.successGetUserInfo, this);
		jQuery.getJSON(userInfoURL, fnSuccess);

		// Get User Info and store it for later use
		var fileUploadURL = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "")
				+ "/vocab-web/FileUpload";
		
		sap.ui.getCore().byId('simpleFileUploaderId').setUploadUrl(fileUploadURL);
		
		// set focus on title field
		sap.ui.getCore().byId('lessonTitleFieldId').focus();
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the
	 * controller's View is re-rendered (NOT before the first rendering!
	 * onInit() is used for that one!).
	 * 
	 * @memberOf vocab-web.lessons
	 */
	onBeforeRendering : function() {
		this.getView().getModel().refresh();
	},
	/**
	 * Called when the View has been rendered (so its HTML is part of the
	 * document). Post-rendering manipulations of the HTML could be done here.
	 * This hook is the same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf vocab-web.lessons
	 */
	onAfterRendering : function() {
		// set focus on title field
		sap.ui.getCore().byId('lessonTitleFieldId').focus();
		sap.ui.getCore().byId('LessonsTableID').setSelectedIndex();
	},

	successGetUserInfo : function(data) {
		this.userName = data.user;

		// bind table rows to /Persons based on the model defined in the init
		// method of the controller
		sap.ui.getCore().byId('LessonsTableID').bindRows(
				{
					path : '/Lessons',
					filters : [ new sap.ui.model.Filter("UserName",
							sap.ui.model.FilterOperator.EQ, this.userName) ]
				});
	},

	addNewLesson : function() {
		var fnSuccess = $.proxy(this.successCreateLesson, this);
		var fnError = $.proxy(this.errorMsg, this);

		var lessons = {};

		lessons.UserName = this.userName;
		lessons.Title = sap.ui.getCore().byId("lessonTitleFieldId").getValue();
		lessons.LearnedLanguage = sap.ui.getCore().byId(
				"learnedLanguageFieldId").getValue();
		lessons.KnownLanguage = sap.ui.getCore().byId("KnownLanguageFieldId")
				.getValue();

		this.getView().getModel().create("/Lessons", lessons, null, fnSuccess,
				fnError);
	},

	successCreateLesson : function(oData, oResponse) {
		// clear fields after successful entry
		sap.ui.getCore().byId('lessonTitleFieldId').setValue('');
		sap.ui.getCore().byId('learnedLanguageFieldId').setValue('');
		sap.ui.getCore().byId('KnownLanguageFieldId').setValue('');

		// set focus on title field
		sap.ui.getCore().byId('lessonTitleFieldId').focus();
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox.alert("Error occured when creating entity");
	},

	quiz : function() {
		this.updateVocablesBinding();
		oQuizView.getController().setMode("quiz");
		oQuizView.placeAt("content", "only");
	},
	
	examPrep : function() {
		this.updateVocablesBinding();
		oQuizView.getController().setMode("examPrep");
		oQuizView.placeAt("content", "only");
	},

	deleteLesson : function() {
		this.updateVocablesBinding();

		var oParam = {};
		oParam.fnError = $.proxy(this.errorMsg, this);

		this.getView().getModel().remove(oLessonContext.sPath, oParam);
		sap.ui.getCore().byId('LessonsTableID').setSelectedIndex(-1);
		
		sap.ui.getCore().byId('lessonTitleFieldId').focus();
	},

	editVocables : function() {
		this.updateVocablesBinding();
		oVocablesView.placeAt("content", "only");
	},

	lessonSelectionChange : function(oEvent) {
		// enable buttons
		this.updateVocablesBinding();
		if (oLessonContext != null) {
			// Test if selected lesson has vocables
			var numberVocables = this.getView().getModel().getProperty("NumberVocables", oLessonContext, false);
			if (numberVocables > 0) {
				sap.ui.getCore().byId('lessonExamPrepButtonId').setEnabled(true);
			} else {
				sap.ui.getCore().byId('lessonExamPrepButtonId').setEnabled(false);
			}	
			
			// Test if selected lesson has due vocables
			var numberDue = this.getView().getModel().getProperty("NumberDueVocables", oLessonContext, false);
			if (numberDue > 0) {
				sap.ui.getCore().byId('lessonQuizButtonId').setEnabled(true);
			} else {
				sap.ui.getCore().byId('lessonQuizButtonId').setEnabled(false);
			}
						
			sap.ui.getCore().byId('deleteLessonButtonId').setEnabled(true);
			sap.ui.getCore().byId('editVocablesButtonId').setEnabled(true);
		} else {
			sap.ui.getCore().byId('lessonExamPrepButtonId').setEnabled(false);
			sap.ui.getCore().byId('lessonQuizButtonId').setEnabled(false);
			sap.ui.getCore().byId('deleteLessonButtonId').setEnabled(false);
			sap.ui.getCore().byId('editVocablesButtonId').setEnabled(false);
		}
	},

	updateVocablesBinding : function() {
		// get row context for selected row
		oLessonContext = this.getLessonContextFromTable();

		if (oLessonContext != null) {
			
			// Bind Vocables table to selected row
			var selectedLessonIDVocables = oLessonContext.sPath
					+ "/VocableDetails";
			sap.ui.getCore().byId('VocablesTableID').bindRows(
					selectedLessonIDVocables);

			// Bind Learned Language label to language of selected lesson
			var sLessonContext = oLessonContext.sPath + "/LearnedLanguage";
			sap.ui.getCore().byId('learnedLabelID').bindProperty("text",
					sLessonContext);
			sap.ui.getCore().byId('VocableLearnedColumnID').bindProperty(
					"text", sLessonContext);

			// Bind Known Language label to language of selected lesson
			var sLessonContext = oLessonContext.sPath + "/KnownLanguage";
			sap.ui.getCore().byId('knownLabelID').bindProperty("text",
					sLessonContext);
			sap.ui.getCore().byId('VocableKnownColumnID').bindProperty("text",
					sLessonContext);
		}
	},

	getLessonContextFromTable : function() {
		// get index of selected row
		var selectIndex = sap.ui.getCore().byId('LessonsTableID')
				.getSelectedIndex();

		// get row context for selected row
		oLessonContext = sap.ui.getCore().byId('LessonsTableID')
				.getContextByIndex(selectIndex);
		return oLessonContext;
	}

/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf vocab-web.lessons
 */
// onExit: function() {
//
// }
});