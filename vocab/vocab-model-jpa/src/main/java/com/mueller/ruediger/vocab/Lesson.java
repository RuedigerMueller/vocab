package com.mueller.ruediger.vocab;

import java.io.Serializable;

import javax.persistence.*;

import java.util.Collection;

@Entity
@NamedQuery(name = "AllLessons", query = "select l from Lesson l")
public class Lesson implements Serializable {

	private static final long serialVersionUID = 1L;

	public Lesson() {
	}

	@Id
	@GeneratedValue
	private long id;
	private String learnedLanguage;
	private String knownLanguage;
	private String title;
	@OneToMany
	private Collection<Vocable> vocables;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLearnedLanguage() {
		return learnedLanguage;
	}

	public void setLearnedLanguage(String param) {
		this.learnedLanguage = param;
	}

	public String getKnownLanguage() {
		return knownLanguage;
	}

	public void setKnownLanguage(String param) {
		this.knownLanguage = param;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String param) {
		this.title = param;
	}

	public Collection<Vocable> getVocables() {
		return vocables;
	}

	public void setVocables(Collection<Vocable> param) {
		this.vocables = param;
	}

}