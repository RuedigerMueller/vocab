sap.ui.controller("vocab-web.vocableslist", {

	/**
	 * Called when a controller is instantiated and its View controls (if available) are already created.
	 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
	 * @memberOf vocab-web.vocableslist
	 */
	onInit : function() {
		var oVocablesModel = new sap.ui.model.json.JSONModel();

		oVocablesModel.setData({
			Vocables : [ {
				Learned : "",
				Known : "",
				Level: 1,
				DueDate: Date()
			} ]
		});

		this.getView().setModel(oVocablesModel);

	},

	addNewVocable : function(sLearned, sKnown, oTable) {
		var oVocablesModel = new sap.ui.model.json.JSONModel();
		oVocablesModel.setData({
			Vocables : [ {
				Learned : sLearned,
				Known : sKnown,
				Level: 1,
				DueDate: Date()
			} ]
		});

		this.getView().setModel(oVocablesModel);
		oTable.unbindRows().bindRows("/Vocables");
	},

/**
 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
 * (NOT before the first rendering! onInit() is used for that one!).
 * @memberOf vocab-web.vocableslist
 */
//	onBeforeRendering: function() {
//
//	},
/**
 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
 * This hook is the same one that SAPUI5 controls get after being rendered.
 * @memberOf vocab-web.vocableslist
 */
//	onAfterRendering: function() {
//
//	},
/**
 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
 * @memberOf vocab-web.vocableslist
 */
//	onExit: function() {
//
//	}
});