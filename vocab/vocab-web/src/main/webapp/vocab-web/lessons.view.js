sap.ui.jsview("vocab-web.lessons", {

	/** Specifies the Controller belonging to this View. 
	 * In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	 * @memberOf vocab-web.lessonslist.
	 */
	getControllerName : function() {
		return "vocab-web.lessons";
	},


	
	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	 * Since the Controller is given to this method, its event handlers can be attached right away. 
	 * @memberOf vocab-web.lessons
	 */
	createContent : function(oController) {
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
			press : function() {oController.addNewLesson();}
		});
		
		// Quiz button 
		var oQuizButton = new sap.ui.commons.Button({
			id : 'quizButtonId',
			text : "{i18n>QUIZ}",
			press : function() {oController.quiz();}
		});
		
		var oHorizonalLayout = new sap.ui.layout.HorizontalLayout("LessonEntryLayout", {
			content: [oLessonTitleLabel, oLessonTitleField, 
			          oLearnedLanguageLabel, oLearnedLanguageField,
			          oKnownLanguageLabel, oKnownLanguageField, 
			          oAddLessonButton,
			          oQuizButton]
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
		oLessonsTable.bindRows({
			path: '/Lessons',
			filters: [new sap.ui.model.Filter("UserName", sap.ui.model.FilterOperator.EQ, "rmueller")]
		});

		//establish master detail relation
		oLessonsTable.attachRowSelectionChange(function(oEvent) {
			oController.lessonSelectionChange(oEvent);
		});
		
		return oLessonsTable;
	},
});
