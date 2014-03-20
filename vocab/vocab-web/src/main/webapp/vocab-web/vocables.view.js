sap.ui.jsview("vocab-web.vocables", {

	/**
	 * Specifies the Controller belonging to this View. In the case that it is
	 * not implemented, or that "null" is returned, this View does not have a
	 * Controller.
	 * 
	 * @memberOf vocab-web.lessonslist.
	 */
	getControllerName : function() {
		return "vocab-web.vocables";
	},

	/**
	 * Is initially called once after the Controller has been instantiated. It
	 * is the place where the UI is constructed. Since the Controller is given
	 * to this method, its event handlers can be attached right away.
	 * 
	 * @memberOf vocab-web.vocables
	 */
	createContent : function(oController) {
		// Create an instance of the table control
		var oVocablesTable = new sap.ui.table.Table({
			id : "VocablesTableID",
			title : "{i18n>VOCABLE_LIST}",
			editable : true,
			selectionMode : sap.ui.table.SelectionMode.Single,
		});

		// Quiz button
		var oQuizButton = new sap.ui.commons.Button({
			id : 'vocableQuizButtonId',
			text : "{i18n>QUIZ}",
			press : function() {
				oController.quiz();
			},
		});
		
		// Exam prep button
		var oExamPrepButton = new sap.ui.commons.Button({
			id : 'vocableExamPrepButtonId',
			text : "{i18n>EXAM_PREP}",
			press : function() {
				oController.examPrep();
			},
		});

		// Delete lesson button
		var oDeleteButton = new sap.ui.commons.Button({
			id : 'deleteVocableButtonId',
			text : "{i18n>DELETE}",
			press : function() {
				oController.deleteVocable();
			},
			enabled : false,
		});

		// Done editing button
		var oDoneEditingButton = new sap.ui.commons.Button({
			id : 'doneEditingButtonId',
			text : "{i18n>DONE_EDITING}",
			press : function() {
				oController.doneEditing();
			}
		});

		var oToolbar = new sap.ui.commons.Toolbar({
			id : 'VocablesTableToolbarId',
			items : [ oQuizButton, oExamPrepButton, oDeleteButton, oDoneEditingButton ],
		});
		oVocablesTable.setToolbar(oToolbar);

		// define the columns and the control templates to be used
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				id : "VocableLearnedColumnID",
				text : "{i18n>LEARNED_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindValue("Learned")
			.attachChange(function() {
				this.getModel().submitChanges();
			}),
			sortProperty : "Learned",
			filterProperty : "Learned",
			maxLength : 50
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				id : "VocableKnownColumnID",
				text : "{i18n>KNOWN_LANGUAGE}"
			}),
			template : new sap.ui.commons.TextField().bindValue("Known")
			.attachChange(function() {
				this.getModel().submitChanges();
			}),
			sortProperty : "Known",
			filterProperty : "Known",
			maxLength : 50
		}));
		oVocablesTable.addColumn(new sap.ui.table.Column({
			label : new sap.ui.commons.Label({
				text : "{i18n>LEVEL}"
			}),
			template : new sap.ui.commons.TextField().bindValue("Level").setEditable(false),
			sortProperty : "Level",
			filterProperty : "Level",
			maxLength : 50
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
							// return (oDate.toLocaleDateString() + " " +
							// oDate.toLocaleTimeString());
							return (oDate.toLocaleDateString());
						} else {
							return "Date conversion error";
						}
					}
				},
				editable: false,
			}),
			sortProperty : "DueDate",
			filterProperty : "DueDate",
			maxLength : 10
		}));
		
		// establish master detail relation
		oVocablesTable.attachRowSelectionChange(function(oEvent) {
			oController.vocableSelectionChange(oEvent);
		});
		
		// Learned Language field
		var oLearnedLabel = new sap.ui.commons.Label({
			id : "learnedLabelID",
			text : "{i18n>LEARNED_LANGUAGE}"
		});

		var oLearnedField = new sap.ui.commons.TextField({
			id : 'learnedFieldId',
			value : '',
			maxLength : 50,
			width: '400px'
		});
		oLearnedLabel.setLabelFor(oLearnedField);

		// Known Language field
		var oKnownLabel = new sap.ui.commons.Label({
			id : "knownLabelID",
			text : '{i18n>KNOWN_LANGUAGE}'
		});
		var oKnownField = new sap.ui.commons.TextField({
			id : 'knownFieldId',
			value : '',
			maxLength : 50,
			width: '400px'
		});
		oKnownLabel.setLabelFor(oKnownField);

		// add button
		var oAddVocableButton = new sap.ui.commons.Button({
			id : "addVocableButtonId",
			text : "{i18n>ADD_VOCABLE}",
			press : function() {
				oController.addNewVocable();
			}
		});
		
		var oAddVocablePanel = new sap.ui.commons.Panel({
			id: "addVocablePanelId",
			showCollapseIcon: false
		});
		oAddVocablePanel.setTitle(new sap.ui.core.Title({text: "{i18n>ADD_VOCABLE}"}));
		
		var oAddVocableMatrix = new sap.ui.commons.layout.MatrixLayout({
			id : 'addVocableMatrixId',
			layoutFixed : true,
			columns : 2,
			widths : ['160px', '400px'] 
			});
		
		oAddVocableMatrix.createRow(oLearnedLabel, oLearnedField);
		oAddVocableMatrix.createRow(oKnownLabel, oKnownField);

		var oAddVocableMatrixCell = new sap.ui.commons.layout.MatrixLayoutCell({
			colSpan: 2 });
		oAddVocableMatrixCell.addContent(oAddVocableButton);
		oAddVocableMatrix.createRow(oAddVocableMatrixCell);
		oAddVocablePanel.addContent(oAddVocableMatrix	);
		
		var oRFL = new sap.ui.layout.ResponsiveFlowLayout();
		oRFL.addContent(oAddVocablePanel);

		var oVocableLayout = new sap.ui.layout.VerticalLayout("VocablessLayout", {
			content: [oVocablesTable, oRFL]
		});

		return oVocableLayout;
	},
});
