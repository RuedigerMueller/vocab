package com.mueller.ruediger.vocab.web;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

import com.mueller.ruediger.vocab.web.pageobjects.LessonsPage;

public class LessonsIT extends UiTestBase {

	@Test
	public void testCreateReview() {
		driver.get(serverUrl + applicationPath);
		LessonsPage lessonsPage = LessonsPage.create(driver);

		lessonsPage.setLessonTitle("Lesson 1");
		lessonsPage.setLearnedLanguage("English");
		lessonsPage.setKnownLanguage("Deutsch");
		lessonsPage = lessonsPage.addLesson();
		assertEquals("Lesson title Lesson 1 was not added", "Lesson 1",
				lessonsPage.getLearnedLanguageInFirstRowOfList());
		assertEquals("Learned language English was not added", "English",
				lessonsPage.getLearnedLanguageInFirstRowOfList());
		assertEquals("Known language Deutsch was not added", "Deutsch",
				lessonsPage.getKnownLanguageInFirstRowOfList());
	}
}
