CREATE TABLE IF NOT EXISTS tbl_campaigns (
    campaign_id INT PRIMARY KEY AUTO_INCREMENT,

    user_id INT NOT NULL,

    campaign_name VARCHAR(255) NOT NULL,

    campaign_type ENUM('class', 'school') NOT NULL,

    goal_amount DECIMAL(10,2) NOT NULL,
    fund_code VARCHAR(100) UNIQUE NOT NULL,

    message TEXT,

    start_date DATE,
    end_date DATE,

    status ENUM('active', 'completed') DEFAULT 'active',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id) REFERENCES tbl_users(user_id)
) ENGINE=InnoDB;