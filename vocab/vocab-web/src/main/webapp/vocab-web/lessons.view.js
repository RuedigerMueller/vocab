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

		// Build toolbar
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
		
		// Edit lesson button
		var oExportLessonButton = new sap.ui.commons.Button({
			id : 'exportLessonButtonId',
			text : "{i18n>EXPORT}",
			press : function() {
				oController.exportLesson();
			},
			enabled : false,
		});

		// Add all the buttons to the toolbar
		var oToolbar = new sap.ui.commons.Toolbar({
			id : 'LessonsTableToolbarId',
			items : [ oQuizButton, oExamPrepButton, oDeleteButton, oEditVocablesButton, oExportLessonButton],
		});
		oLessonsTable.setToolbar(oToolbar);

		// Define table columns
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
		
		// Adding lessons
		// Lesson Title
		var oLessonTitleLabel = new sap.ui.commons.Label({
			text : '{i18n>LESSON_TITLE}'
		});
		var oLessonTitleField = new sap.ui.commons.TextField({
			id : 'lessonTitleFieldId',
			value : '',
			maxLength : 50,
			width : '400px'
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
			width : '160px'
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
			width : '160px'
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
		
		var oAddLessonPanel = new sap.ui.commons.Panel({
			id: 'addLessonPanelId',
			showCollapseIcon: false
		});
		oAddLessonPanel.setTitle(new sap.ui.core.Title({text: "{i18n>ADD_LESSON}"}));

		oAddLessonPanel.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({
			weight : 3
		}));
		
		var oAddLessonMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'addLessonMatrixId',
			layoutFixed : true,
			columns : 2,
			widths : ['160px', '400px'] 
			});
		
		oAddLessonMatrix.createRow(oLessonTitleLabel, oLessonTitleField);
		oAddLessonMatrix.createRow(oLearnedLanguageLabel, oLearnedLanguageField);
		oAddLessonMatrix.createRow(oKnownLanguageLabel, oKnownLanguageField);

		var oAddLessonMatrixCell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan: 2 });
		oAddLessonMatrixCell.addContent(oAddLessonButton);
		oAddLessonMatrix.createRow(oAddLessonMatrixCell);
		oAddLessonPanel.addContent(oAddLessonMatrix);
		
		// create the FileUploader control
		var oSimpleFileUploader = new sap.ui.commons.FileUploader({
			id: 'simpleFileUploaderId',
			name: "simpleUploader",          // name of the input type=file element within the form 
			uploadOnChange: true,             // do  immediately upload the file after selection
			buttonText: "{i18n>IMPORT}" 
		});
		
		oSimpleFileUploader.attachUploadComplete(function(oEvent) {
			if (oEvent["mParameters"]["response"] =="OK") {
				oController.getView().getModel().refresh();
			} else {
				sap.ui.commons.MessageBox.alert(oi18nModel.getProperty("FILE_UPLOAD_ERROR_MSG"), 
						null, oi18nModel.getProperty("FILE_UPLOAD_ERROR"));
			}
		});
		
		var oImportLessonPanel = new sap.ui.commons.Panel({
			id: 'importLessonPanelId',
			showCollapseIcon: false
		});
		oImportLessonPanel.setTitle(new sap.ui.core.Title({text: "{i18n>IMPORT_LESSON}"}));
		oImportLessonPanel.setLayoutData(new sap.ui.layout.ResponsiveFlowLayoutData({
			weight : 1
		}));
		oImportLessonPanel.addContent(oSimpleFileUploader);
		
		var oRFL = new sap.ui.layout.ResponsiveFlowLayout();
		oRFL.addContent(oAddLessonPanel);
		oRFL.addContent(oImportLessonPanel);
		
		var oLessonLayout = new sap.ui.layout.VerticalLayout("oAddLessonsForm", {
			content: [oLessonsTable, oRFL]
		});

		return oLessonLayout;
	},
});
