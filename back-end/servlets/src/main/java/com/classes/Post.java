package com.classes;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.sql.Types;
import java.text.ParseException;
import java.util.Objects;

import org.json.JSONArray;
import org.json.JSONObject;

/**
 * A class that represents the implementation of the database Post table logic.
 */
public class Post extends User {
    public Post() throws ClassNotFoundException, SQLException {
        super();
    }

    /**
     * Create a post.
     * 
     * @param authorId ID of the post author.
     * @param topicId  ID of the post topic.
     * @param message  Message of the post.
     * @param datetime Date and time of the post creation.
     * @throws SQLException
     * @throws ParseException
     */
    public void create(Integer authorId, int topicId, String message, Timestamp datetime)
            throws SQLException, ParseException {
        String query = "INSERT post (author_id, topic_id, message, datetime) VALUES (?, ?, ?, ?)";
        PreparedStatement pstmt = this.con.prepareStatement(query);
        if (authorId == null) {
            pstmt.setNull(1, Types.INTEGER);
        } else {
            pstmt.setInt(1, authorId);
        }
        pstmt.setInt(2, topicId);
        pstmt.setString(3, message);
        pstmt.setTimestamp(4, datetime);
        pstmt.execute();
    }

    /**
     * Get a post object.
     * 
     * @param topicId A topic ID of a post.
     * @return A post object.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public JSONArray get(String topicId) throws SQLException, ClassNotFoundException {
        ResultSet unparsedPosts = this.getSomeObjects("post", "topic_id", topicId);
        JSONArray rawPosts = Json.convertTo(unparsedPosts);
        return addNickname(rawPosts);
    }

    /**
     * Delete a post.
     * 
     * @param postId An ID of the post.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public void delete(String postId) throws SQLException, ClassNotFoundException {
        this.removeObject("post", "id", postId);
    }

    /**
     * Check that a user trying to delete a post is the owner of the post.
     * 
     * @param userNickname A user's nickname attempting to delete a post.
     * @param postId       A post which the user tries to delete.
     * @return
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public boolean isDeletionValid(String userNickname, String postId) throws SQLException, ClassNotFoundException {
        String authorName = this.getAuthor(postId);
        return Objects.equals(authorName, userNickname);
    }

    /**
     * Get a post's author.
     * 
     * @param postId The post ID.
     * @return A post's author.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    private String getAuthor(String postId) throws SQLException, ClassNotFoundException {
        int authorId = this.getAuthorId(postId);
        ResultSet author = this.getSomeObjects("author", "id", Integer.toString(authorId));
        author.next();
        return author.getString("nickname");
    }

    /**
     * Get an author's ID based on a post.
     * 
     * @param postId An ID of the post.
     * @return An author's ID based on a post.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    private int getAuthorId(String postId) throws SQLException, ClassNotFoundException {
        ResultSet post = this.getSomeObjects("post", "id", postId);
        post.next();
        return post.getInt("author_id");
    }

    /**
     * Add an author's nickname of a post to the fetched posts.
     * 
     * @param posts A post where a nickname should be put.
     * @return The post to which the author's nickname has been added.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    private JSONArray addNickname(JSONArray posts) throws SQLException, ClassNotFoundException {
        String key = "author_id";
        for (int objId = 0; objId < posts.length(); objId++) {
            JSONObject obj = (JSONObject) posts.get(objId);
            if (obj.has(key)) {
                String authorId = obj.get(key).toString();
                String nickname = this.getNickname(authorId);
                obj.put("nickname", nickname);
            }
        }
        return posts;
    }
}
