sap.ui.jsview("vocab-web.lessonsWithVocables", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf vocab-web.lessonslist.
	 */
	getControllerName : function() {
		return "vocab-web.lessonsWithVocables";
	},


	
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf vocab-web.lessonsWithVocables
	 */
	createContent : function(oController) {
		var oLessonsTable =  this.createLessonsTable(oController);
		var oVocablesTable = this.createVocablesTable(oController);

		//establish master detail relation
		oLessonsTable.attachRowSelectionChange(function(oEvent) {
			var selectedRowContext = oEvent.getParameter("rowContext");
			
			// Bind Vocables table to selected row
			var selectedLessonIDVocables = selectedRowContext + "/VocableDetails";
			oVocablesTable.bindRows(selectedLessonIDVocables);
			
		});
		var oLayout = new sap.ui.layout.VerticalLayout("LessonsWithVocablesLayout", {
	        content: [oLessonsTable, oVocablesTable]
		});
		
		return oLayout;
	},
	
	createLessonsTable: function(oController) {
		// Create an instance of the table control 
		var oLessonsTable = new sap.ui.table.Table({
			id: "LessonsTableID",
			title : "Lessons List",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			selectionMode : sap.ui.table.SelectionMode.Single
		});

		// toolbar 
		var oLessonsTableToolbar = new sap.ui.commons.Toolbar();

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

		oLessonsTableToolbar.addItem(oLessonTitleLabel);
		oLessonsTableToolbar.addItem(oLessonTitleField);
		
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

		oLessonsTableToolbar.addItem(oLearnedLanguageLabel);
		oLessonsTableToolbar.addItem(oLearnedLanguageField);

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

		oLessonsTableToolbar.addItem(oKnownLanguageLabel);
		oLessonsTableToolbar.addItem(oKnownLanguageField);
		
		// add button 
		var oAddLessonButton = new sap.ui.commons.Button({
			id : 'addLessonButtonId',
			text : "Add Lesson",
			press : function() {

				oController.addNewLesson(
						sap.ui.getCore().getControl("lessonTitleFieldId").getValue(), 
						sap.ui.getCore().getControl("learnedLanguageFieldId").getValue(), 
						sap.ui.getCore().getControl("KnownLanguageFieldId").getValue(), 
						oLessonsTable);
			}
		});
		oLessonsTableToolbar.addItem(oAddLessonButton);

		oLessonsTable.setToolbar(oLessonsTableToolbar);

		// define the columns and the control templates to be used 
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Title"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Title"),
			sortProperty : "Title",
			filterProperty : "Title",
			width : "100px"
		}));
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "Learned Language"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"LearnedLanguage"),
			sortProperty : "LearnedLanguage",
			filterProperty : "LearnedLanguage",
			width : "100px"
		}));
		oLessonsTable.addColumn(new sap.ui.table.Column({
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
		oLessonsTable.bindRows("/Lessons");

		return oLessonsTable;
	},

	createVocablesTable: function(oController) {
		// Create an instance of the table control 
		var oVocablesTable = new sap.ui.table.Table({
			id: "VocablesTableID",
			title : "Vocable List",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			selectionMode : sap.ui.table.SelectionMode.Single,
		});

		// toolbar 
		var oVocablesTableToolbar = new sap.ui.commons.Toolbar();

		// first name field 
		var oLearnedLabel = new sap.ui.commons.Label({
			id: "learnedLabelID",
			text : "Learned Language"
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
			template : new sap.ui.commons.TextField({
				value : {
					path : "DueDate",
					formatter : function formatDisplayDateTime(d) {
						if (d != null) {
							var oDate = new Date(d);
							//return (oDate.toLocaleDateString() + " " + oDate.toLocaleTimeString());
							return (oDate.toLocaleDateString());
						} else {
							return "Date conversion error";
						}
					}
				}
			}),
			sortProperty : "DueDate",
			filterProperty : "DueDate",
			width : "75px"
		}));
		

		// bind table rows to /Lessons based on the model defined in the init method of the controller 
		//oVocablesTable.bindRows("/Vocables");

		return oVocablesTable;
	}
});
