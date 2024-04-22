CREATE TABLE product(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(200),
    image VARCHAR(200),
    price DECIMAL(10,2),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE product ADD COLUMN image VARCHAR(200) AFTER description;

INSERT INTO products (name, description, image, price)
VALUES ('Product Name', 'Product Description', 'https://res.cloudinary.com/dnydj4rsm/image/upload/v1713739154/sample.jpg', 99.99);
