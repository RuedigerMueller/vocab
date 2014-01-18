sap.ui.jsview("vocab-web.header", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf vocabulary.Header
	*/ 
	getControllerName : function() {
		return "vocab-web.header";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf vocabulary.Header
	*/ 
	createContent : function(oController) {
		//create the ApplicationHeader control
        var oAppHeader = new sap.ui.commons.ApplicationHeader({
        	id: "appHeader",
        	logoText: "{i18n>APP_TITLE}",
//        	logoSrc: "http://www.sap.com/global/images/SAPLogo.gif",
        	displayWelcome: true,
        	displayLogoff: true,
        }); 

        oAppHeader.setUserName("Rüdiger Müller");
        oAppHeader.attachLogoff(function(oEvent) {
			oController.logoff(oEvent);
		});

        return oAppHeader;
	}

});
