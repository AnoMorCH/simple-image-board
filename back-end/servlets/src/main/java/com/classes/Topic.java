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
