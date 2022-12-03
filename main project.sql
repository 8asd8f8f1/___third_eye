create database thirdEyeDB;

use thirdEyeDB;

create table Users
(
	ID int primary key auto_increment,
    UserName varchar(50) not null,
    Email varchar(50) unique not null,
    Phone bigint unique not null,
    UPassword varchar(50) not null
);

-- alter table users modify phone bigint;

create table Address
(
	ID int primary key auto_increment,
    UserID int,
    HouseNo	varchar(50) not null,
    Street varchar(50) not null,
    Pincode int not null,
    City varchar(50) not null,
    District varchar(50) not null,
    State varchar(50) not null,
    CONSTRAINT Users_Address_FK FOREIGN  KEY (UserID) REFERENCES Users(ID)
);

create table UserEvent
(
	ID int primary key auto_increment,
    UserID int,
    Date_time datetime,
    EventStatus varchar(50) not null,
    Severity varchar(50),
    EventDescription longtext,
    Category varchar(50) not null,
    Title text not null,
    Upvote int not null,
    Downvote int not null,
    Priority varchar(50) not null,
    isVerified varchar(50) not null,
    CONSTRAINT Users_UserEvent_FK FOREIGN  KEY (UserID) REFERENCES Users(ID)
);



create table Location
(
	ID int primary key auto_increment,
    Latitude point not null,
    Longitude point not null
);

create table LocationMapping
(
	LocationID int,
    EventID int,
    UserID int,
    CONSTRAINT UserEvent_LocationMapping_FK FOREIGN  KEY (EventID) REFERENCES UserEvent(ID),
    CONSTRAINT Location_LocationMapping_FK FOREIGN  KEY (LocationID) REFERENCES Location(ID)
);

alter table locationmapping drop constraint Users_LocationMapping_FK;

show tables;

create table Images
(	
	ID int primary key auto_increment,
    ImageName varchar(255) unique not null,
    Filepath text not null
);

create table ImageMapping
(
	ImageID int ,
    EventID int,
    CONSTRAINT UserEvent_ImageMapping_FK FOREIGN  KEY (EventID) REFERENCES UserEvent(ID),
    CONSTRAINT Images_ImageMapping_FK FOREIGN  KEY (ImageID) REFERENCES Images(ID)
);


