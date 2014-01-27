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
		var UserInfoURL = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "")
				+ "/vocab-web/UserInfo";

		var fnSuccess = $.proxy(this.successGetUserInfo, this);
		jQuery.getJSON(UserInfoURL, fnSuccess);

		// set focus on title field
		sap.ui.getCore().getControl('lessonTitleFieldId').focus();
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's
	 * View is re-rendered (NOT before the first rendering! onInit() is used for
	 * that one!).
	 * 
	 * @memberOf vocab-web.lessons
	 */	
	//onBeforeRendering : function() {
	//	
	//},
	
	/**
	 * Called when the View has been rendered (so its HTML is part of the document).
	 * Post-rendering manipulations of the HTML could be done here. This hook is the
	 * same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf vocab-web.lessons
	 */
	 onAfterRendering: function() {
		// set focus on title field
		sap.ui.getCore().getControl('lessonTitleFieldId').focus();
	 },

	successGetUserInfo : function(data) {
		this.userName = data.user;

		// bind table rows to /Persons based on the model defined in the init
		// method of the controller
		sap.ui.getCore().getControl('LessonsTableID').bindRows(
				{
					path : '/Lessons',
					filters : [ new sap.ui.model.Filter("UserName",
							sap.ui.model.FilterOperator.EQ, this.userName) ]
				});
	},

	addNewLesson : function() {
		var fnSuccess = $.proxy(this.successLesson, this);
		var fnError = $.proxy(this.errorMsg, this);

		var lessons = {};

		lessons.UserName = this.userName;
		lessons.Title = sap.ui.getCore().getControl("lessonTitleFieldId")
				.getValue();
		lessons.LearnedLanguage = sap.ui.getCore().getControl(
				"learnedLanguageFieldId").getValue();
		lessons.KnownLanguage = sap.ui.getCore().getControl(
				"KnownLanguageFieldId").getValue();

		this.getView().getModel().create("/Lessons", lessons, null, fnSuccess,
				fnError);
	},

	successLesson : function(oData, oResponse) {
		// clear fields after successful entry
		sap.ui.getCore().getControl('lessonTitleFieldId').setValue('');
		sap.ui.getCore().getControl('learnedLanguageFieldId').setValue('');
		sap.ui.getCore().getControl('KnownLanguageFieldId').setValue('');

		// set focus on title field
		sap.ui.getCore().getControl('lessonTitleFieldId').focus();
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox.alert("Error occured when creating entity");
	},

	quiz : function() {
		oQuizView.placeAt("content", "only");
	},

	deleteLesson : function() {
		/*
		 * Not working: raises exception: Object [object Object] has no method
		 * 'replace' this.getView().getModel().remove(oLessonContext);
		 */
		var ajaxURL = getODataServiceURL() + oLessonContext;
		jQuery.ajax({
			url : ajaxURL,
			type : 'DELETE',
			async : false
		});
		this.getView().getModel().refresh();
	},

	editVocables : function() {
		if (oLessonContext == null) {
			sap.ui.commons.MessageBox
					.alert("Select a lesson before editing vocables.");
			return;
		}
		oVocablesView.placeAt("content", "only");
	},

	lessonSelectionChange : function(oEvent) {
		oLessonContext = oEvent.getParameter("rowContext");

		// Bind Vocables table to selected row
		var selectedLessonIDVocables = oLessonContext + "/VocableDetails";
		sap.ui.getCore().getControl('VocablesTableID').bindRows(
				selectedLessonIDVocables);

		// Bind Learned Language label to language of selected lesson
		var sLessonContext = oLessonContext + "/LearnedLanguage";
		sap.ui.getCore().getControl('learnedLabelID').bindProperty("text",
				sLessonContext);
		sap.ui.getCore().getControl('VocableLearnedColumnID').bindProperty(
				"text", sLessonContext);

		// Bind Known Language label to language of selected lesson
		var sLessonContext = oLessonContext + "/KnownLanguage";
		sap.ui.getCore().getControl('knownLabelID').bindProperty("text",
				sLessonContext);
		sap.ui.getCore().getControl('VocableKnownColumnID').bindProperty(
				"text", sLessonContext);

		// enable buttons
		sap.ui.getCore().getControl('lessonQuizButtonId').setEnabled(true);
		sap.ui.getCore().getControl('deleteLessonButtonId').setEnabled(true);
		sap.ui.getCore().getControl('editVocablesButtonId').setEnabled(true);
	},


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