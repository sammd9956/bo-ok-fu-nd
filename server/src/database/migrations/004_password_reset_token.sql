CREATE TABLE IF NOT EXISTS tbl_password_reset_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT NOT NULL,

    token_hash VARCHAR(255) NOT NULL,

    token_type ENUM(
        'PASSWORD_RESET',
        'EMAIL_VERIFICATION'
    ) NOT NULL,

    expires_at DATETIME NOT NULL,

    used_at DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
    REFERENCES tbl_users(user_id)
    ON DELETE CASCADE

) ENGINE=InnoDB;