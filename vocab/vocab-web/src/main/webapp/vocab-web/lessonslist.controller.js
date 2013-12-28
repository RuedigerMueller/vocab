sap.ui.controller("vocab-web.lessonslist", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.lessonslist
	 */
	onInit : function() {
		var sOrigin = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "");
		var lessonsListOdataServiceUrl = sOrigin
				+ "/vocab-web/vocab.svc";

		var odataModel = new sap.ui.model.odata.ODataModel(
				lessonsListOdataServiceUrl);
		this.getView().setModel(odataModel);
	},

	addNewLesson : function(sTitle, sLearnedLanguage, sKnownLanguage, oTable) {
		var lessons = {};

		lessons.Title = sTitle;
		lessons.LearnedLanguage = sLearnedLanguage;
		lessons.KnownLanguage = sKnownLanguage;


		this.getView().getModel().create("/Lessons", lessons, null,
				this.successMsg, this.errorMsg);
	},

	successMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Lesson entity has been successfully created");
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Error occured when creating lesson entity");
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf vocab-web.lessonslist
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf vocab-web.lessonslist
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf vocab-web.lessonslist
 */
// onExit: function() {
//
// }
});