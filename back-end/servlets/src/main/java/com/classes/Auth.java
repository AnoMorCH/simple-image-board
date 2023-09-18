package com.classes;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.json.JSONObject;

import jakarta.servlet.http.HttpSession;

public class Auth extends User {
    public Auth() throws ClassNotFoundException, SQLException {
        super();
    }

    /**
     * Log in a user to the system if given data is right. Here only the nickname
     * and password are checked.
     * 
     * @param session  A current user's session.
     * @param nickname A user's name.
     * @param password A user's password.
     * @return A JSON response notifying a client whether or not a user has been
     *         successfully created.
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public JSONObject logIn(HttpSession session, String nickname, String password)
            throws ClassNotFoundException, SQLException {
        if (!this.doesValueExist("author", "nickname", nickname)) {
            return Json.getBinaryAnswer(false, "Error! There is no such a user.");
        } else if (!this.isPasswordCorrect(nickname, password)) {
            return Json.getBinaryAnswer(false, "Error! The given password is wrong.");
        }
        ResultSet user = this.getCurrent(nickname);
        int userId = user.getInt("id");
        this.writeToSession(session, userId);
        return Json.getBinaryAnswer(true, "");
    }

    /**
     * Sign up a user to the system if the one doesn't already exist.
     * 
     * @param session  A current user's session.
     * @param nickname A user's name.
     * @param password A user's password.
     * @return A JSON response notifying a client whether a user was created
     *         successfully or not.
     * @throws ClassNotFoundException
     * @throws SQLException
     */
    public JSONObject signUp(HttpSession session, String nickname, String password)
            throws ClassNotFoundException, SQLException {
        if (this.doesValueExist("author", "nickname", nickname)) {
            return Json.getBinaryAnswer(false, "Error! The user already exists.");
        }
        this.createNew(nickname, password);
        return Json.getBinaryAnswer(true, "A user has been created successfully.");
    }

    /**
     * Log out a user from his or her session.
     * 
     * @param session The current user's session.
     */
    public void logOut(HttpSession session) {
        session.removeAttribute(this.UNIQUE_USERS_IDENTIFIER);
    }

    /**
     * Check if a user is authorized or not.
     * 
     * @param session The current user's session.
     * @return If a user is authorized.
     */
    public JSONObject isUserAuthorized(HttpSession session) {
        return Json.getBinaryAnswer(this.isAuthorized(session), "");
    }
}
