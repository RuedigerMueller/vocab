package com.mueller.ruediger.vocab.web.pageobjects;

import static org.junit.Assert.assertEquals;

//import java.util.List;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import java.util.concurrent.TimeUnit;

//import com.google.common.base.Function;

/**
 * Page object for Lessons view
 */
public class LessonsPage extends PageObject {

	@FindBy(id = "lessonTitleFieldId")
	protected WebElement lessonTitle;
	
	@FindBy(id = "learnedLanguageFieldId")
	protected WebElement learnedLanguage;

	@FindBy(id = "KnownLanguageFieldId")
	protected WebElement knownLanguage;

	@FindBy(id = "addLessonButtonId")
	protected WebElement addLessonButton;

	@FindBy(id = "__field0-col0-row0")
	private WebElement lessonTitleInFirstRowOfList;

	@FindBy(id = "__field1-col1-row0")
	private WebElement learnedLanguageInFirstRowOfList;
	
	@FindBy(id = "__field2-col2-row0")
	private WebElement knownLanguageInFirstRowOfList;
/*
	@FindBy(id = "__alert0--btn-OK")
	private List<WebElement> submitConfirmOkButton;
*/
	public LessonsPage(WebDriver driver) {
		super(driver);
	}

	public static LessonsPage create(final WebDriver driver) {
		return PageObject.create(driver, LessonsPage.class);
	}

	@Override
	protected boolean isCurrentPage() {
		return true;
	}

	public String getLessonTitle() {
		return lessonTitle.getAttribute("value");
	}

	public String getLessonTitleInFirstRowOfList() {
		return lessonTitleInFirstRowOfList.getAttribute("value");
	}
	
	public String getLearnedLanguage() {
		return learnedLanguage.getAttribute("value");
	}

	public String getLearnedLanguageInFirstRowOfList() {
		return learnedLanguageInFirstRowOfList.getAttribute("value");
	}

	public String getKnownLanguage() {
		return knownLanguage.getAttribute("value");
	}

	public String getKnownLanguageInFirstRowOfList() {
		return knownLanguageInFirstRowOfList.getAttribute("value");
	}

	public void setLessonTitle(String text) {
		lessonTitle.clear();
		lessonTitle.sendKeys(text);
		assertEquals(text, getLessonTitle());
	}
	
	public void setLearnedLanguage(String text) {
		learnedLanguage.clear();
		learnedLanguage.sendKeys(text);
		assertEquals(text, getLearnedLanguage());
	}

	public void setKnownLanguage(String text) {
		knownLanguage.clear();
		knownLanguage.sendKeys(text);
		assertEquals(text, getKnownLanguage());
	}

	public LessonsPage addLesson() {
		addLessonButton.click();
		driver.manage().timeouts().implicitlyWait(10, TimeUnit.SECONDS);
		//waitUntil(submitConfirmationIsShown());
		//submitConfirmOkButton.get(0).click();
		return LessonsPage.create(driver);
	}
/*
	private Function<WebDriver, Boolean> submitConfirmationIsShown() {
		return new Function<WebDriver, Boolean>() {
			@Override
			public Boolean apply(final WebDriver driver) {
				return !submitConfirmOkButton.isEmpty();
			}
		};
	}
*/
}