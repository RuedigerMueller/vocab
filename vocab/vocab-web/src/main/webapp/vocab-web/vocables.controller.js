sap.ui.controller("vocab-web.vocables", {
	quizPossible : false,
	examPrepPossible : false,
	
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
		 this.checkQuizPossible();
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
		sap.ui.getCore().byId('learnedFieldId').focus();
		sap.ui.getCore().byId('vocableQuizButtonId').setEnabled(this.quizPossible);
		sap.ui.getCore().byId('vocableExamPrepButtonId').setEnabled(this.examPrepPossible);
	 },
	
	addNewVocable : function() {
		var fnSuccess = $.proxy(this.successCreateVocable, this);
		var fnError = $.proxy(this.errorMsg, this);
		
		var vocables = {};
		vocables.Learned = sap.ui.getCore().byId("learnedFieldId").getValue();
		vocables.Known = sap.ui.getCore().byId("knownFieldId").getValue();
		vocables.Level = 1;
		vocables.DueDate = new Date().toISOString().replace("Z", "0000");
/*
		// should create a vocable and link it to the lesson; 
		// however, it does only  create the vocable without the link
		this.getView().getModel().create("/Lessons(1L)/VocableDetails", vocables, null,
				null, fnError);
*/
		this.getView().getModel().create("/Vocables", vocables, null,
				fnSuccess, fnError);
	},
	
	successCreateVocable : function(oData, oResponse) {
		// Establish link with lesson
		var ajaxData = '<uri xmlns="http://schemas.microsoft.com/ado/2007/08/dataservices">' 
			+ getODataServiceURL()
			+ oLessonContext.sPath
			+ '</uri>';
		var ajaxURL = getODataServiceURL() + '/Vocables(' + oData["Id"] +')' +'/$links/LessonDetails';
		jQuery.ajax({
			url : ajaxURL,
			type : 'PUT',
			contentType : 'application/xml',
			data : ajaxData
		});
		
		// enable quiz as we now have at least one new vocable 
		this.quizPossible = true;
		this.examPrepPossible = true;
		sap.ui.getCore().byId('vocableQuizButtonId').setEnabled(this.quizPossible);
		sap.ui.getCore().byId('vocableExamPrepButtonId').setEnabled(this.examPrepPossible);
		
		//clear fields after successful entry
		sap.ui.getCore().byId('learnedFieldId').setValue('');
		sap.ui.getCore().byId('knownFieldId').setValue('');
		
		//set focus on "learned" field
		sap.ui.getCore().byId('learnedFieldId').focus();
		
		// refresh does not always work automatically... trigger manually
		this.getView().getModel().refresh();
	
	},

	errorMsg : function() {
		sap.ui.commons.MessageBox.alert("Error occured when creating entity");
	},
	
	quiz : function() {
		oQuizView.getController().setMode("quiz");
		oQuizView.placeAt("content", "only");
	},
	
	examPrep : function() {
		oQuizView.getController().setMode("examPrep");
		oQuizView.placeAt("content", "only");
	},
		
	deleteVocable : function() {
		var oVocablesContext = this.getVocablesContextFromTable();
		
		var oParam = {};
		oParam.fnError = $.proxy(this.errorMsg, this);
		this.getView().getModel().remove(oVocablesContext.sPath, oParam);
		
		sap.ui.getCore().byId('VocablesTableID').setSelectedIndex(-1);
		
		sap.ui.getCore().byId('learnedFieldId').focus();
		
		this.checkQuizPossible();
		sap.ui.getCore().byId('vocableQuizButtonId').setEnabled(this.quizPossible);
		sap.ui.getCore().byId('vocableExamPrepButtonId').setEnabled(this.examPrepPossible);
	},
	
	doneEditing : function() {
		sap.ui.getCore().byId('LessonsTableID').setSelectedIndex(-1);
		oLessonsView.placeAt("content", "only");
	},
	
	vocableSelectionChange: function(oEvent) {
		var oVocablesContext = this.getVocablesContextFromTable();
		
		if (oVocablesContext != null) {
			sap.ui.getCore().byId('deleteVocableButtonId').setEnabled(true);
		} else {
			sap.ui.getCore().byId('deleteVocableButtonId').setEnabled(false);
		}
	},
	
	getVocablesContextFromTable : function() {
		// get index of selected row
		var selectIndex = sap.ui.getCore().byId('VocablesTableID').getSelectedIndex();
		
		// get row context for selected row
		return sap.ui.getCore().byId('VocablesTableID').getContextByIndex(selectIndex);
	},
	
	checkQuizPossible : function() {
		this.quizPossible = false;
		this.examPrepPossible = false;	
		
		//Check if quiz is possible
		//http://localhost:8080/vocab-web/vocab.svc/Lessons(1L)/VocableDetails/$count
		 //?$filter=DueDate+le+datetime%272014-02-02T23:00:00.0000000%27
		// build filter for Due Date; start with getting tomorrows date
		var dateTimeGTM = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
		dateTimeGTM.setHours(0,0,0,0);	
		
		var formattedDate = dateTimeGTM.toISOString().replace("Z", "0000");
			
		var dueDateFilter = "$filter=DueDate+le+datetime%27" + formattedDate + "%27";
		 
		var ajaxURL = getODataServiceURL() + 
		 			   oLessonContext.sPath + 
		 			   "/VocableDetails/$count?" +
		 			   dueDateFilter;
		 var numberVocables = jQuery.ajax({
				url : ajaxURL,
				type : 'GET',
				contentType : 'text/plain',
				async : false
			}).responseText;
		if (numberVocables > 0) this.quizPossible = true;
		
		//check if exam prep is possible
		ajaxURL = getODataServiceURL() + 
		   		  oLessonContext.sPath + 
		          "/VocableDetails/$count";
		numberVocables = 0;
		numberVocables = jQuery.ajax({
			url : ajaxURL,
			type : 'GET',
			contentType : 'text/plain',
			async : false
		}).responseText;
		if (numberVocables > 0) this.examPrepPossible = true;
	}
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