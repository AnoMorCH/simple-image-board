package com.servlets;

import java.io.IOException;
import java.sql.SQLException;

import org.json.JSONObject;

import com.classes.Auth;
import com.classes.Json;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class LogIn extends HttpServlet {
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        JSONObject answer;
        try {
            String nickname = request.getParameter("nickname");
            String password = request.getParameter("password");
            answer = (new Auth()).logIn(request.getSession(), nickname, password);
        } catch (ClassNotFoundException | SQLException e) {
            answer = Json.getBinaryAnswer(false, e.getMessage());
        }
        Json.printAnswer(response, answer);
    }
}