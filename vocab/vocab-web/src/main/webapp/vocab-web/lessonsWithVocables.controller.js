sap.ui.controller("vocab-web.lessonsWithVocables", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.lessonsWithVocables
	 */
	onInit : function() {
		var sOrigin = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "");
		var vocabOdataServiceUrl = sOrigin
				+ "/vocab-web/vocab.svc";

		var odataModel = new sap.ui.model.odata.ODataModel(
				vocabOdataServiceUrl);
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
	
	addNewVocable : function(sLearned, sKnown, oTable) {
		var vocables = {};
		
		var resource = window.location.protocol + "//" 
					   + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
					   + "/vocab-web/vocab.svc/Lessons(" +  "1L" + ")";

		vocables.Learned = sLearned;
		vocables.Known = sKnown;
		vocables.Level = 1;
		vocables.DueDate = new Date().toISOString().replace("Z", "0000");
//		vocables.lesson = resource;
/*
		vocables.lesson = {
				"__metadata" : {
					"uri" : resource
				}
		};
*/
		
		//vocables.lesson = 1;
		//var d = new Date();
		//vocables.DueDate = d.toUTCString();
/*	
		var ajaxURL = window.location.protocol + "//" 
					  + window.location.hostname + (window.location.port ? ":" + window.location.port : "")
		               + "/vocab-web/vocab.svc/Vocables";
		jQuery.ajax({
			url : ajaxURL + "?$format=json",
            type : 'POST',
            contentType : 'application/json',
            data : JSON.stringify({
                      Learned : sLearned,
                      Known : sKnown,
                      Level: 1,
                      lesson:  {
          				"__metadata" : {
        					"uri" : resource
        			}}
            })
		});
*/
		this.getView().getModel().create("/Vocables", vocables, null,
				this.successMsg, this.errorMsg);
	},

	successMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Entity has been successfully created");
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Error occured when creating entity");
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf vocab-web.lessonsWithVocables
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf vocab-web.lessonsWithVocables
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf vocab-web.lessonsWithVocables
 */
// onExit: function() {
//
// }
});