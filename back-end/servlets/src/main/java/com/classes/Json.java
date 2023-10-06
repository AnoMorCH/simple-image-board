package com.classes;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

import org.json.JSONArray;
import org.json.JSONObject;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Implementation of logic related with JSON answers from a server to a client.
 */
public class Json {
    private static final int STATUS_OK = 200;

    /**
     * Convert an object from result set type to JSON type.
     * 
     * @param from A result set object from which to perform a conversion.
     * @return The converted object.
     * @throws SQLException
     */
    public static JSONArray convertTo(ResultSet from) throws SQLException {
        JSONArray array = new JSONArray();
        ResultSetMetaData fromMetaData = from.getMetaData();
        while (from.next()) {
            int columnsNum = fromMetaData.getColumnCount();
            JSONObject obj = new JSONObject();
            for (int i = 1; i <= columnsNum; i++) {
                String columnName = fromMetaData.getColumnName(i);
                obj.put(columnName, from.getObject(columnName));
            }
            array.put(obj);
        }
        return array;
    }

    /**
     * Convert a result from backend to send it to client as an answer encapsulated
     * with JSON.
     * 
     * @param isSuccess Is result of a work successful or not?
     * @param comment
     * @return
     */
    public static JSONObject getBinaryAnswer(boolean isSuccess, String comment) {
        return new JSONObject()
                .put("status", STATUS_OK)
                .put("success", isSuccess)
                .put("comment", comment);
    }

    /**
     * Print an answer from a server to a web-browser.
     * 
     * @param response A http object to get access to the web-browser.
     * @param answer   An answer which should be transferred to the web-browser.
     * @throws IOException
     */
    public static void printAnswer(HttpServletResponse response, JSONObject answer) throws IOException {
        PrintWriter writer = response.getWriter();
        writer.println(answer.toString(4));
        writer.close();
    }
}
