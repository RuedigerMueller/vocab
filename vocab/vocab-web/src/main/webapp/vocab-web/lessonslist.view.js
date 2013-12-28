sap.ui.jsview("vocab-web.lessonslist", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf vocab-web.lessonslist.
	 */
	getControllerName : function() {
		return "vocab-web.lessonslist";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf vocab-web.lessonslist
	 */
	createContent : function(oController) {
		// Create an instance of the table control 
		var oTable = new sap.ui.table.Table({
			title : "Lessons List",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			selectionMode : sap.ui.table.SelectionMode.Single,
		});

		// toolbar 
		var oTableToolbar = new sap.ui.commons.Toolbar();

		// Lesson Title
		var oLessonTitleLabel = new sap.ui.commons.Label({
			text : 'Lesson Title'
		});
		var oLessonTitleField = new sap.ui.commons.TextField({
			id : 'lessonTitleFieldId',
			value : '',
			width : '10em',
		});
		oLessonTitleLabel.setLabelFor(oLessonTitleField);

		oTableToolbar.addItem(oLessonTitleLabel);
		oTableToolbar.addItem(oLessonTitleField);
		
		// Learned Language
		var oLearnedLanguageLabel = new sap.ui.commons.Label({
			text : 'Learned Language'
		});
		var oLearnedLanguageField = new sap.ui.commons.TextField({
			id : 'learnedLanguageFieldId',
			value : '',
			width : '10em',
		});
		oLearnedLanguageLabel.setLabelFor(oLearnedLanguageField);

		oTableToolbar.addItem(oLearnedLanguageLabel);
		oTableToolbar.addItem(oLearnedLanguageField);

		// Known Language
		var oKnownLanguageLabel = new sap.ui.commons.Label({
			text : 'Known Language'
		});
		var oKnownLanguageField = new sap.ui.commons.TextField({
			id : 'KnownLanguageFieldId',
			value : '',
			width : '10em',
		});
		oKnownLanguageLabel.setLabelFor(oKnownLanguageField);

		oTableToolbar.addItem(oKnownLanguageLabel);
		oTableToolbar.addItem(oKnownLanguageField);
		
		// add button 
		var oAddLessonButton = new sap.ui.commons.Button({
			id : 'addLessonButtonId',
			text : "Add Lesson",
			press : function() {

				oController.addNewLesson(
						sap.ui.getCore().getControl("lessonTitleFieldId").getValue(), 
						sap.ui.getCore().getControl("learnedLanguageFieldId").getValue(), 
						sap.ui.getCore().getControl("KnownLanguageFieldId").getValue(), 
						oTable);
			}
		});
		oTableToolbar.addItem(oAddLessonButton);

		oTable.setToolbar(oTableToolbar);

		// define the columns and the control templates to be used 
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Title"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Title"),
			sortProperty : "Title",
			filterProperty : "Title",
			width : "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Learned Language"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"LearnedLanguage"),
			sortProperty : "LearnedLanguage",
			filterProperty : "LearnedLanguage",
			width : "100px"
		}));
		oTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "KnownLanguage"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"KnownLanguage"),
			sortProperty : "KnownLanguage",
			filterProperty : "KnownLanguage",
			width : "100px"
		}));
		
		// bind table rows to /Persons based on the model defined in the init method of the controller 
		oTable.bindRows("/Lessons");

		return oTable;
	}

});
