package com.classes;

import org.json.JSONObject;

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
}
