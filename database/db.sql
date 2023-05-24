CREATE TABLE user( 
   id int NOT NULL AUTO_INCREMENT,
   username VARCHAR(60) NOT NULL UNIQUE,
   email VARCHAR(60) NOT NULL UNIQUE,
   password VARCHAR(60) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE contact( 
   id INT NOT NULL AUTO_INCREMENT,
   name VARCHAR(60) NOT NULL,
   number VARCHAR(10) NOT NULL,
   created_by INT,
   PRIMARY KEY(id),
   FOREIGN(created_by) REFERENCES user(id)
);