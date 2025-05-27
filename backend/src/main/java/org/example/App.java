package org.example;
import static spark.Spark.*;
import org.example.Controller.MovieController;
import org.example.Model.Movie;
import org.example.Repository.MovieRepository;
import org.example.Service.MovieService;

public class App {
    public static void main(String[] args) {
        MovieRepository repo = new MovieRepository();
        MovieService service = new MovieService(repo);

        service.addMovie(new Movie(
                "Interstellar",
                2014,
                "Sci-Fi",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg"
        ));

        service.addMovie(new Movie(
                "The Grand Budapest Hotel",
                2014,
                "Comedy",
                "Disney+",
                false,
                "https://m.media-amazon.com/images/I/71j3rF1VqLL._AC_SY679_.jpg"
        ));

        MovieController.initRoutes(service);
    }
}
