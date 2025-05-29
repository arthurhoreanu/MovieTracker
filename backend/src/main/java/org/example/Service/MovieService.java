package org.example.Service;

import org.example.Model.Movie;
import org.example.Repository.MovieRepository;

import java.util.List;

public class MovieService {
    private final MovieRepository repository;

    public MovieService(MovieRepository repository) {
        this.repository = repository;
    }

    public boolean addMovie(Movie movie) {
        if (movie.getTitle() == null || movie.getTitle().trim().isEmpty()) {
            return false;
        }
        List<Movie> existing = repository.findAll().stream()
                .filter(m -> m.getTitle().equalsIgnoreCase(movie.getTitle()))
                .toList();
        if (!existing.isEmpty()) {
            return false;
        }
        repository.insert(movie);
        return true;
    }

    public boolean deleteMovie(String title) {
        if (title == null || title.trim().isEmpty()) {
            return false;
        }
        repository.deleteByTitle(title);
        return true;
    }

    public boolean markAsWatched(String title) {
        if (title == null || title.trim().isEmpty()) {
            return false;
        }
        repository.markWatched(title);
        return true;
    }

    public boolean markAsNotWatched(String title) {
        if (title == null || title.trim().isEmpty()) {
            return false;
        }
        repository.markNotWatched(title);
        return true;
    }

    public List<Movie> getAllMovies() {
        return repository.findAll();
    }

    public List<Movie> getWatchedMovies() {
        return repository.findWatched();
    }

    public List<Movie> getMoviesByYear(int year) {
        return repository.findByYear(year);
    }

    public List<Movie> getMoviesByType(String type) {
        if (type == null || type.trim().isEmpty()) return List.of();
        return repository.findByType(type);
    }

    public List<Movie> getMoviesByPlatform(String platform) {
        if (platform == null || platform.trim().isEmpty()) return List.of();
        return repository.findByPlatform(platform);
    }

    public boolean updateMovie(String title, Movie updatedMovie) {
        if (title == null || title.trim().isEmpty()) {
            return false;
        }
        return repository.updateMovie(title, updatedMovie);
    }

}
