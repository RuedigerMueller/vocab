package com.mueller.ruediger.vocab;

import java.io.Serializable;
import java.util.Calendar;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import com.mueller.ruediger.vocab.Lesson;
import javax.persistence.ManyToOne;
import javax.persistence.Access;
import static javax.persistence.AccessType.FIELD;
import static javax.persistence.CascadeType.ALL;
import static javax.persistence.FetchType.EAGER;

@Entity
@NamedQuery(name = "AllVocables", query = "select v from Vocable v")
@Table(name = "T_VOCABLE")
@Access(FIELD)
public class Vocable implements Serializable {

	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue
	@Column(name = "ID")
	private long id;
	
	@Column(length = 50, name = "LEARNED")
	private String learned;
	
	@Column(length = 50, name = "KNOWN")
	private String known;
	
	@Column(name = "LEVEL", length = 1)
	private Integer level;
	
	@Basic
	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "DUE_DATE")
	private Calendar dueDate;

	@ManyToOne(fetch = EAGER, optional = false, targetEntity = com.mueller.ruediger.vocab.Lesson.class)
	private Lesson owner;

	public Vocable() {

	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getLearned() {
		return learned;
	}

	public void setLearned(String param) {
		this.learned = param;
	}

	public String getKnown() {
		return known;
	}

	public void setKnown(String param) {
		this.known = param;
	}

	public Integer getLevel() {
		return level;
	}

	public void setLevel(Integer param) {
		this.level = param;
	}

	public Calendar getDueDate() {
		return dueDate;
	}

	public void setDueDate(Calendar param) {
		this.dueDate = param;
	}

	public Lesson getOwner() {
	    return owner;
	}

	public void setOwner(Lesson lesson) {
	    this.owner = lesson;
	    if (!lesson.getVocables().contains(this)) {
	    	lesson.getVocables().add(this); }
	}


}