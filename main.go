package main

import (
	"database/sql"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"strings"

	_ "github.com/mattn/go-sqlite3"
	"github.com/rs/cors"
)

var db *sql.DB

func main() {
	var err error
	db, err = sql.Open("sqlite3", "urls.db")
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// Create table if not exists
	createTableStmt := `
		CREATE TABLE IF NOT EXISTS urls (
			short_url TEXT PRIMARY KEY,
			long_url TEXT NOT NULL
		);
	`
	_, err = db.Exec(createTableStmt)
	if err != nil {
		log.Fatal(err)
	}

	// CORS setup
	c := cors.Default()

	// HTTP handlers
	http.HandleFunc("/", handleRedirect)

	// Handle the shorten endpoint
	http.HandleFunc("/shorten", handleShorten)
	log.Println("Starting server on 0.0.0.0:8080")

	// Start the server
	http.ListenAndServe(":8080", c.Handler(http.DefaultServeMux))
}

func handleRedirect(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Get the short URL from the path
	shortURL := strings.TrimPrefix(r.URL.Path, "/")
	log.Printf("Received redirect request for short URL: %s", shortURL)

	var longURL string
	err := db.QueryRow("SELECT long_url FROM urls WHERE short_url = ?", shortURL).Scan(&longURL)
	if err == sql.ErrNoRows {
		log.Printf("Short URL not found: %s", shortURL)
		http.NotFound(w, r)
		return
	} else if err != nil {
		log.Printf("Error fetching long URL for short URL %s: %v", shortURL, err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	log.Printf("Redirecting from short URL %s to long URL %s", shortURL, longURL)
	http.Redirect(w, r, longURL, http.StatusFound)
}

func handleShorten(w http.ResponseWriter, r *http.Request) {

	// CORS headers
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	// Get the long URL from the query parameters
	longURL := r.URL.Query().Get("url")
	if longURL == "" {
		log.Println("Missing URL parameter")
		http.Error(w, "Missing URL parameter", http.StatusBadRequest)
		return
	}

	log.Printf("Received request to shorten URL: %s", longURL)

	// Fix the URL if it doesn't start with http:// or https://
	if !strings.HasPrefix(longURL, "http://") && !strings.HasPrefix(longURL, "https://") {
		longURL = "http://" + longURL
	}

	// Generate a short URL and store the mapping
	shortURL := generateShortURL()

	_, err := db.Exec("INSERT INTO urls (short_url, long_url) VALUES (?, ?)", shortURL, longURL)
	if err != nil {
		log.Printf("Failed to insert URL into database: %v", err)
		http.Error(w, "Failed to shorten URL", http.StatusInternalServerError)
		return
	}

	fmt.Fprintf(w, "http://%s/%s", r.Host, shortURL)
}

func generateShortURL() string {

	// Generate a random 6 character string
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 6)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	shortURL := string(b)
	return shortURL
}
