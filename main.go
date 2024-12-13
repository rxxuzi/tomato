package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"sync"
	"time"

	_ "github.com/mattn/go-sqlite3"
)

// -----------------------------
// 構造体定義
// -----------------------------

type User struct {
	ID       int    `json:"id"`
	UserID   string `json:"user_id"`
	Password string `json:"password"`
}

type Post struct {
	ID        int       `json:"id"`
	UserID    int       `json:"user_id"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"created_at"`
}

// セッション管理用(簡易)
var sessionStore = struct {
	m map[string]int
	sync.Mutex
}{m: make(map[string]int)}

// グローバルDB
var db *sql.DB

// -----------------------------
// メインエントリポイント
// -----------------------------
func main() {
	var err error
	db, err = sql.Open("sqlite3", "./tomato.db")
	if err != nil {
		log.Fatal(err)
	}

	// 静的ファイルサーバー: wwwディレクトリをルートに
	fileServer := http.FileServer(http.Dir("./www"))
	http.Handle("/", fileServer)

	// APIハンドラ
	http.HandleFunc("/api/db/init", dbInitHandler)
	http.HandleFunc("/api/signup", signupHandler)
	http.HandleFunc("/api/signin", signinHandler)
	http.HandleFunc("/api/signout", signoutHandler)

	http.HandleFunc("/api/p/new", newPostHandler)
	http.HandleFunc("/api/p/delete", deletePostHandler)
	http.HandleFunc("/api/p/edit", editPostHandler)
	http.HandleFunc("/api/p/like", likeHandler)
	http.HandleFunc("/api/p/retweet", retweetHandler)
	http.HandleFunc("/api/p/search", searchHandler)
	http.HandleFunc("/api/p/reply", replyHandler)

	addr := "0.0.0.0:9300"
	fmt.Println("Tomato server running on", addr)
	log.Fatal(http.ListenAndServe(addr, nil))
}

// -----------------------------
// ユーティリティ関数
// -----------------------------
func sendJSON(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	json.NewEncoder(w).Encode(v)
}

func sendError(w http.ResponseWriter, msg string, code int) {
	w.WriteHeader(code)
	sendJSON(w, map[string]string{"error": msg})
}

func setSession(w http.ResponseWriter, userID int) {
	sessionToken := fmt.Sprintf("session_%d_%d", userID, time.Now().UnixNano())
	sessionStore.Lock()
	sessionStore.m[sessionToken] = userID
	sessionStore.Unlock()
	http.SetCookie(w, &http.Cookie{Name: "session_token", Value: sessionToken, Path: "/"})
}

func getUserIDFromSession(r *http.Request) (int, bool) {
	cookie, err := r.Cookie("session_token")
	if err != nil {
		return 0, false
	}
	sessionStore.Lock()
	defer sessionStore.Unlock()
	uid, ok := sessionStore.m[cookie.Value]
	return uid, ok
}

func clearSession(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie("session_token")
	if err == nil {
		sessionStore.Lock()
		delete(sessionStore.m, cookie.Value)
		sessionStore.Unlock()
		http.SetCookie(w, &http.Cookie{Name: "session_token", Value: "", Path: "/", MaxAge: -1})
	}
}

// -----------------------------
// DB初期化エンドポイント
// -----------------------------
func dbInitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}

	createUserTable := `CREATE TABLE IF NOT EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id TEXT UNIQUE NOT NULL,
		password TEXT NOT NULL
	);`

	createPostTable := `CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		content TEXT NOT NULL,
		created_at DATETIME NOT NULL,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);`

	createLikeTable := `CREATE TABLE IF NOT EXISTS likes (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		post_id INTEGER NOT NULL,
		user_id INTEGER NOT NULL,
		FOREIGN KEY (post_id) REFERENCES posts(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);`

	createReplyTable := `CREATE TABLE IF NOT EXISTS replies (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		post_id INTEGER NOT NULL,
		user_id INTEGER NOT NULL,
		content TEXT NOT NULL,
		created_at DATETIME NOT NULL,
		FOREIGN KEY (post_id) REFERENCES posts(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);`

	createRetweetTable := `CREATE TABLE IF NOT EXISTS retweets (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		post_id INTEGER NOT NULL,
		user_id INTEGER NOT NULL,
		created_at DATETIME NOT NULL,
		FOREIGN KEY (post_id) REFERENCES posts(id),
		FOREIGN KEY (user_id) REFERENCES users(id)
	);`

	_, err := db.Exec(createUserTable)
	if err != nil {
		sendError(w, "Failed to create users table", http.StatusInternalServerError)
		return
	}
	_, err = db.Exec(createPostTable)
	if err != nil {
		sendError(w, "Failed to create posts table", http.StatusInternalServerError)
		return
	}
	_, err = db.Exec(createLikeTable)
	if err != nil {
		sendError(w, "Failed to create likes table", http.StatusInternalServerError)
		return
	}
	_, err = db.Exec(createReplyTable)
	if err != nil {
		sendError(w, "Failed to create replies table", http.StatusInternalServerError)
		return
	}
	_, err = db.Exec(createRetweetTable)
	if err != nil {
		sendError(w, "Failed to create retweets table", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "DB initialized"})
}

// -----------------------------
// ユーザ関連エンドポイント
// -----------------------------
func signupHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	userID := r.FormValue("user_id")
	pass := r.FormValue("password")

	if userID == "" || pass == "" {
		sendError(w, "user_id and password are required", http.StatusBadRequest)
		return
	}

	_, err := db.Exec("INSERT INTO users (user_id, password) VALUES (?, ?)", userID, pass)
	if err != nil {
		sendError(w, "User already exists or error occurred", http.StatusBadRequest)
		return
	}

	sendJSON(w, map[string]string{"message": "signup success"})
}

func signinHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	userID := r.FormValue("user_id")
	pass := r.FormValue("password")

	if userID == "" || pass == "" {
		sendError(w, "user_id and password are required", http.StatusBadRequest)
		return
	}

	var uid int
	var dbPass string
	err := db.QueryRow("SELECT id, password FROM users WHERE user_id = ?", userID).Scan(&uid, &dbPass)
	if err != nil {
		sendError(w, "User not found", http.StatusUnauthorized)
		return
	}
	if dbPass != pass {
		sendError(w, "Invalid password", http.StatusUnauthorized)
		return
	}

	setSession(w, uid)
	sendJSON(w, map[string]string{"message": "signin success"})
}

func signoutHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	clearSession(w, r)
	sendJSON(w, map[string]string{"message": "signout success"})
}

// -----------------------------
// 投稿関連エンドポイント
// -----------------------------
func newPostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	content := r.FormValue("content")
	if content == "" {
		sendError(w, "content is empty", http.StatusBadRequest)
		return
	}
	_, err := db.Exec("INSERT INTO posts (user_id, content, created_at) VALUES (?, ?, ?)", uid, content, time.Now())
	if err != nil {
		sendError(w, "Failed to create post", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "post created"})
}

func deletePostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	postIDStr := r.FormValue("post_id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		sendError(w, "invalid post_id", http.StatusBadRequest)
		return
	}

	var ownerID int
	err = db.QueryRow("SELECT user_id FROM posts WHERE id = ?", postID).Scan(&ownerID)
	if err != nil {
		sendError(w, "post not found", http.StatusNotFound)
		return
	}
	if ownerID != uid {
		sendError(w, "cannot delete others' posts", http.StatusForbidden)
		return
	}

	_, err = db.Exec("DELETE FROM posts WHERE id = ?", postID)
	if err != nil {
		sendError(w, "failed to delete post", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "post deleted"})
}

func editPostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	postIDStr := r.FormValue("post_id")
	newContent := r.FormValue("content")
	if newContent == "" {
		sendError(w, "content is empty", http.StatusBadRequest)
		return
	}

	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		sendError(w, "invalid post_id", http.StatusBadRequest)
		return
	}

	var ownerID int
	err = db.QueryRow("SELECT user_id FROM posts WHERE id = ?", postID).Scan(&ownerID)
	if err != nil {
		sendError(w, "post not found", http.StatusNotFound)
		return
	}
	if ownerID != uid {
		sendError(w, "cannot edit others' posts", http.StatusForbidden)
		return
	}

	_, err = db.Exec("UPDATE posts SET content = ? WHERE id = ?", newContent, postID)
	if err != nil {
		sendError(w, "failed to edit post", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "post edited"})
}

func likeHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	postIDStr := r.FormValue("post_id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		sendError(w, "invalid post_id", http.StatusBadRequest)
		return
	}

	var exists int
	err = db.QueryRow("SELECT COUNT(*) FROM likes WHERE post_id = ? AND user_id = ?", postID, uid).Scan(&exists)
	if err != nil {
		sendError(w, "error checking like", http.StatusInternalServerError)
		return
	}
	if exists > 0 {
		// いいね解除
		_, err = db.Exec("DELETE FROM likes WHERE post_id = ? AND user_id = ?", postID, uid)
		if err != nil {
			sendError(w, "failed to unlike", http.StatusInternalServerError)
			return
		}
		sendJSON(w, map[string]string{"message": "unliked"})
		return
	}

	_, err = db.Exec("INSERT INTO likes (post_id, user_id) VALUES (?, ?)", postID, uid)
	if err != nil {
		sendError(w, "failed to like", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "liked"})
}

func retweetHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	postIDStr := r.FormValue("post_id")
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		sendError(w, "invalid post_id", http.StatusBadRequest)
		return
	}

	var exists int
	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE id = ?", postID).Scan(&exists)
	if err != nil || exists == 0 {
		sendError(w, "original post not found", http.StatusNotFound)
		return
	}

	_, err = db.Exec("INSERT INTO retweets (post_id, user_id, created_at) VALUES (?, ?, ?)", postID, uid, time.Now())
	if err != nil {
		sendError(w, "failed to retweet", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "retweeted"})
}

func searchHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	keyword := r.FormValue("keyword")
	if keyword == "" {
		sendError(w, "keyword is empty", http.StatusBadRequest)
		return
	}

	rows, err := db.Query("SELECT id, user_id, content, created_at FROM posts WHERE content LIKE ?", "%"+keyword+"%")
	if err != nil {
		sendError(w, "search failed", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var results []Post
	for rows.Next() {
		var p Post
		err = rows.Scan(&p.ID, &p.UserID, &p.Content, &p.CreatedAt)
		if err != nil {
			sendError(w, "failed to read result", http.StatusInternalServerError)
			return
		}
		results = append(results, p)
	}

	sendJSON(w, results)
}

func replyHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.NotFound(w, r)
		return
	}
	uid, ok := getUserIDFromSession(r)
	if !ok {
		sendError(w, "signin required", http.StatusUnauthorized)
		return
	}

	postIDStr := r.FormValue("post_id")
	content := r.FormValue("content")
	if content == "" {
		sendError(w, "content is empty", http.StatusBadRequest)
		return
	}
	postID, err := strconv.Atoi(postIDStr)
	if err != nil {
		sendError(w, "invalid post_id", http.StatusBadRequest)
		return
	}

	var exists int
	err = db.QueryRow("SELECT COUNT(*) FROM posts WHERE id = ?", postID).Scan(&exists)
	if err != nil || exists == 0 {
		sendError(w, "original post not found", http.StatusNotFound)
		return
	}

	_, err = db.Exec("INSERT INTO replies (post_id, user_id, content, created_at) VALUES (?, ?, ?, ?)", postID, uid, content, time.Now())
	if err != nil {
		sendError(w, "failed to reply", http.StatusInternalServerError)
		return
	}

	sendJSON(w, map[string]string{"message": "reply sent"})
}
