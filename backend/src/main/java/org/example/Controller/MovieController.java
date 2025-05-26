package org.example.Controller;

import org.example.Model.Movie;
import org.example.Service.MovieService;

import java.util.List;

public class MovieController {
    private final MovieService service;

    public MovieController(MovieService service) {
        this.service = service;
    }

    public boolean addMovie(Movie movie) {
        return service.addMovie(movie);
    }

    public boolean deleteMovie(String title) {
        return service.deleteMovie(title);
    }

    public boolean markAsWatched(String title) {
        return service.markAsWatched(title);
    }

    public List<Movie> getAllMovies() {
        return service.getAllMovies();
    }

    public List<Movie> getWatchedMovies() {
        return service.getWatchedMovies();
    }

    public List<Movie> getMoviesByYear(int year) {
        return service.getMoviesByYear(year);
    }

    public List<Movie> getMoviesByType(String type) {
        return service.getMoviesByType(type);
    }

    public List<Movie> getMoviesByPlatform(String platform) {
        return service.getMoviesByPlatform(platform);
    }
}
