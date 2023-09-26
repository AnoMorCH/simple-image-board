package com.classes;

import java.sql.ResultSet;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class Database {
    protected Connection con;

    Database() throws ClassNotFoundException, SQLException {
        con = this.getCon("scherbakov", "anomorch", "anomorch");
    }

    /**
     * Check if a value with a certain attribute exists in a table.
     * 
     * @param tableName A name of a table we check.
     * @param attrName  A name of a table attribute.
     * @param attrValue A value of the attribute.
     * @return If there is a value in a table.
     */
    protected boolean doesValueExist(String tableName, String attrName, String attrValue)
            throws SQLException, ClassNotFoundException {
        if (!this.doesAttrOfTableExist(tableName, attrName)) {
            return false;
        }
        String query = String.format("SELECT count(*) FROM %s WHERE %s = ?", tableName, attrName);
        PreparedStatement pstmt = this.con.prepareStatement(query);
        pstmt.setString(1, attrValue);
        ResultSet resultSet = pstmt.executeQuery();
        if (!resultSet.next()) {
            return false;
        }
        int count = resultSet.getInt(1);
        return count > 0;
    }

    /**
     * Return an object from a database based on given data.
     * 
     * @param tableName A table name to fetch an object from.
     * @param attrName  A table attribute name to fetch an object from.
     * @param attrValue A table attribute value to fetch an object from.
     * @return An object fetched from a database.
     * @throws SQLException
     * @throws ClassNotFoundException
     */
    protected ResultSet getObject(String tableName, String attrName, String attrValue)
            throws SQLException, ClassNotFoundException {
        if (!this.doesAttrOfTableExist(tableName, attrName)) {
            return null;
        }
        String query = String.format("SELECT * FROM %s WHERE %s = ?", tableName, attrName);
        PreparedStatement pstmt = this.con.prepareStatement(query);
        pstmt.setString(1, attrValue);
        return pstmt.executeQuery();
    }

    /**
     * Check if there is a table of a database and an attribute inside of it.
     * 
     * @param tableName A name of a table you want to check.
     * @param attrName  A name of an attribute you want to check.
     * @return If there is a table and an attribute.
     */
    private boolean doesAttrOfTableExist(String tableName, String attrName) {
        Map<String, String[]> tablesAndAttrs = this.getTablesAndAttrs();
        String[] attrsOfTheTable = tablesAndAttrs.get(tableName);
        if (attrsOfTheTable == null) {
            return false;
        } else {
            return Arrays.asList(attrsOfTheTable).contains(attrName);
        }
    }

    /**
     * Get a dictionary of arrays which represents tables and their attributes from
     * a database.
     * The reason for this is to ensure secure fetch of data from the database
     * (mainly, to
     * avoid SqlInjection).
     *
     * @return A dictionary of tables and their attributes names.
     */
    private Map<String, String[]> getTablesAndAttrs() {
        Map<String, String[]> tablesAndAttrs = new HashMap<String, String[]>();
        final String[] authorAttrs = { "id", "nickname", "password", "role_id" };
        final String[] authorsRoleAttrs = { "id", "value" };
        tablesAndAttrs.put("author", authorAttrs);
        tablesAndAttrs.put("authors_role", authorsRoleAttrs);
        return tablesAndAttrs;
    }

    /**
     * Return connection to a database.
     * 
     * @param dbName   A name of a database you want to work with.
     * @param username A username which is used to manage the database.
     * @param password A password which is used to manage the database.
     * @return Connection to a database.
     */
    private Connection getCon(String dbName, String username, String password)
            throws SQLException, ClassNotFoundException {
        Class.forName("org.mariadb.jdbc.Driver");
        String dbUrl = this.getDbUrl(dbName);
        return DriverManager.getConnection(dbUrl, username, password);
    }

    /**
     * Get a url to connect to a database.
     * 
     * @param dbName A name of a database you want to work with.
     * @return A url to connect to a database.
     */
    private String getDbUrl(String dbName) {
        return String.format("jdbc:mariadb://localhost:3306/%s", dbName);
    }
}
