package org.example;
import static spark.Spark.*;
import org.example.Controller.MovieController;
import org.example.Model.Movie;
import org.example.Repository.MovieRepository;
import org.example.Service.MovieService;

public class App {
    public static void main(String[] args) {
        port(8080);
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
                "https://m.media-amazon.com/images/S/pv-target-images/7e72fc7a5206f12315bc56fbfb4798c4e0ceb5e7aa5e0ab163ccda5313b5b71d.jpg"
        ));

        options("/*", (request, response) -> {
            String accessControlRequestHeaders = request.headers("Access-Control-Request-Headers");
            if (accessControlRequestHeaders != null) {
                response.header("Access-Control-Allow-Headers", accessControlRequestHeaders);
            }

            String accessControlRequestMethod = request.headers("Access-Control-Request-Method");
            if (accessControlRequestMethod != null) {
                response.header("Access-Control-Allow-Methods", accessControlRequestMethod);
            }

            return "OK";
        });

        before((request, response) -> {
            response.header("Access-Control-Allow-Origin", "*");
            response.header("Access-Control-Request-Method", "*");
            response.header("Access-Control-Allow-Headers", "*");
        });

        MovieController.initRoutes(service);
    }
}
