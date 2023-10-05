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

public class GetNicknameFromToken extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        JSONObject answer;
        try {
            String token = request.getParameter("token");
            answer = (new Auth()).getNicknameFromToken(token);
        } catch (ClassNotFoundException | SQLException e) {
            answer = Json.getBinaryAnswer(false, e.getMessage());
        }
        Json.printAnswer(response, answer);
    }
}
