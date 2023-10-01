package com.classes;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.enums.UserRoles;

import jakarta.servlet.http.HttpSession;

public class User extends Database {
    // A special value used to log in a user and store a current user session.
    protected final String UNIQUE_IDENTIFIER = "user_id";

    User() throws ClassNotFoundException, SQLException {
        super();
    }

    /**
     * Check if the given login and password are correct.
     * 
     * @param nickname A user's name.
     * @param password A user's password.
     * @return If a user's password is correct.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    protected boolean isPasswordCorrect(String nickname, String password) throws SQLException, ClassNotFoundException {
        String query = "SELECT count(*) FROM author WHERE nickname = ? AND password = ?";
        PreparedStatement pstmt = this.con.prepareStatement(query);
        pstmt.setString(1, nickname);
        pstmt.setString(2, password);
        ResultSet resultSet = pstmt.executeQuery();
        return resultSet.next();
    }

    /**
     * Get a current user from a database.
     *
     * @param nickname A unique user's name.
     * @return The current user.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    protected ResultSet getCurrent(String nickname) throws SQLException, ClassNotFoundException {
        return this.getObject("author", "nickname", nickname);
    }

    /**
     * Authorize a user to the current session using his or her unique identifier.
     * 
     * @param session               The current user's session.
     * @param uniqueIdentifierValue A value by which a user is identifier (here this
     *                              is his or her user id.)
     */
    protected void writeToSession(HttpSession session, int uniqueIdentifierValue) {
        session.setAttribute(this.UNIQUE_IDENTIFIER, uniqueIdentifierValue);
    }

    /**
     * Create a new user based the given nickname and password. The value "user" is
     * a standard role.
     * 
     * @param nickname A user's name.
     * @param password A user's password.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    protected void createNew(String nickname, String password) throws SQLException, ClassNotFoundException {
        int roleId = this.getRoleId(UserRoles.USER.value);
        String query = "INSERT INTO author (nickname, password, role_id) VALUES (?, ?, ?)";
        PreparedStatement pstmt = this.con.prepareStatement(query);
        pstmt.setString(1, nickname);
        pstmt.setString(2, password);
        pstmt.setInt(3, roleId);
        pstmt.executeQuery();
    }

    /**
     * Check if a user is authorized.
     *
     * @param session The current user's session.
     * @return If a user is authorized.
     */
    protected boolean isAuthorized(HttpSession session) {
        return session.getAttribute(this.UNIQUE_IDENTIFIER) != null;
    }

    /**
     * Get an identifier of a role based on a given role value.
     * 
     * @param roleValue A role value you want to fetch.
     * @return A wanted role value identifier.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    private int getRoleId(String roleValue) throws SQLException, ClassNotFoundException {
        ResultSet role = this.getObject("authors_role", "value", roleValue);
        role.next();
        return role.getInt(1);
    }
}
