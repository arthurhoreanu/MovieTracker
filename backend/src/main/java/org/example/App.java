package org.example;
import static spark.Spark.*;
import org.example.Controller.MovieController;
import org.example.Model.Movie;
import org.example.Repository.DBConnection;
import org.example.Repository.MovieRepository;
import org.example.Service.MovieService;

public class App {
    public static void main(String[] args) {

        DBConnection.initializeDatabase();

        port(8080);
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

        service.addMovie(new Movie(
                "Inception",
                2010,
                "Action",
                "HBO Max",
                true,
                "https://cdn11.bigcommerce.com/s-yzgoj/images/stencil/1280x1280/products/2919271/5944675/MOVEB46211__19379.1679590452.jpg?c=2"
        ));

        service.addMovie(new Movie(
                "The Dark Knight",
                2008,
                "Action",
                "Netflix",
                true,
                "https://rukminim2.flixcart.com/image/850/1000/k8xduvk0/poster/j/m/z/medium-the-dark-knight-poster-decorative-wall-poster-wall-d-cor-original-imafqu8euacqngyh.jpeg?q=90&crop=false"
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
                "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        ));

        service.addMovie(new Movie(
                "The Matrix",
                1999,
                "Sci-Fi",
                "HBO Max",
                true,
                "https://m.media-amazon.com/images/S/pv-target-images/f17e616043ddf4ef91b4b7b22424869a164eb4cfdb424fa0446fa3fcb0e7f37e.jpg"
        ));

        service.addMovie(new Movie(
                "Parasite",
                2019,
                "Thriller",
                "Hulu",
                true,
                "https://m.media-amazon.com/images/S/pv-target-images/4667149e0aef027e1e79096af93b945738ca16ed7bc6df1087db82233155be07.jpg"
        ));

        service.addMovie(new Movie(
                "La La Land",
                2016,
                "Musical",
                "Netflix",
                true,
                "https://m.media-amazon.com/images/M/MV5BMzUzNDM2NzM2MV5BMl5BanBnXkFtZTgwNTM3NTg4OTE@._V1_.jpg"
        ));

        service.addMovie(new Movie(
                "Whiplash",
                2014,
                "Drama",
                "Amazon Prime",
                true,
                "https://www.tallengestore.com/cdn/shop/products/Whiplash-MilesTeller-HollywoodMovieArtPoster_76ab8186-5a84-408c-8d61-1a139d4700ad.jpg?v=1705900209"
        ));

        service.addMovie(new Movie(
                "The Greatest Showman",
                2017,
                "Musical",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/I/814u8J7W1gL.jpg"
        ));

        service.addMovie(new Movie(
                "The Lord of the Rings: The Fellowship of the Ring",
                2001,
                "Fantasy",
                "HBO Max",
                false,
                "https://m.media-amazon.com/images/I/81EBp0vOZZL.jpg"
        ));

        service.addMovie(new Movie(
                "How To Train Your Dragon",
                2008,
                "Animation",
                "Amazon Prime",
                false,
                "https://m.media-amazon.com/images/M/MV5BMjA5NDQyMjc2NF5BMl5BanBnXkFtZTcwMjg5ODcyMw@@._V1_.jpg"
        ));

        service.addMovie(new Movie(
                "Emergency",
                2022,
                "Thriller",
                "Amazon Prime",
                false,
                "https://m.media-amazon.com/images/M/MV5BMzMxMmFmYzktYzc3Ni00NGVmLTg4ODAtNmM1NmYyMTA3ODE2XkEyXkFqcGc@._V1_.jpg"
        ));

        service.addMovie(new Movie(
                "Conclave",
                2024,
                "Drama",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/M/MV5BYjgxMDI5NmMtNTU3OS00ZDQxLTgxZmEtNzY1ZTBmMDY4NDRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        ));

        service.addMovie(new Movie(
                "I'm Still Here",
                2024,
                "Drama",
                "Netflix",
                false,
                "https://s3.amazonaws.com/nightjarprod/content/uploads/sites/216/2025/01/13224833/qNLMPY3KLrYgTX2QZ5iEwwOqyRz-683x1024.jpg"
        ));

        service.addMovie(new Movie(
                "Mean Girls",
                2004,
                "Comedy",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/M/MV5BMjE1MDQ4MjI1OV5BMl5BanBnXkFtZTcwNzcwODAzMw@@._V1_.jpg"
        ));

        service.addMovie(new Movie(
                "A Real Pain",
                2024,
                "Drama",
                "HBO Max",
                false,
                "https://www.socialworker.com/downloads/2995/download/20250113_184548.jpg?cb=30b2f906af99f80b138731de427bc9d8"
        ));

        service.addMovie(new Movie(
                "The Suicide Squad",
                2021,
                "Action",
                "HBO Max",
                false,
                "https://m.media-amazon.com/images/M/MV5BMWU3Y2NlZmEtMjJjNS00ZWMxLWE1MzctYWYyMjMzMDdkNTE4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        ));

        service.addMovie(new Movie(
                "Wicked",
                2024,
                "Musical",
                "Disney+",
                false,
                "https://m.media-amazon.com/images/I/81cmJpAKEVL.jpg"
        ));

        service.addMovie(new Movie(
                "The Substance",
                2024,
                "Horror",
                "Amazon Prime",
                false,
                "https://image.tmdb.org/t/p/original/wvosSmS5PmMycp8AtvYUuzLMSLh.jpg"
        ));

        service.addMovie(new Movie(
                "Amélie",
                2001,
                "Comedy",
                "Netflix",
                false,
                "https://image.tmdb.org/t/p/original/oTKduWL2tpIKEmkAqF4mFEAWAsv.jpg"
        ));

        service.addMovie(new Movie(
                "Requiem for a Dream",
                2000,
                "Drama",
                "HBO Max",
                false,
                "https://m.media-amazon.com/images/M/MV5BN2ZlMjIzZjctYzA2My00ZWYyLWI4ZjctMGI2NWYyNzFiZjAwXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        ));

        service.addMovie(new Movie(
                "Spider-Man 2",
                2004,
                "Action",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/M/MV5BNGQ0YTQyYTgtNWI2YS00NTE2LWJmNDItNTFlMTUwNmFlZTM0XkEyXkFqcGc@._V1_.jpg"
        ));

        service.addMovie(new Movie(
                "Home Alone",
                1990,
                "Comedy",
                "Netflix",
                false,
                "https://m.media-amazon.com/images/I/814O+EE3ESL.jpg"
        ));

        service.addMovie(new Movie(
                "Before Sunrise",
                1995,
                "Drama",
                "HBO Max",
                false,
                "https://m.media-amazon.com/images/M/MV5BZDZhZmI1ZTUtYWI3NC00NTMwLTk3NWMtNDc0OGNjM2I0ZjlmXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
        ));

        service.addMovie(new Movie(
                "Edward Scissorhands",
                1990,
                "Fantasy",
                "Amazon Prime",
                false,
                "https://i.ebayimg.com/images/g/8EsAAMXQVT9Sse40/s-l1200.jpg"
        ));

        service.addMovie(new Movie(
                "The Talented Mr. Ripley",
                1999,
                "Thriller",
                "HBO Max",
                false,
                "https://m.media-amazon.com/images/M/MV5BYzI2ZmU3MWMtZmRlMi00ZmVlLTkwMDMtZmI1YTg4YzcwMDE0XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
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