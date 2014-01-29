sap.ui.controller("vocab-web.vocables", {
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.vocables
	 */
	onInit : function() {		
		this.getView().setModel(odataModel);
	},
	/**
	 * Similar to onAfterRendering, but this hook is invoked before the controller's
	 * View is re-rendered (NOT before the first rendering! onInit() is used for
	 * that one!).
	 * 
	 * @memberOf vocab-web.vocables
	 */
	 onBeforeRendering: function() {
		 this.oVocablesContext = null;
	 },
	 
	 /**
	 * Called when the View has been rendered (so its HTML is part of the document).
	 * Post-rendering manipulations of the HTML could be done here. This hook is the
	 * same one that SAPUI5 controls get after being rendered.
	 * 
	 * @memberOf vocab-web.vocables
	 */
	 onAfterRendering: function() {
		// set focus on learned field
		sap.ui.getCore().getControl('learnedFieldId').focus();
	 },
	
	addNewVocable : function() {
		var fnSuccess = $.proxy(this.successCreateVocable, this);
		var fnError = $.proxy(this.errorMsg, this);
		
		var vocables = {};
		vocables.Learned = sap.ui.getCore().getControl("learnedFieldId").getValue();
		vocables.Known = sap.ui.getCore().getControl("knownFieldId").getValue();
		vocables.Level = 1;
		vocables.DueDate = new Date().toISOString().replace("Z", "0000");
 /*
		// should create a vocable and link it to the lesson; 
		// however, it does only  create the vocable without the link
		this.getView().getModel().create("/Lessons(1L)/VocableDetails", vocables, null,
				this.successMsg, this.errorMsg);
*/		
		this.getView().getModel().create("/Vocables", vocables, null,
				fnSuccess, fnError);
	},
	
	successCreateVocable : function(oData, oResponse) {
		// get index of selected lesson
		var selectIndex = sap.ui.getCore().getControl('LessonsTableID').getSelectedIndex();
		
		// get row context for selected row
		var oLessonContext = sap.ui.getCore().getControl('LessonsTableID').getContextByIndex(selectIndex);
		
//      Establish link with lesson
		var ajaxData = '<uri xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices">' 
			+ getODataServiceURL()
			+ oLessonContext
			+ '</uri>';
		var ajaxURL = getODataServiceURL() + '/Vocables(' + oData["Id"] +')' +'/$links/LessonDetails';
		jQuery.ajax({
			url : ajaxURL,
			type : 'PUT',
			contentType : 'application/xml',
			data : ajaxData
		});
		
		//clear fields after successful entry
		sap.ui.getCore().getControl('learnedFieldId').setValue('');
		sap.ui.getCore().getControl('knownFieldId').setValue('');
		
		//set focus on "learned" field
		sap.ui.getCore().getControl('learnedFieldId').focus();
	
		// refresh does not always work automatically... trigger manually
		this.getView().getModel().refresh();
	
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox.alert("Error occured when creating entity");
	},
	
	quiz : function() {
		oQuizView.placeAt("content", "only");
	},
	
	deleteVocable : function() {
		var oParam = {};
		oParam.fnSuccess = $.proxy(this.successDeleteVocable, this);
		oParam.fnError = $.proxy(this.errorMsg, this);
		this.getView().getModel().remove(this.oVocablesContext.sPath, oParam);
	},
	
	successDeleteVocable : function() {
		// get index of selected row
		var selectIndex = sap.ui.getCore().getControl('VocablesTableID').getSelectedIndex();
		
		// get row context for selected row
		this.oVocablesContext = sap.ui.getCore().getControl('VocablesTableID').getContextByIndex(selectIndex);
	},
	
	doneEditing : function() {
		oLessonsView.placeAt("content", "only");
	},
	
	vocableSelectionChange: function(oEvent) {
		this.oVocablesContext = oEvent.getParameter("rowContext");
	
		//enable buttons
		sap.ui.getCore().getControl('deleteVocableButtonId').setEnabled(true);
	},
/**
 * Called when the View has been rendered (so its HTML is part of the document).
 * Post-rendering manipulations of the HTML could be done here. This hook is the
 * same one that SAPUI5 controls get after being rendered.
 * 
 * @memberOf vocab-web.vocables
 */
// onAfterRendering: function() {
//
// },
/**
 * Called when the Controller is destroyed. Use this one to free resources and
 * finalize activities.
 * 
 * @memberOf vocab-web.vocables
 */
// onExit: function() {
//
// }
});