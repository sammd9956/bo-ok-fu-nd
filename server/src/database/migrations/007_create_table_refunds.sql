CREATE TABLE IF NOT EXISTS refunds (
    id INT PRIMARY KEY AUTO_INCREMENT,

    payment_id INT NOT NULL,

    refund_amount DECIMAL(12,2),

    refund_status ENUM(
        'pending',
        'processed',
        'failed'
    ),

    gateway_refund_id VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (payment_id)
        REFERENCES tbl_payments(id)
) ENGINE=InnoDB;