package com.classes;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONArray;

/**
 * A class that represents the implementation of the database Topic table logic.
 */
public class Topic extends Database {
    public Topic() throws ClassNotFoundException, SQLException {
        super();
    }

    /**
     * Get a row from the Topic table in the database.
     * 
     * @param id An id of a topic.
     * @return A desired row from the Topic table in the database.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public JSONArray get(String id) throws SQLException, ClassNotFoundException {
        ResultSet topic = this.getObject("topic", "id", id);
        return Json.convertTo(topic);
    }

    /**
     * Get all rows from the database Topic table.
     * 
     * @return All rows from the database Topic table.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    public JSONArray getAll() throws SQLException, ClassNotFoundException {
        ResultSet allTopics = this.getAllObjects("topic");
        return Json.convertTo(allTopics);
    }
}
