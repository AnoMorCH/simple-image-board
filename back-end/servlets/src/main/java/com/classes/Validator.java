package com.classes;

import java.util.regex.Pattern;

/**
 * Please, note that the validation is quite simple: it only checks on
 * front-end and back-end if a password is not less than 8 arbitrary
 * characters and a nickname is not less than 1 arbitrary character. The
 * reason is simple: this is a study project and there is no need in complex
 * validation.
 */

/**
 * Implementation of a validator to check the correctness of data provided by a client.
 */
public class Validator {
    private static final int MIN_NICKNAME_LENGTH = 1;
    private static final int MIN_PASSWORD_LENGTH = 8;

    /**
     * Check if validation data is correct.
     * 
     * @param nickname A user's name.
     * @param password A user's password.
     * @return If a user's data is correct.
     */
    public static boolean isDataOk(String nickname, String password) {
        return isNicknameOk(nickname) && isPasswordOk(password);
    }

    /**
     * Check if a nickname is valid.
     * 
     * @param value A user's name.
     * @return If a nickname is valid.
     */
    private static boolean isNicknameOk(String value) {
        return value.length() >= MIN_NICKNAME_LENGTH;
    }

    /**
     * Check if a password is valid.
     * 
     * @param value A user's password.
     * @return If a password is valid.
     */
    private static boolean isPasswordOk(String value) {
        return value.length() >= MIN_PASSWORD_LENGTH
                && hasOnlyEngLettersAndNumbers(value);
    }

    /**
     * Check if a string value has only English letters and numbers.
     * 
     * @param value A string value for check.
     * @return If a string value has only English letters and numbers.
     */
    private static boolean hasOnlyEngLettersAndNumbers(String value) {
        return Pattern.matches("^[a-zA-Z0-9]*$", value);
    }
}