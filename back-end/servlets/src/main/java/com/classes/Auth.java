package com.classes;

import java.sql.SQLException;

import org.json.JSONObject;

import jakarta.servlet.http.HttpSession;

/**
 * Implements auth. The auth is built upon JWT using JJWT plugin.
 */
public class Auth extends User {
    public Auth() throws ClassNotFoundException, SQLException {
        super();
    }

    /**
     * Log in a user to the system if given data is right. Here only the nickname
     * and password are checked.
     * 
     * @param nickname A user's name.
     * @param password A user's password.
     * @return A JSON response notifying a client whether or not a user has been
     *         successfully created.
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public JSONObject logIn(String nickname, String password)
            throws ClassNotFoundException, SQLException {
        if (!this.doesValueExist("author", "nickname", nickname) || !this.isPasswordCorrect(nickname, password)) {
            return Json.getBinaryAnswer(false, "Error! The given nickname or/and password is/are wrong");
        }
        String nicknameToken = JJWT.getToken("nickname", nickname);
        return Json.getBinaryAnswer(true, nicknameToken);
    }

    /**
     * Sign up a user to the system if the one doesn't already exist.
     * 
     * @param nickname A user's name.
     * @param password A user's password.
     * @return A JSON response notifying a client whether a user was created
     *         successfully or not.
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public JSONObject signUp(String nickname, String password)
            throws ClassNotFoundException, SQLException {
        if (this.doesValueExist("author", "nickname", nickname)) {
            return Json.getBinaryAnswer(false, "Error! The user already exists.");
        } else if (!Validator.isDataOk(nickname, password)) {
            return Json.getBinaryAnswer(false, "Error! The given data is still invalid.");
        }
        this.createNew(nickname, password);
        return Json.getBinaryAnswer(true, "A user has been created successfully.");
    }

    /**
     * Get a user's nickname based on the token.
     *
     * @param token A token which contains a user's nickname.
     * @return A JSON response notifying a client whether a nickname was
     *         fetched correctly or not.
     */
    public JSONObject getNicknameFromToken(String token) {
        String nickname = JJWT.getValueFromToken(token, "nickname");
        return Json.getBinaryAnswer(true, nickname);
    }
}
