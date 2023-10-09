package com.servlets;

import java.io.IOException;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import com.classes.Json;
import com.classes.Topic;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class GetTopic extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        JSONObject answer;         
        try {
            String id = request.getParameter("id");
            JSONArray topic = (new Topic()).get(id);
            answer = Json.getBinaryAnswer(true, topic.toString());
        } catch (ClassNotFoundException | SQLException e) {
            answer = Json.getBinaryAnswer(false, e.getMessage());
        }
        Json.printAnswer(response, answer);
    }
}