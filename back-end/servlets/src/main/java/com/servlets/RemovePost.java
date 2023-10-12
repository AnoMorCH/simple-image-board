package com.servlets;

import java.io.IOException;
import java.sql.SQLException;

import org.json.JSONObject;

import com.classes.JJWT;
import com.classes.Json;
import com.classes.Post;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class RemovePost extends HttpServlet {
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
        JSONObject answer;
        try {
            String postId = request.getParameter("post-id");
            String nicknameToken = request.getParameter("nickname-token");
            String nickname = JJWT.getValueFromToken(nicknameToken, "nickname");
            Post post = new Post();
            if (post.isDeletionValid(nickname, postId)) {
                post.delete(postId);
                answer = Json.getBinaryAnswer(true, "");
            } else {
                answer = Json.getBinaryAnswer(false, "Error! The current nickname and author's one are different.");
            }
        } catch (ClassNotFoundException | SQLException e) {
            answer = Json.getBinaryAnswer(false, e.getMessage());
        }
        Json.printAnswer(response, answer);
    }
}
