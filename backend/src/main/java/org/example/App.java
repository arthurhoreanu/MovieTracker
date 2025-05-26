package org.example;

import org.example.Model.Movie;
import org.example.Repository.MovieRepository;
import org.example.Service.MovieService;
import org.example.Controller.MovieController;

import java.util.List;

public class App 
{
    public static void main( String[] args )
    {
        MovieRepository repo = new MovieRepository();
        MovieService service = new MovieService(repo);
        MovieController controller = new MovieController(service);

        // 1. Add Movie
        Movie newMovie = new Movie(
                "The Matrix",
                1999,
                "Sci-Fi",
                "Netflix",
                false,
                "https://example.com/matrix.jpg"
        );

        repo.insert(newMovie);
        System.out.println("✅ Movie added.");

        // 2. Show all movies
        List<Movie> allMovies = repo.findAll();
        System.out.println("\n🎬 All movies:");
        allMovies.forEach(System.out::println);

        // 3. Mark as watched
        repo.markWatched("The Matrix");
        System.out.println("\n✅ The movie 'The Matrix' marked as seen.");

        // 4. Show only watched movies
        List<Movie> seen = repo.findWatched();
        System.out.println("\n👀 Watched movies:");
        seen.forEach(System.out::println);

        // 5. Delete movie
        repo.deleteByTitle("The Matrix");
        System.out.println("\n🗑️ The movie 'The Matrix' was deleted.");

        // 6. Final test
        List<Movie> ramase = repo.findAll();
        System.out.println("\n📦 Remaining movies in DB:");
        ramase.forEach(System.out::println);
    }
}
