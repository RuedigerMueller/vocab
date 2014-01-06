package com.mueller.ruediger.vocab;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
//import java.util.Collection;
import com.mueller.ruediger.vocab.Vocable;
import java.util.Collection;
import javax.persistence.OneToMany;

@Entity
@NamedQuery(name = "AllLessons", query = "select l from Lesson l")
@Table(name = "T_LESSON")
public class Lesson implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	private long id;
	
	@Column(length = 20)
	private String learnedLanguage;
	@Column(length = 20)
	private String knownLanguage;
	@Column(length = 50)
	private String title;

	@OneToMany(mappedBy = "lesson")
	private Collection<Vocable> vocables;

	public Lesson() {
		
	}	

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

	public void addVocable(Vocable vocable) {
		this.vocables.add(vocable);
		if (vocable.getLesson() != this) {
			vocable.setLesson(this);
		}
	}

	public Collection<Vocable> getVocables() {
	    return vocables;
	}

	public void setVocables(Collection<Vocable> param) {
	    this.vocables = param;
	}

}