package org.example.Controller;

import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.example.Model.Movie;
import org.example.Service.MovieService;
import static spark.Spark.*;
import com.google.gson.Gson;

public class MovieController {
    private static final Gson gson = new Gson();

    public static void initRoutes(MovieService service) {

        get("/movie", (req, res) -> {
            String search = req.queryParams("search");
            res.type("application/json");
            if (search != null && !search.isEmpty()) {
                return gson.toJson(
                        service.getAllMovies().stream()
                                .filter(m -> m.getTitle().toLowerCase().contains(search.toLowerCase()))
                                .toList()
                );
            } else {
                return gson.toJson(service.getAllMovies());
            }
        });

        post("/movie", (req, res) -> {
            Movie movie = gson.fromJson(req.body(), Movie.class);
            boolean success = service.addMovie(movie);
            res.status(success ? 201 : 400);
            return success ? "Created" : "Movie already exists or invalid data";
        });

        put("/movie/:title", (req, res) -> {
            String encodedTitle = req.params(":title");
            String title;
            try {
                title = java.net.URLDecoder.decode(encodedTitle, "UTF-8");
            } catch (Exception e) {
                title = encodedTitle;
            }
            JsonObject body = JsonParser.parseString(req.body()).getAsJsonObject();
            boolean watched = body.get("watched").getAsBoolean();
            boolean success;
            if (watched) {
                success = service.markAsWatched(title);
            } else {
                success = service.markAsNotWatched(title);
            }
            res.status(success ? 200 : 400);
            return success ? "Updated" : "Failed";
        });

        put("/movie/update/:title", (req, res) -> {
            String title = req.params(":title");
            Movie updatedMovie = gson.fromJson(req.body(), Movie.class);
            boolean success = service.updateMovie(title, updatedMovie);
            res.status(success ? 200 : 404);
            return success ? "Movie updated successfully" : "Movie not found or update failed";
        });

        delete("/movie/:title", (req, res) -> {
            String title = req.params(":title");
            boolean success = service.deleteMovie(title);
            res.status(success ? 200 : 404);
            return success ? "Deleted" : "Movie not found";
        });
    }
}
