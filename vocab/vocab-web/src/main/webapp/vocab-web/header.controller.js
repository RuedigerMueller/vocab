sap.ui.controller("vocab-web.header", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf vocabulary.Header
*/
	onInit: function() {
		var oJSONModel = new sap.ui.model.json.JSONModel();
		var JSONURL = window.location.protocol + "//"
			+ window.location.hostname
			+ (window.location.port ? ":" + window.location.port : "")
			+ "/vocab-web/UserInfo";
		
		oJSONModel.loadData(JSONURL);
		this.getView().setModel(oJSONModel);
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf vocabulary.Header
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf vocabulary.Header
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf vocabulary.Header
*/
//	onExit: function() {
//
//	}
	
	logoff: function(oEvent) {
		var ajaxURL = window.location.protocol + "//"
			+ window.location.hostname
			+ (window.location.port ? ":" + window.location.port : "")
			+ "/vocab-web/LogoutServlet";
		jQuery.ajax({
			url : ajaxURL,
			type : 'GET',
		});
		
		window.location=ajaxURL;
	},
});