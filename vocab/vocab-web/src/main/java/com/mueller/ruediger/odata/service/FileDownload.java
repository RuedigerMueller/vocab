package com.mueller.ruediger.odata.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.mueller.ruediger.vocab.Lesson;
import com.mueller.ruediger.vocab.Vocable;

/**
 * Servlet implementation class FileDownload
 */
public class FileDownload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileDownload() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		try {
			long lessonID = Long.valueOf(request.getParameter("LessonID")).longValue();
	
			
			// Write the CSV to the response writer
			PrintWriter writer = response.getWriter();
			
			// Get an entity manager to be able to read the lesson from the DB
			EntityManagerFactory emf = JpaEntityManagerFactory
					.getEntityManagerFactory();
			EntityManager em = emf.createEntityManager();

			//Get the lesson from the database
			Query query = em.createQuery("Select l from Lesson l where l.id = :id");
			query.setParameter("id", lessonID);			
			Lesson lesson = (Lesson) query.getSingleResult();
			
			// Set response header
			response.setHeader("Content-Type", "text/csv");
			response.setHeader("Content-Disposition", "attachment; filename=\""
								+ lesson.getTitle() + ".csv" + "\"");
			
			// Define separator and quote in one central place
			String sep = ";";
			String quote ="\"";
			
			// make sure the file can easily be opened in Excel independent of
			// the locale of the user
			writer.append("sep=");
			writer.append(sep);
			writer.append('\n');
			
			// Column headers
			writer.append(quote);
			writer.append(lesson.getLearnedLanguage());
			writer.append(quote);
			writer.append(sep);
			writer.append(quote);
			writer.append(lesson.getKnownLanguage());
			writer.append(quote);
			writer.append(sep);
			writer.append(quote);
			writer.append("Level");
			writer.append(quote);
			writer.append(sep);
			writer.append(quote);
			writer.append("Due Date");
			writer.append(quote);
			writer.append('\n');
			
			//Write the individual vocables
			SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
			for (Vocable vocable : lesson.getVocables()) {
				writer.append(quote);
				writer.append(vocable.getLearned());
				writer.append(quote);
				writer.append(sep);
				writer.append(quote);
				writer.append(vocable.getKnown());
				writer.append(quote);
				writer.append(sep);
				writer.append(quote);
				writer.append(String.valueOf(vocable.getLevel()));
				writer.append(quote);
				writer.append(sep);
				writer.append(quote);
				writer.append(sdf.format(vocable.getDueDate().getTime()));
				writer.append(quote);
				writer.append('\n');
			}
			
			writer.flush();
			writer.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
