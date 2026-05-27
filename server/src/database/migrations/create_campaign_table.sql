CREATE TABLE IF NOT EXISTS tbl_campaigns (
    id INT PRIMARY KEY AUTO_INCREMENT,
    fund_id INT,
    title VARCHAR(255),
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    goal_amount DECIMAL(10,2),
    description TEXT,
    status ENUM('draft', 'active', 'completed'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (fund_id)
        REFERENCES tbl_funds (fund_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);