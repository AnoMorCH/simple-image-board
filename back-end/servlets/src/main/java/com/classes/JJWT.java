package com.classes;

import java.util.Base64;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

/**
 * An implementation of the Java JSON Web Token based on the JJWT plugin
 * (https://github.com/jwtk/jjwt).
 */
public class JJWT {
    private final static byte[] SECRET = getSecret();

    /**
     * Create a token as a string with an attribute-value pair.
     * 
     * @param attr  An attribute of the pair.
     * @param value A value of the pair.
     * @return A token as a string with an attribute-value pair.
     */
    public static String getToken(String attr, String value) {
        return Jwts.builder()
                .claim(attr, value)
                .signWith(Keys.hmacShaKeyFor(SECRET))
                .compact();
    }

    /**
     * Get a value from a parsed token with an attribute-value pair.
     * 
     * @param token A token.
     * @param attr  An attribute of the pair.
     * @return A value from a parsed token with an attribute-value pair.
     */
    public static String getValueFromToken(String token, String attr) {
        Jws<Claims> parsedToken = Jwts.parser()
                .verifyWith(Keys.hmacShaKeyFor(SECRET))
                .build()
                .parseSignedClaims(token);
        return parsedToken.getPayload()
                .get(attr, String.class);
    }

    /**
     * Generate an encrypted secret key to create a token.
     * 
     * @return An encrypted secret key to create a token.
     */
    private static byte[] getSecret() {
        String randomlyGeneratedKey = "99dV3q0JhA+RYK+RZj8L7HO/P4T3ugvfQLGGQIVGwvc=";
        return Base64.getDecoder().decode(randomlyGeneratedKey);
    }
}
