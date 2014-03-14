sap.ui.jsview("vocab-web.lessons", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf vocab-web.lessonslist.
	 */
	getControllerName : function() {
		return "vocab-web.lessons";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf vocab-web.lessons
	 */
	createContent : function(oController) {
		// Create an instance of the table control
		var oLessonsTable = new sap.ui.table.Table({
			id : "LessonsTableID",
			title : "{i18n>LESSON_LIST}",
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
			maxLength : 50,
			width : 'auto'
		});
		oLessonTitleLabel.setLabelFor(oLessonTitleField);

		// Learned Language
		var oLearnedLanguageLabel = new sap.ui.commons.Label({
			text : '{i18n>LEARNED_LANGUAGE}'
		});
		var oLearnedLanguageField = new sap.ui.commons.TextField({
			id : 'learnedLanguageFieldId',
			value : '',
			maxLength : 20,
			width : 'auto'
		});
		oLearnedLanguageLabel.setLabelFor(oLearnedLanguageField);

		// Known Language
		var oKnownLanguageLabel = new sap.ui.commons.Label({
			text : '{i18n>KNOWN_LANGUAGE}'
		});
		var oKnownLanguageField = new sap.ui.commons.TextField({
			id : 'KnownLanguageFieldId',
			value : '',
			maxLength : 20,
			width : 'auto'
		});
		oKnownLanguageLabel.setLabelFor(oKnownLanguageField);

		// add button
		var oAddLessonButton = new sap.ui.commons.Button({
			id : 'addLessonButtonId',
			text : "{i18n>ADD_LESSON}",
			press : function() {
				oController.addNewLesson();
			}
		});

		var oHorizonalLayout = new sap.ui.layout.HorizontalLayout(
				"LessonEntryLayout", {
					content : [ oLessonTitleLabel, oLessonTitleField,
							oLearnedLanguageLabel, oLearnedLanguageField,
							oKnownLanguageLabel, oKnownLanguageField,
							oAddLessonButton, oQuizButton]
				});
		oLessonsTable.addExtension(oHorizonalLayout);

		// Quiz button
		var oQuizButton = new sap.ui.commons.Button({
			id : 'lessonQuizButtonId',
			text : "{i18n>QUIZ}",
			press : function() {
				oController.quiz();
			},
			enabled : false,
		});
		
		// Quiz button
		var oExamPrepButton = new sap.ui.commons.Button({
			id : 'lessonExamPrepButtonId',
			text : "{i18n>EXAM_PREP}",
			press : function() {
				oController.examPrep();
			},
			enabled : false,
		});

		// Delete lesson button
		var oDeleteButton = new sap.ui.commons.Button({
			id : 'deleteLessonButtonId',
			text : "{i18n>DELETE}",
			press : function() {
				oController.deleteLesson();
			},
			enabled : false,
		});

		// Edit lesson button
		var oEditVocablesButton = new sap.ui.commons.Button({
			id : 'editVocablesButtonId',
			text : "{i18n>EDIT_VOCABLES}",
			press : function() {
				oController.editVocables();
			},
			enabled : false,
		});
		
		// create the FileUploader control
		var oSimpleFileUploader = new sap.ui.commons.FileUploader({
			id: 'simpleFileUploaderId',
			name: "simpleUploader",          // name of the input type=file element within the form 
			uploadOnChange: false             // do not immediately upload the file after selection
		});
		
		oSimpleFileUploader.attachUploadComplete(function(oEvent) {
			if (oEvent["mParameters"]["response"] =="OK") {
				oController.getView().getModel().refresh();
			} else {
				sap.ui.commons.MessageBox.alert(oi18nModel.getProperty("FILE_UPLOAD_ERROR_MSG"), 
						null, oi18nModel.getProperty("FILE_UPLOAD_ERROR"));
			}
		});
		
		oSimpleFileUploader.attachChange(function(oEvent) {
			oTriggerButton.setEnabled(oSimpleFileUploader.getValue() != "");
		});
		
		// create a second button to trigger the upload
		var oTriggerButton = new sap.ui.commons.Button({
			text : "{i18n>IMPORT}",
			press : function() {
				// call the upload method
				oSimpleFileUploader.upload();
			},
			enabled : false,
		});

		var oToolbar = new sap.ui.commons.Toolbar({
			id : 'LessonsTableToolbarId',
			items : [ oQuizButton, oExamPrepButton, oDeleteButton, oEditVocablesButton, oSimpleFileUploader, oTriggerButton ],
		});
		oLessonsTable.setToolbar(oToolbar);

		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LESSON_TITLE}"
			}),
			template : new sap.ui.commons.TextField().bindValue("Title")
					.attachChange(function() {
						this.getModel().submitChanges();
					}),
			sortProperty : "Title",
			filterProperty : "Title",
			maxLength : 50
		}));
		
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LEARNED_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindValue(
					"LearnedLanguage").attachChange(function() {
				this.getModel().submitChanges();
			}),
			sortProperty : "LearnedLanguage",
			filterProperty : "LearnedLanguage",
			maxLength : 20
		}));
		
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>KNOWN_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField()
					.bindValue("KnownLanguage").attachChange(function() {
						this.getModel().submitChanges();
					}),
			sortProperty : "KnownLanguage",
			filterProperty : "KnownLanguage",
			maxLength : 20
		}));
		
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>NUMBER_VOCABLES}"
			}),
			template : new sap.ui.commons.TextField()
					.bindValue("NumberVocables").setEditable(false),
			sortProperty : "NumberVocables",
			filterProperty : "NumberVocables",
			maxLength : 10
		}));
		
		oLessonsTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>NUMBER_DUE_VOCABLES}"
			}),
			template : new sap.ui.commons.TextField()
					.bindValue("NumberDueVocables").setEditable(false),
			sortProperty : "NumberDueVocables",
			filterProperty : "NumberDueVocables",
			maxLength : 10
		}));

		// establish master detail relation
		oLessonsTable.attachRowSelectionChange(function(oEvent) {
			oController.lessonSelectionChange(oEvent);
		});

		return oLessonsTable;
	},
});
