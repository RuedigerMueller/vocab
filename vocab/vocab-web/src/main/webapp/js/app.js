// Internationalization:
// create global i18n resource bundle for texts in application UI
oi18nModel = new sap.ui.model.resource.ResourceModel({
	bundleUrl : "i18n/i18n.properties",
	locale : sap.ui.getCore().getConfiguration().getLanguage()
});
sap.ui.getCore().setModel(oi18nModel, "i18n");

sap.ui.localResources("vocab-web");

var view = sap.ui.view({
	id:"idheader", 
	viewName:"vocab-web.header", 
	type:sap.ui.core.mvc.ViewType.JS
});
view.placeAt("header");

var view = sap.ui.view({
	id:"idlessonswithvocables", 
	viewName:"vocab-web.lessonsWithVocables", 
	type:sap.ui.core.mvc.ViewType.JS
});
view.placeAt("content");