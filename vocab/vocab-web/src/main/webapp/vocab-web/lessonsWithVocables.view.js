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
			oController.lessonSelectionChange(oEvent, oVocablesTable);
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
			title : "{i18n>LESSON_LIST}",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			editable : true,
			selectionMode : sap.ui.table.SelectionMode.Single
		});
		
		// Lesson Title
		var oLessonTitleLabel = new sap.ui.commons.Label({
			text : '{i18n>LESSON_TITLE}'
		});
		var oLessonTitleField = new sap.ui.commons.TextField({
			id : 'lessonTitleFieldId',
			value : '',
			maxLength: 50,
			width: 'auto'
		});
		oLessonTitleLabel.setLabelFor(oLessonTitleField);
		
		// Learned Language
		var oLearnedLanguageLabel = new sap.ui.commons.Label({
			text : '{i18n>LEARNED_LANGUAGE}'
		});
		var oLearnedLanguageField = new sap.ui.commons.TextField({
			id : 'learnedLanguageFieldId',
			value : '',
			maxLength: 20,
			width: 'auto'
		});
		oLearnedLanguageLabel.setLabelFor(oLearnedLanguageField);

		// Known Language
		var oKnownLanguageLabel = new sap.ui.commons.Label({
			text : '{i18n>KNOWN_LANGUAGE}'
		});
		var oKnownLanguageField = new sap.ui.commons.TextField({
			id : 'KnownLanguageFieldId',
			value : '',
			maxLength: 20,
			width: 'auto'
		});
		oKnownLanguageLabel.setLabelFor(oKnownLanguageField);
		
		// add button 
		var oAddLessonButton = new sap.ui.commons.Button({
			id : 'addLessonButtonId',
			text : "{i18n>ADD_LESSON}",
			press : function() {

				oController.addNewLesson(
						sap.ui.getCore().getControl("lessonTitleFieldId").getValue(), 
						sap.ui.getCore().getControl("learnedLanguageFieldId").getValue(), 
						sap.ui.getCore().getControl("KnownLanguageFieldId").getValue()
						);
			}
		});
		var oHorizonalLayout = new sap.ui.layout.HorizontalLayout("LessonEntryLayout", {
			content: [oLessonTitleLabel, oLessonTitleField, 
			          oLearnedLanguageLabel, oLearnedLanguageField,
			          oKnownLanguageLabel, oKnownLanguageField, 
			          oAddLessonButton]
		});
		oLessonsTable.addExtension(oHorizonalLayout);
		
		
		// define the columns and the control templates to be used 
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LESSON_TITLE}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Title"),
			sortProperty : "Title",
			filterProperty : "Title",
			maxLength: 50
		}));
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LEARNED_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"LearnedLanguage"),
			sortProperty : "LearnedLanguage",
			filterProperty : "LearnedLanguage",
			maxLength: 20
		}));
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>KNOWN_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"KnownLanguage"),
			sortProperty : "KnownLanguage",
			filterProperty : "KnownLanguage",
			maxLength: 20
		}));
		
		// bind table rows to /Persons based on the model defined in the init method of the controller 
		oLessonsTable.bindRows("/Lessons");

		return oLessonsTable;
	},

	createVocablesTable: function(oController) {
		// Create an instance of the table control 
		var oVocablesTable = new sap.ui.table.Table({
			id: "VocablesTableID",
			title : "{i18n>VOCABLE_LIST}",
			visibleRowCount : 10,
			firstVisibleRow : 1,
			editable : true,
			selectionMode : sap.ui.table.SelectionMode.Single,
		});

		// first name field 
		var oLearnedLabel = new sap.ui.commons.Label({
			id: "learnedLabelID",
			text : "{i18n>LEARNED_LANGUAGE}"
		});
		var oLearnedField = new sap.ui.commons.TextField({
			id : 'learnedFieldId',
			value : '',
			maxLength: 50,
			width: 'auto'
		});
		oLearnedLabel.setLabelFor(oLearnedField);

		// last name field 
		var oKnownLabel = new sap.ui.commons.Label({
			text : '{i18n>KNOWN_LANGUAGE}'
		});
		var oKnownField = new sap.ui.commons.TextField({
			id : 'knownFieldId',
			value : '',
			maxLength: 50,
			width: 'auto'
		});
		oKnownLabel.setLabelFor(oKnownField);

		// add button 
		var oAddVocableButton = new sap.ui.commons.Button({
			id : 'addVocableButtonId',
			text : "{i18n>ADD_VOCABLE}",
			press : function() {

				oController.addNewVocable(
						sap.ui.getCore().getControl("learnedFieldId").getValue(), 
						sap.ui.getCore().getControl("knownFieldId").getValue(), 
						oVocablesTable);
			}
		});
		
		var oHorizonalLayout = new sap.ui.layout.HorizontalLayout("VocableEntryLayout", {
			content: [oLearnedLabel, oLearnedField, 
			          oKnownLabel, oKnownField, 
			          oAddVocableButton]
		});
		oVocablesTable.addExtension(oHorizonalLayout);


		// define the columns and the control templates to be used 
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LEARNED_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Learned"),
			sortProperty : "Learned",
			filterProperty : "Learned",
			maxLength: 50
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>KNOWN_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Known"),
			sortProperty : "Known",
			filterProperty : "Known",
			maxLength: 50
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LEVEL}"
			}),
			template : new sap.ui.commons.TextField().bindProperty("value",
					"Level"),
			sortProperty : "Level",
			filterProperty : "Level",
			maxLength: 50
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>DUE_DATE}"
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
			maxLength: 10
		}));

		return oVocablesTable;
	}
});
