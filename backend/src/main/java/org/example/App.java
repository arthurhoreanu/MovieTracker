package org.example;
import static spark.Spark.*;
import org.example.Controller.MovieController;
import org.example.Model.Movie;
import org.example.Repository.MovieRepository;
import org.example.Service.MovieService;

public class App {
    public static void main(String[] args) {

        port(Integer.parseInt(System.getenv().getOrDefault("PORT", "8080")));
        MovieRepository repo = new MovieRepository();
        MovieService service = new MovieService(repo);

        service.addMovie(new Movie(
                "Interstellar",
                2014,
                "Sci-Fi",
                "Netflix",
                true,
                "https://m.media-amazon.com/images/I/91kFYg4fX3L._AC_SL1500_.jpg"
        ));

        service.addMovie(new Movie(
                "The Grand Budapest Hotel",
                2014,
                "Comedy",
                "Disney+",
                true,
                "https://m.media-amazon.com/images/S/pv-target-images/7e72fc7a5206f12315bc56fbfb4798c4e0ceb5e7aa5e0ab163ccda5313b5b71d.jpg"
        ));

        // ✅ Filme noi adăugate
        service.addMovie(new Movie(
                "Inception",
                2010,
                "Action",
                "HBO Max",
                true,
                "https://m.media-amazon.com/images/I/51FN6ZfX6SL._AC_.jpg"
        ));

        service.addMovie(new Movie(
                "The Dark Knight",
                2008,
                "Action",
                "Netflix",
                true,
                "https://m.media-amazon.com/images/I/51CbvZ3x7HL._AC_.jpg"
        ));

        service.addMovie(new Movie(
                "Pulp Fiction",
                1994,
                "Crime",
                "Amazon Prime",
                true,
                "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg"
        ));

        service.addMovie(new Movie(
                "Fight Club",
                1999,
                "Drama",
                "Hulu",
                true,
                "https://m.media-amazon.com/images/I/81D+KJkO1PL._AC_SL1500_.jpg"
        ));

        service.addMovie(new Movie(
                "The Matrix",
                1999,
                "Sci-Fi",
                "HBO Max",
                true,
                "https://m.media-amazon.com/images/I/51vpnbwFHrL._AC_.jpg"
        ));

        service.addMovie(new Movie(
                "Parasite",
                2019,
                "Thriller",
                "Hulu",
                true,
                "https://m.media-amazon.com/images/I/91T8R8FTpQL._AC_SL1500_.jpg"
        ));

        service.addMovie(new Movie(
                "La La Land",
                2016,
                "Musical",
                "Netflix",
                true,
                "https://m.media-amazon.com/images/I/81G+5QJaswL._AC_SY679_.jpg"
        ));

        service.addMovie(new Movie(
                "Whiplash",
                2014,
                "Drama",
                "Amazon Prime",
                true,
                "https://m.media-amazon.com/images/I/71UFBXzMlfL._AC_SY679_.jpg"
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
