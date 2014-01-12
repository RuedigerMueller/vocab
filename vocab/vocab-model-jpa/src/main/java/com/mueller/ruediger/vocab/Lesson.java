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
import javax.persistence.Access;
import static javax.persistence.AccessType.FIELD;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.LAZY;

@Entity
@NamedQuery(name = "AllLessons", query = "select l from Lesson l")
@Table(name = "T_LESSON")
@Access(FIELD)
public class Lesson implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private long id;
	
	@Column(length = 20, name = "LEARNED_LANGUAGE")
	private String learnedLanguage;
	@Column(length = 20, name = "KNOWN_LANGUAGE")
	private String knownLanguage;
	@Column(length = 50, name = "LESSON")
	private String title;

	@OneToMany(cascade = ALL, fetch = LAZY, orphanRemoval = true, mappedBy = "owner", targetEntity = com.mueller.ruediger.vocab.Vocable.class)
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
		if (vocable.getOwner() != this) {
			vocable.setOwner(this);
		}
	}

	public Collection<Vocable> getVocables() {
	    return vocables;
	}

	public void setVocables(Collection<Vocable> param) {
	    this.vocables = param;
	}

}