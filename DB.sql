CREATE TABLE messages (
    message_id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    message_text VARCHAR(1023) NOT NULL,
    created TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_username FOREIGN KEY (username)
    REFERENCES users(username)
);

CREATE TABLE users (
    id integer PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    roles VARCHAR(100) NOT NULL,
    saltedPassword VARCHAR(512) NOT NULL,
    refreshToken VARCHAR(512),
    created TIMESTAMP NOT NULL DEFAULT NOW(),
    userId VARCHAR(32) NOT NULL
)


INSERT INTO messages (username, message_text) 
VALUES 
('admin', 'test');