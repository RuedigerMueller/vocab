sap.ui.jsview("vocab-web.vocableslist", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf vocab-web.vocableslist
	 */
	getControllerName : function() {
		return "vocab-web.vocableslist";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf vocab-web.vocableslist
	 */
	createContent : function(oController) {
		// Create an instance of the table control 
		var oVocablesTable = new sap.ui.table.Table({
			title : "Vocable List",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			selectionMode : sap.ui.table.SelectionMode.Single,
		});

		// toolbar 
		var oVocablesTableToolbar = new sap.ui.commons.Toolbar();

		// first name field 
		var oLearnedLabel = new sap.ui.commons.Label({
			text : 'Learned Language'
		});
		var oLearnedField = new sap.ui.commons.TextField({
			id : 'learnedFieldId',
			value : '',
			width : '10em',
		});
		oLearnedLabel.setLabelFor(oLearnedField);

		oVocablesTableToolbar.addItem(oLearnedLabel);
		oVocablesTableToolbar.addItem(oLearnedField);

		// last name field 
		var oKnownLabel = new sap.ui.commons.Label({
			text : 'Known Language'
		});
		var oKnownField = new sap.ui.commons.TextField({
			id : 'knownFieldId',
			value : '',
			width : '10em',
		});
		oKnownLabel.setLabelFor(oKnownField);

		oVocablesTableToolbar.addItem(oKnownLabel);
		oVocablesTableToolbar.addItem(oKnownField);

		// add button 
		var oAddVocableButton = new sap.ui.commons.Button({
			id : 'addVocableButtonId',
			text : "Add Vocable",
			press : function() {

				oController.addNewVocable(
						sap.ui.getCore().getControl("learnedFieldId").getValue(), 
						sap.ui.getCore().getControl("knownFieldId").getValue(), 
						oVocablesTable);
			}
		});
		oVocablesTableToolbar.addItem(oAddVocableButton);

		oVocablesTable.setToolbar(oVocablesTableToolbar);

		// define the columns and the control templates to be used 
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Learned"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Learned"),
			sortProperty : "Learned",
			filterProperty : "Learned",
			width : "150px"
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Known"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Known"),
			sortProperty : "Known",
			filterProperty : "Known",
			width : "150px"
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Level"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Level"),
			sortProperty : "Level",
			filterProperty : "Level",
			width : "50px"
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Due Date"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"DueDate"),
			sortProperty : "DueDate",
			filterProperty : "DueDate",
			width : "75px"
		}));
		

		// bind table rows to /Persons based on the model defined in the init method of the controller 
		oVocablesTable.bindRows("/Vocables");

		return oVocablesTable;
	}

});
