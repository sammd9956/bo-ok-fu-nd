CREATE TABLE IF NOT EXISTS tbl_payments (
    id INT PRIMARY KEY AUTO_INCREMENT,

    donation_id INT NOT NULL,

    payment_gateway VARCHAR(50) NOT NULL,
    gateway_order_id VARCHAR(255),
    gateway_payment_id VARCHAR(255),
    gateway_transaction_id VARCHAR(255),

    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',

    payment_status ENUM(
        'pending',
        'processing',
        'paid',
        'failed',
        'cancelled',
        'refunded'
    ) DEFAULT 'pending',

    payment_method VARCHAR(50),

    paid_at TIMESTAMP NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (donation_id)
        REFERENCES tbl_donations(donation_id)
) ENGINE=InnoDB;