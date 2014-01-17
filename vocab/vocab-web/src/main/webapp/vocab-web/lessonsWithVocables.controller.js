sap.ui.controller("vocab-web.lessonsWithVocables", {
	oLessonContext : null,
	
	/**
	 * Called when a controller is instantiated and its View controls (if
	 * available) are already created. Can be used to modify the View before it
	 * is displayed, to bind event handlers and do other one-time
	 * initialization.
	 * 
	 * @memberOf vocab-web.lessonsWithVocables
	 */
	onInit : function() {		
		var odataModel = new sap.ui.model.odata.ODataModel(this.getODataServiceURL());
		this.getView().setModel(odataModel);
		
		//set focus on title field
		sap.ui.getCore().getControl('lessonTitleFieldId').focus();
	},

	getODataServiceURL : function() {
		var sOrigin = window.location.protocol + "//"
			+ window.location.hostname
			+ (window.location.port ? ":" + window.location.port : "");
		return sOrigin + "/vocab-web/vocab.svc";
	},
	
	addNewLesson : function(sTitle, sLearnedLanguage, sKnownLanguage, oTable) {
		var fnSuccess = $.proxy(this.successLesson, this);
		var fnError = $.proxy(this.errorMsg, this);
		
		var lessons = {};

		lessons.Title = sTitle;
		lessons.LearnedLanguage = sLearnedLanguage;
		lessons.KnownLanguage = sKnownLanguage;


		this.getView().getModel().create("/Lessons", lessons, null,
				fnSuccess, fnError);
	},
	
	addNewVocable : function(sLearned, sKnown) {
		if (!this.oLessonContext) {
			sap.ui.commons.MessageBox.alert("Select a lesson before adding vocables.");
			return;
		}
		
		var fnSuccess = $.proxy(this.successVocable, this);
		var fnError = $.proxy(this.errorMsg, this);
		
		var vocables = {};
		vocables.Learned = sLearned;
		vocables.Known = sKnown;
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

	successLesson : function(oData, oResponse) {
		//clear fields after successful entry
		sap.ui.getCore().getControl('lessonTitleFieldId').setValue('');
		sap.ui.getCore().getControl('learnedLanguageFieldId').setValue('');
		sap.ui.getCore().getControl('KnownLanguageFieldId').setValue('');
		
		//set focus on title field
		sap.ui.getCore().getControl('lessonTitleFieldId').focus();
	},
	
	successVocable : function(oData, oResponse) {
//      Establish link with lesson
		var ajaxData = '<uri xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices">' 
			+ this.getODataServiceURL()
			+ this.oLessonContext
			+ '</uri>';
		var ajaxURL = this.getODataServiceURL() + '/Vocables(' + oData["Id"] +')' +'/$links/LessonDetails';
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
	
	lessonSelectionChange: function(oEvent, oVocablesTable) {
		this.oLessonContext = oEvent.getParameter("rowContext");
		
		// Bind Vocables table to selected row
		var selectedLessonIDVocables = this.oLessonContext + "/VocableDetails";
		oVocablesTable.bindRows(selectedLessonIDVocables);
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