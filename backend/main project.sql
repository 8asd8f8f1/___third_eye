drop database thirdEyeDB;
create database thirdEyeDB;

use thirdEyeDB;

CREATE TABLE Users (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(50) NOT NULL,
    Email VARCHAR(50) UNIQUE NOT NULL,
    Phone BIGINT UNIQUE NOT NULL,
    UPassword VARCHAR(50) NOT NULL
);

-- alter table users modify phone bigint;

CREATE TABLE Address (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    HouseNo VARCHAR(50),
    Street VARCHAR(50),
    Pincode INT NOT NULL,
    City VARCHAR(50) NOT NULL,
    District VARCHAR(50) NOT NULL,
    State VARCHAR(50) NOT NULL,
    CONSTRAINT Users_Address_FK FOREIGN KEY (UserID)
        REFERENCES Users (ID)
);


CREATE TABLE UserEvent (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    Date_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    EventStatus VARCHAR(50) DEFAULT 'Open',
    Severity VARCHAR(50),
    EventDescription LONGTEXT,
    Category VARCHAR(50) NOT NULL,
    Title TEXT NOT NULL,
    Upvote INT DEFAULT 0,
    Downvote INT DEFAULT 0,
    isVerified BOOLEAN DEFAULT FALSE,
    Event_time DATETIME,
    CONSTRAINT Users_UserEvent_FK FOREIGN KEY (UserID)
        REFERENCES Users (ID)
);

CREATE TABLE Location (
    ID INT PRIMARY KEY AUTO_INCREMENT,
    Latitude POINT NOT NULL,
    Longitude POINT NOT NULL
);

CREATE TABLE LocationMapping (
    LocationID INT,
    EventID INT,
    UserID INT,
    CONSTRAINT UserEvent_LocationMapping_FK FOREIGN KEY (EventID)
        REFERENCES UserEvent (ID),
    CONSTRAINT Location_LocationMapping_FK FOREIGN KEY (LocationID)
        REFERENCES Location (ID)
);

-- CREATE TABLE Images (
--     ID INT PRIMARY KEY AUTO_INCREMENT,
--     ImageName VARCHAR(255) UNIQUE NOT NULL,
--     Filepath TEXT NOT NULL
-- );

-- CREATE TABLE ImageMapping (
--     ImageID INT,
--     EventID INT,
--     CONSTRAINT UserEvent_ImageMapping_FK FOREIGN KEY (EventID)
--         REFERENCES UserEvent (ID),
--     CONSTRAINT Images_ImageMapping_FK FOREIGN KEY (ImageID)
--         REFERENCES Images (ID)
-- );


insert into Users (UserName,Email,Phone,UPassword) values 
('Ava','ava@gmail.com','9512436458','ava'),
('Amelia','amelia@gmail.com','9575316458','amelia'),
('Alexander','alexander@gmail.com','9753236458','alexander'),
('Anthony','anthony@gmail.com','9512431569','Anthony'),
('Emma','emma@gmail.com','8563436458','emma');

select * from Users;

insert into Address ( UserID ,HouseNo, Street, Pincode ,City ,District ,State ) values
					(1,'45','','580425','Amaravati Capital City','Kurnool','Andhra Pradesh '),
                    (2,'14','','801315','Manihari','Katihar','Bihar'),
                    (3,'4','','802484','Ahmadabad','Ahmadabad','Gujarat'),
                    (4,'7','','802629','Surat','Surat','Gujarat'),
                    (5,'4','','800396','Ratia','Fatehabad','Gujarat');
                    
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time, Upvote, Downvote) values 
('1','Null','High','Two cars heads-on collision. 3 People were injured seriously.','Accident','Car Accident','2022-12-02 17:22:00', 127, 2),
('2','Null','High','Sudden fight between two people and a man was shot in the fight. He was serioulsy injured','Crime','Gunshot by walker','2022-11-02 08:22:00', 4, 1),
('3','Null','Low','There is no proper garbage collection method. Streets are coverd in waste.','Locality Issue','Garbage Collection','2022-12-12 15:22:00', 23, 0),
('4','Open','Med','I lost my wallet which contains some amount of money and my credit card.','Missing Items','Lost Wallet','2022-12-05 09:22:00', 15, 3),
('5','Null','High','An apartment caught fire due to short circuit. There were 2 casualities and no deaths','Accident','Fire explosion in apartment','2021-11-04 20:22:00', 7, 2);

select * from UserEvent;
