package org.example.Repository;

import org.example.Model.Movie;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class MovieRepository {

    public void insert(Movie movie) {
        String sql = "INSERT INTO movies (title, year, type, platform, watched, image_url) VALUES (?, ?, ?, ?, ?, ?)";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, movie.getTitle());
            stmt.setInt(2, movie.getYear());
            stmt.setString(3, movie.getType());
            stmt.setString(4, movie.getPlatform());
            stmt.setBoolean(5, movie.isWatched());
            stmt.setString(6, movie.getImageUrl());

            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error inserting movie: " + e.getMessage());
        }
    }

    public List<Movie> findAll() {
        return findByQuery("SELECT * FROM movies");
    }

    public void deleteByTitle(String title) {
        String sql = "DELETE FROM movies WHERE title = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, title);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error deleting movie: " + e.getMessage());
        }
    }

    public void markWatched(String title) {
        String sql = "UPDATE movies SET watched = TRUE WHERE title = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, title);
            stmt.executeUpdate();
        } catch (SQLException e) {
            System.err.println("Error updating movie: " + e.getMessage());
        }
    }

    public List<Movie> findWatched() {
        return findByQuery("SELECT * FROM movies WHERE watched = TRUE");
    }

    public List<Movie> findByYear(int year) {
        return findByParamQuery("SELECT * FROM movies WHERE year = ?", year);
    }

    public List<Movie> findByType(String type) {
        return findByParamQuery("SELECT * FROM movies WHERE type ILIKE ?", "%" + type + "%");
    }

    public List<Movie> findByPlatform(String platform) {
        return findByParamQuery("SELECT * FROM movies WHERE platform ILIKE ?", "%" + platform + "%");
    }

    public boolean updateMovie(String title, Movie updatedMovie) {
        String sql = "UPDATE movies SET year = ?, type = ?, platform = ?, watched = ?, image_url = ? WHERE title = ?";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setInt(1, updatedMovie.getYear());
            stmt.setString(2, updatedMovie.getType());
            stmt.setString(3, updatedMovie.getPlatform());
            stmt.setBoolean(4, updatedMovie.isWatched());
            stmt.setString(5, updatedMovie.getImageUrl());
            stmt.setString(6, title);

            int affectedRows = stmt.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            System.err.println("Error updating movie: " + e.getMessage());
            return false;
        }
    }

    // === Helper methods ===

    private Movie extractMovie(ResultSet rs) throws SQLException {
        return new Movie(
                rs.getString("title"),
                rs.getInt("year"),
                rs.getString("type"),
                rs.getString("platform"),
                rs.getBoolean("watched"),
                rs.getString("image_url")
        );
    }

    private List<Movie> findByQuery(String sql) {
        List<Movie> movies = new ArrayList<>();

        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                movies.add(extractMovie(rs));
            }
        } catch (SQLException e) {
            System.err.println("Error querying movies: " + e.getMessage());
        }

        return movies;
    }

    private List<Movie> findByParamQuery(String sql, Object param) {
        List<Movie> movies = new ArrayList<>();

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setObject(1, param);

            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    movies.add(extractMovie(rs));
                }
            }

        } catch (SQLException e) {
            System.err.println("Error querying with parameter: " + e.getMessage());
        }

        return movies;
    }

}
