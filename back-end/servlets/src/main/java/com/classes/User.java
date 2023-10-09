package com.classes;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.enums.UserRoles;

/**
 * Implementation of logic related to a user.
 */
public class User extends Database {
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
        if (!resultSet.next()) {
            return false;
        }
        int count = resultSet.getInt(1);
        return count > 0;
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
     * Get an identifier of a role based on a given role value.
     * 
     * @param roleValue A role value you want to fetch.
     * @return A wanted role value identifier.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    private int getRoleId(String roleValue) throws SQLException, ClassNotFoundException {
        ResultSet resultSet = this.getObject("authors_role", "value", roleValue);
        resultSet.next();
        return resultSet.getInt(1);
    }
}
