sap.ui.controller("vocab-web.vocableslist", {

	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.vocableslist
	 */
	onInit : function() {
		var sOrigin = window.location.protocol + "//"
				+ window.location.hostname
				+ (window.location.port ? ":" + window.location.port : "");
		var vocablesListOdataServiceUrl = sOrigin
				+ "/vocab-web/vocab.svc";

		var odataModel = new sap.ui.model.odata.ODataModel(
				vocablesListOdataServiceUrl);
		this.getView().setModel(odataModel);
	},

	addNewVocable : function(sLearned, sKnown, oTable) {
		var vocables = {};

		vocables.Learned = sLearned;
		vocables.Known = sKnown;
		vocables.Level = 1;
		//var d = new Date();
		//vocables.DueDate = d.toUTCString();

		this.getView().getModel().create("/Vocables", vocables, null,
				this.successMsg, this.errorMsg);
	},

	successMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Vocable entity has been successfully created");
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox
				.alert("Error occured when creating vocable entity");
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's
 * View is re-rendered (NOT before the first rendering! onInit() is used for
 * that one!).
 * 
 * @memberOf vocab-web.vocableslist
 */
// onBeforeRendering: function() {
//
// },
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf vocab-web.vocableslist
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf vocab-web.vocableslist
 */
// onExit: function() {
//
// }
});