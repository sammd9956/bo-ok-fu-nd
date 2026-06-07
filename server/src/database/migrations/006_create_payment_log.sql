CREATE TABLE IF NOT EXISTS payment_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,

    payment_id INT,

    event_name VARCHAR(255),

    request_payload JSON,

    response_payload JSON,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payment_id)
        REFERENCES tbl_payments(id)
) ENGINE=InnoDB;