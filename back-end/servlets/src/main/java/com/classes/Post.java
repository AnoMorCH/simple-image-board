package com.classes;

import java.sql.ResultSet;
import java.sql.SQLException;

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
     * Get a post object.
     * 
     * @param topicId A topic id of a post.
     * @return A post object.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public JSONArray get(String topicId) throws SQLException, ClassNotFoundException {
        ResultSet unparsedPosts = this.getObject("post", "topic_id", topicId);
        JSONArray rawPosts = Json.convertTo(unparsedPosts);
        return addNickname(rawPosts);
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
