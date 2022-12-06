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
    HouseNo	varchar(50),
    Street varchar(50),
    Pincode int not null,
    City varchar(50) not null,
    District varchar(50) not null,
    State varchar(50) not null,
    CONSTRAINT Users_Address_FK FOREIGN  KEY (UserID) REFERENCES Users(ID)
);

desc address;

alter table address modify Street varchar(50);


create table UserEvent
(
	ID int primary key auto_increment,
    UserID int,
    Date_time datetime  DEFAULT CURRENT_TIMESTAMP,
    EventStatus varchar(50) default 'Open',
    Severity varchar(50),
    EventDescription longtext,
    Category varchar(50) not null,
    Title text not null,
    Upvote int default 0,
    Downvote int default 0,
    isVerified boolean default False,
    Event_time datetime,
    CONSTRAINT Users_UserEvent_FK FOREIGN  KEY (UserID) REFERENCES Users(ID)
);

select * from userevent where Category like 'Locality%';
select * from userevent;
desc userevent;

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

select * from users;
select * from address;



insert into Users (UserName,Email,Phone,UPassword) values 
('Ava','ava@gmail.com','9512436458','ava'),
('Amelia','amelia@gmail.com','9575316458','amelia'),
('Alexander','alexander@gmail.com','9753236458','alexander'),
('Anthony','anthony@gmail.com','9512431569','Anthony'),
('Emma','emma@gmail.com','8563436458','emma')
;

insert into address ( UserID ,HouseNo, Street, Pincode ,City ,District ,State ) values
					(13,'45','','580425','Amaravati Capital City','Kurnool','Andhra Pradesh '),
                    (14,'14','','801315','Manihari','Katihar','Bihar'),
                    (15,'4','','802484','Ahmadabad','Ahmadabad','Gujarat'),
                    (16,'7','','802629','Surat','Surat','Gujarat'),
                    (17,'4','','800396','Ratia','Fatehabad','Gujarat');
                    
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('12','Null','High','Two cars heads-on collision. 3 People were injured seriously.','Accident','Car Accident','2022-12-02 17:22:00'),
('13','Null','High','Sudden fight between two people and a man was shot in the fight. He was serioulsy injured','Crime','Gunshot by walker','2022-11-02 08:22:00'),
('14','Null','Low','There is no proper garbage collection method. Streets are coverd in waste.','Locality Issue','Garbage Collection','2022-12-12 15:22:00'),
('15','Open','Med','I lost my wallet which contains some amount of money and my credit card.','Missing Items','Lost Wallet','2022-12-05 09:22:00'),
('16','Null','High','An apartment caught fire due to short circuit. There were 2 casualities and no deaths','Accident','Fire explosion in apartment','2021-11-04 20:22:00');