CREATE TABLE IF NOT EXISTS tbl_donations (
  donation_id INT PRIMARY KEY AUTO_INCREMENT,
  fund_id INT,
  donor_name VARCHAR(255) NOT NULL,
  donor_email VARCHAR(255) NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  notes TEXT,
  a_flag ENUM("0", "1") DEFAULT "0",
  transaction_type ENUM('donation', 'purchase') DEFAULT 'donation',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (fund_id) REFERENCES tbl_funds (fund_id)
  ON DELETE CASCADE
  ON UPDATE CASCADE
  
);