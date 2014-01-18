package com.mueller.ruediger.odata.service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.sap.security.um.user.User;
import com.sap.security.um.user.UserProvider;
import com.sap.security.um.service.UserManagementAccessor;

/**
 * Servlet implementation class UserInfo
 */
public class UserInfo extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public UserInfo() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// Check for a logged in user
		if (request.getUserPrincipal() != null) {
		  try {
		    // UserProvider provides access to the user storage
		    UserProvider users = UserManagementAccessor.getUserProvider();

		    // Read the currently logged in user from the user storage
		    User user = users.getUser(request.getUserPrincipal().getName());
		    
		    String JSON_User = "{";
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + "user";
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ':';
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + request.getUserPrincipal().getName();
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ',';

		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + "firstName";
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ':';
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + user.getAttribute("firstname");
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ',';
		    
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + "lastName";
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ':';
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + user.getAttribute("lastname");
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ',';
		    
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + "email";
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + ':';
		    JSON_User = JSON_User + '"';
		    JSON_User = JSON_User + user.getAttribute("email");
		    JSON_User = JSON_User + '"';
		    
		    JSON_User = JSON_User + '}';
		    		    

		    // Print the user name and email
		    response.getWriter().print(JSON_User);
		    
		  } catch (Exception e) {
		    // Handle errors
		  }
		}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
	}

}
