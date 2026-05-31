CREATE TABLE IF NOT EXISTS tbl_donations (
    donation_id INT PRIMARY KEY AUTO_INCREMENT,

    campaign_id INT NOT NULL,

    donor_name VARCHAR(255),

    donor_email VARCHAR(255),

    amount DECIMAL(10,2) NOT NULL,

    message TEXT,

    donated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (campaign_id)
    REFERENCES campaigns(campaign_id)
) ENGINE=InnoDB;