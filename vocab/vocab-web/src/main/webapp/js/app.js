// Internationalization:
// create global i18n resource bundle for texts in application UI
oi18nModel = new sap.ui.model.resource.ResourceModel({
	bundleUrl : "i18n/i18n.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(oi18nModel, "i18n");

sap.ui.localResources("vocab-web");

var oHeaderView = sap.ui.view({
	id:"headerViewID", 
	viewName:"vocab-web.header", 
	type:sap.ui.core.mvc.ViewType.JS
});
oHeaderView.placeAt("header");

var oLessonsVocablesView = sap.ui.view({
	id:"lessonsVocablesViewID", 
	viewName:"vocab-web.lessonsWithVocables", 
	type:sap.ui.core.mvc.ViewType.JS
});
oLessonsVocablesView.placeAt("content");

var oQuizView = new sap.ui.view({
	id: "quizViewID",
	viewName:"vocab-web.quiz", 
	type:sap.ui.core.mvc.ViewType.JS
});