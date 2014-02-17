package com.mueller.ruediger.vocab.web.pageobjects;

import static org.junit.Assert.assertEquals;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends PageObject {

	@FindBy(id = "j_username")
	protected WebElement userName;
	
	@FindBy(id = "j_password")
	protected WebElement password;

	@FindBy(name = "login")
	protected WebElement loginButton;

	public LoginPage(WebDriver driver) {
		super(driver);
	}

	public static LoginPage create(final WebDriver driver) {
		return PageObject.create(driver, LoginPage.class);
	}

	@Override
	protected boolean isCurrentPage() {
		return true;
	}

	public String getUserName() {
		return userName.getAttribute("value");
	}
	
	public String getPassword() {
		return password.getAttribute("value");
	}
	public void setUserName(String text) {
		userName.clear();
		userName.sendKeys(text);
		assertEquals(text, getUserName());
	}
	
	public void setPassword(String text) {
		password.clear();
		password.sendKeys(text);
		assertEquals(text, getPassword());
	}

	public LoginPage login() {
		loginButton.click();
		return LoginPage.create(driver);
	}
}