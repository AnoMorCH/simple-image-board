package com.servlets;

import java.io.IOException;
import java.sql.Timestamp;
import java.sql.SQLException;
import java.text.ParseException;

import org.json.JSONObject;

import com.classes.JJWT;
import com.classes.Json;
import com.classes.Post;
import com.classes.User;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CreatePost extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        JSONObject answer;
        try {
            String token = request.getParameter("nickname-token");
            Integer authorId = null;
            if (token != null) {
                String nickname = JJWT.getValueFromToken(token, "nickname");
                authorId = (new User()).getId(nickname);
            }

            String rawTopic = request.getParameter("topic-id");
            int topicId = Integer.parseInt(rawTopic);

            String message = request.getParameter("message");

            String rawDatetime = request.getParameter("datetime");
            Timestamp datetime = Timestamp.valueOf(rawDatetime);

            (new Post()).create(authorId, topicId, message, datetime);

            answer = Json.getBinaryAnswer(true, "");
        } catch (ClassNotFoundException | SQLException | ParseException e) {
            answer = Json.getBinaryAnswer(false, e.getMessage());
        }
        Json.printAnswer(response, answer);
    }
}
