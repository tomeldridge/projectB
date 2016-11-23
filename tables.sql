CREATE TABLE animal (
	name VARCHAR(255) NOT NULL,
	PRIMARY KEY (name) 
	)ENGINE=InnoDB;

CREATE TABLE profile (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	fname VARCHAR(255) NOT NULL,
	lname VARCHAR(255) NOT NULL,
	city VARCHAR(255),
	profileState VARCHAR(2),
	phone VARCHAR(255),
	email VARCHAR(255),
	facebookURL VARCHAR(512),
	username VARCHAR(255),
	password VARCHAR(255),
	isTemp TINYINT NOT NULL,
	PRIMARY KEY (id) 
	)ENGINE=InnoDB;	
	
	
CREATE TABLE animalInDistress (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	animalType VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	address VARCHAR(255) NOT NULL,
	city VARCHAR(255) NOT NULL,	
	animalState VARCHAR(2) NOT NULL,
	finderID SMALLINT UNSIGNED NOT NULL,
	status VARCHAR(255) NOT NULL,
	photo LONGBLOB,
	PRIMARY KEY (id), 
	FOREIGN KEY (animalType) REFERENCES animal (name) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (finderID) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE CASCADE
	)ENGINE=InnoDB;
	

CREATE TABLE willHost (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	userID SMALLINT UNSIGNED NOT NULL,
	animalType VARCHAR(255) NOT NULL,
	PRIMARY KEY (id), 
	FOREIGN KEY (animalType) REFERENCES animal (name) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (userID) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE CASCADE
	)ENGINE=InnoDB;
	
CREATE TABLE willAdopt (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	userID SMALLINT UNSIGNED NOT NULL,
	animalType VARCHAR(255) NOT NULL,
	PRIMARY KEY (id), 
	FOREIGN KEY (animalType) REFERENCES animal (name) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (userID) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE CASCADE
	)ENGINE=InnoDB;
	
	
CREATE TABLE willHelp (
	id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT,
	userID SMALLINT UNSIGNED NOT NULL,
	animalType VARCHAR(255) NOT NULL,
	PRIMARY KEY (id), 
	FOREIGN KEY (animalType) REFERENCES animal (name) ON DELETE RESTRICT ON UPDATE CASCADE,
	FOREIGN KEY (userID) REFERENCES profile (id) ON DELETE RESTRICT ON UPDATE CASCADE
	)ENGINE=InnoDB;
	
	


INSERT INTO animal VALUES ("Cat"),("Dog"), ("Bird"), ("Horse");

INSERT INTO profile (fname,lname,city,profileState,phone,email,facebookURL,username,password,isTemp) VALUES ("Ben","Jones","Portland","OR","444-234-1222","zzzben.jones@gmail.com","https://www.facebook.com/profile.php?id=1008970709&fref=ts","bjones","Password",0);
INSERT INTO profile (fname,lname,city,profileState,phone,email,facebookURL,username,password,isTemp) VALUES ("Sherry","Hernandez","Corvalis","OR","333-232-1243","zzzsherry.hernandez@gmail.com","https://www.facebook.com/profile.php?id=1008970709&fref=ts","shernandez","Password2",0);
INSERT INTO profile (fname,lname,city,profileState,phone,email,facebookURL,username,password,isTemp) VALUES ("Harry","Wiltsy","Seattle","WA","555-234-1222","zzzhwiltsy@gmail.com","https://www.facebook.com/profile.php?id=1008970709&fref=ts","bwiltsy","Password3",0);
INSERT INTO profile (fname,lname,city,profileState,phone,email,facebookURL,username,password,isTemp) VALUES ("Jenny","Chang","Tacoma","WA","253-234-1222","zzzjchang@gmail.com","https://www.facebook.com/profile.php?id=1008970709&fref=ts","jchang","Password4",0);
INSERT INTO profile (fname,lname,phone,isTemp) VALUES ("Sean","Crozier","253-364-2343",1);

INSERT INTO willHost (userID, animalType) VALUES (1,"Cat"),(1,"Dog"),(1,"Bird"),(1,"Horse"),(2,"Cat"),(2,"Dog"),(3,"Dog"),(4,"Bird");
INSERT INTO willAdopt (userID, animalType) VALUES (1,"Cat"),(2,"Dog"),(3,"Dog"),(4,"Bird");
INSERT INTO willHelp (userID, animalType) VALUES (1,"Cat"),(1,"Dog"),(1,"Bird"),(1,"Horse"),(2,"Cat"),(2,"Dog"),(3,"Dog"),(4,"Cat"),(4,"Dog"),(4,"Bird");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Cat","healthy but lonely","1500 SW 15th","Portland","OR",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Cat","looks hungry","1523 11th","Corvalis","OR",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Cat","looks very ill","139 Baker St","Seattle","WA",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Dog","living out in the cold","13294 Shelter Ave","Seattle","WA",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Dog","homless but healthy","1334 Couch St","Portland","OR",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Dog","needs a home","134 Everett St","Eugene","OR",1,"Found");

INSERT INTO animalInDistress (animalType,description,address,city,animalState,finderID,status)
VALUES ("Dog","adopt me!","139 Wedal St","Gresham","OR",1,"Found");









