package com.mueller.ruediger.vocab;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.NamedQuery;

@Entity
@NamedQuery(name = "AllVocables", query = "select v from Vocable v")
public class Vocable implements Serializable {

	private static final long serialVersionUID = 1L;

	public Vocable() {
	}

	@Id
	@GeneratedValue
	private long id;
	private String learned;
	private String known;
	private Integer level;
	private Date dueDate;

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

	public Date getDueDate() {
		return dueDate;
	}

	public void setDueDate(Date param) {
		this.dueDate = param;
	}

}