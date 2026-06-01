CREATE TABLE IF NOT EXISTS tbl_password_reset_tokens (
    id int AUTO_INCREMENT PRIMARY KEY,
    user_id int NOT NULL,
    token_hash VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    used BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
)ENGINE=InnoDB;