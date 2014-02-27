package com.mueller.ruediger.odata.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
import org.apache.commons.fileupload.disk.DiskFileItemFactory;
import org.apache.commons.fileupload.servlet.FileCleanerCleanup;
import org.apache.commons.fileupload.servlet.ServletFileUpload;
import org.apache.commons.io.FileCleaningTracker;

import com.mueller.ruediger.vocab.Lesson;
import com.mueller.ruediger.vocab.Vocable;

import au.com.bytecode.opencsv.CSVReader;


/**
 * Servlet implementation class FileUpload
 */
public class FileUpload extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public FileUpload() {
		super();
		// TODO Auto-generated constructor stub
	}

	private ServletFileUpload uploader = null;
	@Override
	public void init() throws ServletException{
		FileCleaningTracker fileCleaningTracker = FileCleanerCleanup.getFileCleaningTracker(getServletContext());
		DiskFileItemFactory fileFactory = new DiskFileItemFactory();
		File filesDir = (File) getServletContext().getAttribute("FILES_DIR_FILE");
		fileFactory.setRepository(filesDir);
		fileFactory.setFileCleaningTracker(fileCleaningTracker);
		this.uploader = new ServletFileUpload(fileFactory);
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// not implemented
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		if(!ServletFileUpload.isMultipartContent(request)){
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			throw new ServletException("Content type is not multipart/form-data");
		}

		response.setContentType("text/html");
		PrintWriter out = response.getWriter();
		out.write("<html><head></head><body>");
		try {
			List<FileItem> fileItemsList = uploader.parseRequest(request);
			Iterator<FileItem> fileItemsIterator = fileItemsList.iterator();

			EntityManagerFactory emf = JpaEntityManagerFactory
					.getEntityManagerFactory();
			EntityManager em = emf.createEntityManager();

			Calendar dueDate = Calendar.getInstance(); 

			while(fileItemsIterator.hasNext()){
				FileItem fileItem = fileItemsIterator.next();

				if (fileItem.isFormField()) continue;

				File file = new File(request.getServletContext().getAttribute("FILES_DIR")+File.separator+fileItem.getName());
				//System.out.println("Absolute Path at server="+file.getAbsolutePath());
				fileItem.write(file);

				// start a transaction
				em.getTransaction().begin();

				// File contains comma separated entries, individual entries not embedded in any "" or ''
				CSVReader reader = new CSVReader(new InputStreamReader(new FileInputStream(file), "UTF-8"));
				
				String [] nextLine;
				boolean firstLine = true;
				Lesson lesson = null;

				// Loop over all lines
				while ((nextLine = reader.readNext()) != null) {
					// nextLine[] is an array of values from the line
					//System.out.println(nextLine[0] + " - " + nextLine[1] + " - " + nextLine[2]);

					// First line of CSV file contains information on lesson
					if (firstLine) {
						firstLine = false;
						lesson = new Lesson();
						lesson.setTitle(fileItem.getName());
						lesson.setKnownLanguage(nextLine[0]);
						lesson.setLearnedLanguage(nextLine[1]);
						lesson.setUserName(request.getUserPrincipal().getName());
						// all other lines contain vocables
					} else {
						Vocable vocable = new Vocable();
						vocable.setKnown(nextLine[0]);
						vocable.setLearned(nextLine[1]);
						vocable.setLevel(1);
						vocable.setDueDate(dueDate);

						try {
							vocable.setLevel(Integer.parseInt(nextLine[2]));
						}
						catch (Exception e) {
							vocable.setLevel(1);
						}
						
						try {
							DateFormat formatter = new SimpleDateFormat("dd.MM.yyyy");
							Date date = formatter.parse(nextLine[3]);
							Calendar calendar = Calendar.getInstance();
							calendar.setTime(date);
							vocable.setDueDate(calendar);
						}
						catch (Exception e) {
							vocable.setDueDate(dueDate);
						}
						
						vocable.setOwner(lesson);
						lesson.addVocable(vocable);
						em.persist(vocable);
					}
				}
				// close reader 
				reader.close();

				// persist lesson and commit transaction
				em.persist(lesson);
				em.getTransaction().commit();

				// delete temporary file
				fileItem.delete();
			}
			em.close();
			out.write("OK");
			response.setStatus(HttpServletResponse.SC_OK);

		} catch (FileUploadException e) {
			out.write("Error");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		} catch (Exception e) {
			out.write("Error");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		out.write("</body></html>");
	}

}
