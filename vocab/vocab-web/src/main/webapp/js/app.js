// Function returning URL to OData root
var getODataServiceURL = function() {
	var sOrigin = window.location.protocol + "//"
		+ window.location.hostname
		+ (window.location.port ? ":" + window.location.port : "");
	return sOrigin + "/vocab-web/vocab.svc";
};

// Create one OData model to be used by the views
var odataModel = new sap.ui.model.odata.ODataModel(getODataServiceURL());
odataModel.setDefaultBindingMode(sap.ui.model.BindingMode.TwoWay);
odataModel.attachRejectChange(this,function(oEvent){
    alert("Change rejected");
});


// Need know in which lesson we are currently working
var oLessonContext = null;

// Internationalization:
// create global i18n resource bundle for texts in application UI
oi18nModel = new sap.ui.model.resource.ResourceModel({
	bundleUrl : "i18n/i18n.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(oi18nModel, "i18n");

sap.ui.localResources("vocab-web");

// Create the header view
var oHeaderView = sap.ui.view({
	id:"headerViewID", 
	viewName:"vocab-web.header", 
	type:sap.ui.core.mvc.ViewType.JS
});
oHeaderView.placeAt("header");

// Create a lessons view and place in the upper part of the content area
var oLessonsView = sap.ui.view({
	id:"lessonsViewID", 
	viewName:"vocab-web.lessons", 
	type:sap.ui.core.mvc.ViewType.JS
});
oLessonsView.placeAt("content");

// Create a vocables list view and place in the lower part of the content area
var oVocablesView = sap.ui.view({
	id:"vocablesViewID", 
	viewName:"vocab-web.vocables", 
	type:sap.ui.core.mvc.ViewType.JS
});
//oVocablesView.placeAt("content", 2);

// Create the quiz view (and do not display it yet)
var oQuizView = new sap.ui.view({
	id: "quizViewID",
	viewName:"vocab-web.quiz", 
	type:sap.ui.core.mvc.ViewType.JS
});

