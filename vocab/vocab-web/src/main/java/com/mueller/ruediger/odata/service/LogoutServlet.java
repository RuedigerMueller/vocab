package com.mueller.ruediger.odata.service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import javax.security.auth.login.LoginContext;
import javax.security.auth.login.LoginException;
import com.sap.security.auth.login.LoginContextFactory;

/**
 * Servlet implementation class LogoutServlet
 */
public class LogoutServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public LogoutServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		// Call logout if the user is logged in
		LoginContext loginContext = null;
		if (request.getRemoteUser() != null) {

			try {
				loginContext = LoginContextFactory.createLoginContext();
				loginContext.logout();

			} catch (LoginException e) {
				// Servlet container handles the login exception
				// It throws it to the application for its information
				response.getWriter().println(
						"Logout failed. Reason: " + e.getMessage());
			}
		} else {
			response.getWriter().println("You have successfully logged out.");
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
