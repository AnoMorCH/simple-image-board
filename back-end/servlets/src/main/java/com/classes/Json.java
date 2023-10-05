package com.classes;

import java.io.IOException;
import java.io.PrintWriter;

import org.json.JSONObject;

import jakarta.servlet.http.HttpServletResponse;

/**
 * Implementation of logic related with JSON answers from a server to a client.
 */
public class Json {
    private static final int STATUS_OK = 200;

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
