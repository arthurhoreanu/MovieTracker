package org.example.Model;

public class Movie {
    private String title;
    private int year;
    private String type;
    private String platform;
    private boolean watched;
    private String imageUrl;

    public Movie() {
    }

    public Movie(String title, int year, String type, String platform, boolean watched, String imageUrl) {
        this.title = title;
        this.year = year;
        this.type = type;
        this.platform = platform;
        this.watched = watched;
        this.imageUrl = imageUrl;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getPlatform() {
        return platform;
    }

    public void setPlatform(String platform) {
        this.platform = platform;
    }

    public boolean isWatched() {
        return watched;
    }

    public void setWatched(boolean watched) {
        this.watched = watched;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    @Override
    public String toString() {
        return "Movie{" +
                "title='" + title + '\'' +
                ", year=" + year +
                ", type='" + type + '\'' +
                ", platform='" + platform + '\'' +
                ", watched=" + watched +
                ", imageUrl='" + imageUrl + '\'' +
                '}';
    }
}
