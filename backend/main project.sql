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
-- desc Users;

insert into Users (UserName,Email,Phone,UPassword) values 
('Ava','ava@gmail.com','9512436458','ava'),
('Amelia','amelia@gmail.com','9575316458','amelia'),
('Alexander','alexander@gmail.com','9753236458','alexander'),
('Anthony','anthony@gmail.com','9512431569','Anthony'),
('Emma','emma@gmail.com','8563436458','emma');


-- delete from Users where UserName in ('Emily','Luna','Lily','Lucas');

-- select * from Users;
-- select * from Address;
-- select * from UserEvent;

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
-- --------------- ---1---------2-------3-------4-------5------6--------7----
insert into address ( UserID ,HouseNo, Street, Pincode ,City ,District ,State ) values
					(1,'45','','580425','Amaravati Capital City','Kurnool','Andhra Pradesh '),
                    (2,'14','','801315','Manihari','Katihar','Bihar'),
                    (3,'4','','802484','Ahmadabad','Ahmadabad','Gujarat'),
                    (4,'7','','802629','Surat','Surat','Gujarat'),
                    (5,'4','','800396','Ratia','Fatehabad','Gujarat');

-- desc address;

-- alter table address modify Street varchar(50);


create table UserEvent
(
	ID int primary key auto_increment,
    UserID int,
    Date_time datetime  DEFAULT CURRENT_TIMESTAMP,
    EventStatus varchar(50) not null default "Open",
    Severity varchar(50),
    EventDescription longtext,
    Category varchar(50) not null,
    Title text not null,
    Upvote int default 0,
    Downvote int default 0,
    isVerified boolean default False,
    Event_time datetime,
    Latitude decimal(9,7),
    Longitude decimal(10,7),
    CONSTRAINT Users_UserEvent_FK FOREIGN  KEY (UserID) REFERENCES Users(ID)
);

	

-- alter table UserEvent modify Longitude decimal(10,7);
-- alter table UserEvent modify Latitude decimal(9,7);
-- desc UserEvent;
-- select * from userEvent;
-- Crime


/*
update UserEvent set Latitude=12.396742, Longitude=79.537877 where userid=1 and id=1;
update UserEvent set Latitude=13.117072, Longitude=77.536131 where userid=1 and id=20;
update UserEvent set Latitude=12.884071, Longitude=12.904324 where userid=5 and id=21;
*/

-- select * from userevent;

insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1','Null','High','Two cars heads-on collision. 3 People were injured seriously.','Accident','Car Accident','2022-12-02 17:22:00'),
('2','Null','High','Sudden fight between two people and a man was shot in the fight. He was serioulsy injured','Crime','Gunshot by walker','2022-11-02 08:22:00'),
('3','Null','Low','There is no proper garbage collection method. Streets are coverd in waste.','Locality Issue','Garbage Collection','2022-12-12 15:22:00'),
('4','Open','Med','I lost my wallet which contains some amount of money and my credit card.','Missing Items','Lost Wallet','2022-12-05 09:22:00'),
('5','Null','High','An apartment caught fire due to short circuit. There were 2 casualities and no deaths','Accident','Fire explosion in apartment','2021-11-04 20:22:00');

-- 6
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1',
'Null',
'High','
Pune: The onset of winter marks the perfect weather to go kite-flying. While it is a fun activity for some, the nylon manja used in flying kites can have devastating consequences on human and avian lives. Despite this and the ban imposed by the National Green Tribunal (NGT) in 2017, the killer strings continue to find takers.
In January this year, a 39-year-old motorcycle rider in Telangana lost his life after getting entangled in kite strings. In another similar incident, a 30-year-old man riding a two-wheeler died in New Delhi after a stray manja lacerated his neck in July. In August, a 32-year-old food delivery agent had a fatal accident in Delhi when a kite string got entangled in the wheels of the motorbike, causing him to fall off the bike and getting run over by a heavy vehicle.

A senior police officer told TOI, “Such incidents are common near the slum pockets and outskirts of the city.”
Deputy commissioner of police (crime) Amol Zende said, “We took action against the shopkeepers selling nylon manja in the past. We will again crack the whip on shopkeepers selling the thread.”
A kite shopowner from Raviwar Peth said, “We only sell cotton manja. Before the pandemic, some customers would ask for the Chinese manja, specially during Makar Sankranti, as it gives people a sharp edge over the regular cotton manja, but we would simply turn them away. We don’t get such enquiries now.”
Another seller from Bohri Ali said, “While shops in Pune don’t keep or sell the Chinese manja, people discreetly buy it from Delhi or Uttar Pradesh.”

Speaking about the injuries caused by the manja, RT Borse, head of General Medicine at the Sassoon General Hospital, said, “Depending on the type of manja, the injury can range from superficial to fatal incisions. The injuries depend upon the force with which the manja encircles any part of the body. Most commonly, it can encircle the neck, cutting the upper respiratory airway and causing asphyxia.”

Sumedh Tarde, head of projects at ResQ Charitable Trust, said this year alone, over 150 cases of birds getting stuck in manja have been reported in Pune district. “Getting entangled in manja is one of the most common reasons why birds are reported for rescue. This is not a seasonal phenomenon, but happens throughout the year. Nylon threads are non-degradable and remain on the trees for long periods,” he said.',
'Accident',
'Nylon manja continues to find takers in spite of fatal accidents & NGT ban',
'2022-12-07 08:36:00');

-- 7
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('2',
'Null',
'High',
'AMROHA(UP): Three members of a family were killed after their car rammed into another vehicle on the Delhi-Lucknow National Highway in Amroha on Saturday evening, police said. A police spokesperson said a speeding Innova car travelling from Delhi towards Moradabad rammed into an unknown vehicle.
The Innova car was badly damaged and three people were trapped inside. The driver of the car died on the spot while two people, including a woman, were rushed to a government hospital where doctors declared them brought dead.

The deceased have been identified as Arhaan (22), Shoaib alias Jameel Khan (60) and his wife Afroz Begum (58), police added.',
'Accident',
'Uttar Pradesh: 3 killed in road accident on Delhi-Lucknow NH',
'2022-11-12 22:22:00');



-- 8
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('3',
'Null',
'Med',
'REWARI: Five members of a family, including two women, were killed and 11 others were injured after their vehicle collided with a parked truck on the Delhi-Jaipur highway near Odhi village in Haryanas Rewari on Tuesday.
PTI quoted police as saying, all those who died were residents of Samod village in Jaipur and were returning from Haridwar in a Multi Utility Vehicle.
Those who were injured have been admitted to the Community Health Centre in Bawal, police said.
An FIR has been lodged in this connection, police said.


Two men who died in the accident were aged 50 and 35 years.

The three others include a 16-year-old boy and two women aged 45 and 70 years, police said.


The MUV driver, who was among the injured, was booked for rash and negligent driving, police said.',
'Accident',
'Haryana: 5 of family killed in road accident on Delhi-Jaipur Highway',
'2022-05-27 18:53:00');




-- 9
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('4',
'Null',
'Low',
'NEW DELHI: A 55-year-old man died and another was grievously injured after being hit by a cab in central Delhis Daryaganj area early on Thursday morning, police said.

Police were informed about the incident near Sabzi Mandi in Daryaganj around 3.45 am.
According to the police, the accident occurred when the driver was checking the navigation route on his mobile phone.

While one of the victims, Kallu, was declared brought dead by the doctors of Lok Nayak Jai Prakash Narayan Hospital, another, Kanjhi, has been admitted to the ICU of the hospital with head injury.


The driver of the vehicle, Sachin (25), a resident of Mahendragarh district in Haryana, has been apprehended and the car seized from the accident spot, police said.',
'Accident',
'One killed, another injured after being hit by car in Delhis Daryaganj',
'2022-07-02 06:22:00');




-- 10
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('2',
'Null',
'High',
'On April 16, 2020, two sadhus, Kalpavriksha Giri Maharaj (70 years), Sushil Giri Maharaj (35 years), and their driver Nilesh Telgade (30 years), were mercilessly lynched in the Gadchinchale hamlet in Palghar district’s Dahanu tehsil, around 120 kilometres from Mumbai’s centre. The two sadhus hailed from Nashik and belonged to the Shri Panch Dashnam Juna Akhara, India’s largest sadhu order, which is centred in Varanasi. 
A few days before the occurrence of the horrific incident, rumours had been circulated in the village that bandits had come to the village with the intent of stealing kidneys, particularly those of minors, and selling them in the black market. As a result, the villagers established a 24-hour vigil. A mob of approximately 500 villagers attacked the sadhus and their driver, believing them to be kidnappers. 
The case was turned up to the state’s criminal investigation division, which conducted the inquiry. The Palghar police and later the state-CID apprehended a total of 251 suspects. 
The accused include 13 juveniles.More than 70 of the accused are still in custody. Devendra Fadnavis, the Maharashtra Leader of Opposition, and Yogi Adityanath, the Chief Minister of Uttar Pradesh, both urged a high-level investigation into the event shortly after it occurred. 
In 2020, the Maha Vikas Aghadi administration said that the BJP was engaging in “communal politics” over the event amid lockdown due to an increase in COVID-19 cases.',
'Crime',
'Palghar mob lynching',
'2020-04-16 18:05:00');


-- 11
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('5',
'Null',
'High',
'On October 27, 2020, a 21-year-old lady was murdered in broad daylight outside her college in Ballabgarh, Haryana’s Faridabad district. 
During a botched kidnapping attempt that was caught on video, the incident occurred. When the event occurred, a woman named Nikita Tomar had just left her institution after taking an exam. 
The accused, who came in a car, attempted to drag the lady inside in the hopes of abducting her, but she fought, prompting one of the accused to shoot her. 
The heinous crime was caught on video. She was rushed to the hospital, but she died as a result of her injuries. 
Following the shooting of a 21-year-old student in broad daylight in Haryana’s Ballabgarh, a tremendous outcry erupted in Faridabad, demanding swift justice. 
A guy called Touseef, who is supposedly a friend of the victim, shot and killed Nikita Tomar outside the Aggarwal College in Faridabad’s Ballabgarh. 
According to the girl’s family members and relatives, Touseef had pressured Nikita Tomar to convert to Islam, and when she refused, he attempted to kidnap her. 
He killed her after failing to apprehend her. A few years ago, the victim was said to have filed a complaint against the accused as well. 

The murder had been captured on stunning CCTV footage. The culprit could be seen stepping out of the automobile and drawing his pistol. Nikita was observed attempting to leave the situation and was able to avoid the assailant for a small period of time before being apprehended by him and shot at point-blank range. The assailant’s assistant is seen dragging him back into the car. 
They then ran away from the scene. According to Haryana Chief Minister ML Khattar, the offender was detained following an investigation.',
'Crime',
'Ballabgarh daylight murder',
'2020-10-27 10:10:00');

-- 12
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('2',
'Null',
'Low',
'The smuggling of gold into Kerala through diplomatic routes is the subject of the Kerala gold smuggling case. It was discovered after the customs department in Thiruvananthapuram caught 30-kilogram gold worth Rs 14.82 crore smuggled in a cargo disguised as diplomatic luggage on July 5, 2019. On July 11th, 2020, the prime accused of the Kerala gold smuggling case, Swapna Suresh was detained by National Investigation Agency and the customs department and was kept in judicial custody until November 6, 2021. 

Customs seized roughly 251 kg of gold from several airports in Kerala during the 2018–2019 fiscal year. 
In the fiscal year 2019–20, 540 kg of marijuana was confiscated, which was more than double the previous year’s total. 
In the same year, over 802 incidents of gold smuggling were also reported. According to different reports from Kerala Police, Koduvally town is a prominent smugglers’ base. 
Around 70% of the gold smuggled via Calicut International Airport is handled by various players in the area, according to estimates. 
Due to claimed incidents of the establishment of a link between smugglers and non-state actors, most extremist organizations and violent mafia, smuggling operations have progressed from an economic infraction to a severe security danger to the country. 
It is also claimed that huge Kerala jewelry businesses trade smuggled gold by posing as tiny fraudulent outfits.',
'Crime',
'Kerala Gold Smuggling case',
'2021-11-06 12:22:00');



-- 13
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('3',
'Null',
'Med',
'The inquiry of an Instagram group conversation formed by a group of schoolboys from South Delhi, India in 2020 is familiar by the name of the Bois Locker Room issue. The goal of the group chat was to distribute indecent photographs of women, many of whom were under the age of 18, resulting in public uproar and rumors. Members of the organization are claimed to include students in the 11th and 12th grades at some of Delhi’s most prestigious institutions, that used photographs of underage females without their permission, as well as nasty remarks, including references to gang rape. The prevalence of rape culture in schools caused arguments and controversy as a result of this. Members of the “Bois Locker Room” threatened to disclose nude images of the women who reported them, according to social media sites that shared leaked screenshots from the group. The Delhi Commission for Women criticized the organization in May 2020, and the Delhi Police’s cyber unit launched an investigation. 

Despite the fact that Delhi was under lockdown for COVID-19, the probe was apparently hastened with the support of Swati Maliwal, the Chairwoman of the Delhi Commission for Women. 
By May 6, 2020, fifteen students had been interrogated and one had been detained. Many of the 27 participants were found to be under the age of 18. On May 11, 2020, police in Noida, arrested the administrator of “Bois Locker Room,” caught another adolescent in the group, and confiscated all of the defendants’ cell phones. 
24 of the 27 youngsters had been inspected, two were out of reach, and one’s specifics were still being worked out.',
'Crime',
'Bois Locker Room',
'2022-05-06 13:45:00');


-- 14
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('2',
'Null',
'High',
'On February 16, 2002, a young man Nitish Katara went to a dear friend’s wedding. Little did he know that it was going to be the last night of his life. This was another hideous “honour-killing” case which shook the entire country.

What Really Happened?
On the night of February 16, 2002, Nitish Katara was abducted from a wedding by Vikas Yadav, who is the son of the politician DP Yadav. Vikas, Vishal Yadav and Sukhdev Pehelwan took Katara in a Tata Safari and hammered him to death, before throwing his body near Hapur crossing in a village called Khurja in Bulandshahr.

Why the Murder?
Nitish Katara, IMT Ghaziabad graduate, and son of a bureaucrat was involved in a love-affair with Bharti Yadav, daughter of political strongman DP Yadav. Bharti’s family was against their relationship and had given several threats, but the couple carried on with their relationship, nonetheless.',
'Crime',
'2002 Nitish Katara Case (Delhi/UP)',
'2002-02-16 08:22:00');


-- 15
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1',
'Null',
'Low',
'I want to draw you kind attention towards the rude and irresponsible behaviour of both the drivers and the bus conductors with the commuters. They look towards the passengers with indifference and behave with them in a very unfriendly and absurd way. They lack etiquettes and use filthy language.
Generally, the bus drivers do not stop the bus at the fixed stop. The rather disdain the travellers and stop before or after the bus-stop so the passengers have to run after the bus. The passenger hardly approaches the bus when they start. In this way, many commuters fall and feel a lot of irritation and insult.
No less irresponsible is the behavior of conductors. They never bother to check whether the passengers have got into bus or not and are bent on blowing the whistle. The bus moves while passengers have hardly one foot on the foot board. They forget the elementary duties of the conductors and behave indecently. They show no courtesy and sympathy for the seniot citizens and the ladies.',
'Transport',
'Rude and irresponsible behavior of bus conductors',
'2021-12-05 09:22:00');


-- 16
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1',
'Null',
'Med',
'I would like to draw your kind attention towards the pathetic state of roads in our area. For the last four
months, the road has been almost impassable. We have made several complaints, but no action has
been taken.

This segment was dug up 3 months before for some pipeline work. The road was not patched properly
and a rough and uneven layer of concrete was dumped on these segments which made it extremely
hard to drive on these segments. The surface of the road was also broken by heavy rains which have
created the craters, making the journey even worse. Most of the vehicles keep avoiding these concrete
patches and stick to one side of the road resulting in slow-moving traftic. During the rains, the road
gets easily flooded',
'Transport',
'Bad condition if roads ',
'2018-04-15 19:13:00');



-- 17
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('3',
'Null',
'Low',
'I would like to bring to your notice the bad condition of the roads in our area.
For the last four months the road has been almost impassable. We have made several complaints. But the problem is being neglected for a long time. The surface of the road is broken by the heavy rains. There are heaps of road material on both sides of the road. They leave only little room in the middle. The side drains are blocked and the water flows out. So, the road gets flooded even after a slight rain. There are pot-holes on the road. The broken culvert is also a danger for vehicles.
',
'Transport',
'Bad condition of roads ',
'2012-07-12 22:10:00');




-- 18
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('5',
'Null',
'Med',
'Most of the street lights in our locality are out of order. Only a few street lights are functioning. It is darkness in the locality. 
It has caused a spurt in the incidence of crime in the area. People do not find it safe to go out of their houses with the prevailing of darkness. 
There are frequent incidents of chain snatching in the evening hours. Particularly ladies are unsafe in coming out of their houses in the dark. 
Snatching, burglary and theft have become the order of the day. The hooligans after committing crimes take advantage of the darkness and safely run away.',
'Locality Issue',
'Street light out of order',
'2022-07-12 22:10:00');



-- 19
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1',
'Closed',
'Med',
'The mobile is an Apple iPhone 4, with a removable red color case.The lMEI number of the phone is
 iMEI number and the serial number of the device is serial number2.The mobile numberof the SIM
 used in the lost phone is ≤phone numberz. Approximate value of the new device of this modelis Rs
 30,000.',
'Missing Items',
'Loss of mobile phone ',
'2021-01-12 15:10:00');


-- 20
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('1',
'Open',
'Med',
'Name：Obie
 Sex: Male,neutered
 Age: 5+/
 Breed: Akita/German Shep.
 Weight:70 Ibs
 Height: Really tall
 Color: Tan & White
 Features: Tail sticks up in
 the air like an Akita but not
 curled,huge ears
 Personality:Loves food,
 can be stand- offish but he
 is friendly. Knows sit, stay,
 down, etc.
 Last Seen On Windham Avenue near Rudden Lane in Colchester, wearing a
 green Dogwatch collar & a black reflective collar on June 3, 2009.',
'Missing Items',
'Missing dog',
'2021-03-01 11:10:00');


-- 21
insert into UserEvent (UserID,EventStatus,Severity,EventDescription,Category,Title,event_time) values 
('5',
'Open',
'High',
'I am writing this letter to report on a lost identification card which was issued by my university. 
My name is Paul Jeremy, and I am a final year post-graduate student at the Bangalore University, majoring in Finance.
As soon as I became aware that I do not have my student ID with me this morning, I immediately informed the university authority about it. 
But, in response, they asked me to report the incident to the local police. 
if you find it anywhere in the neighbourhood please give it to the local authority.',
'Missing Items',
'ID card lost',
'2021-04-03 11:10:00');



update UserEvent set Latitude=12.901225, Longitude=77.5786533 where userid=1 and id=1;
update UserEvent set Latitude=26.347695, Longitude=86.078966 where userid=2 and id=2;
update UserEvent set Latitude=17.4122998, Longitude=78.2679574 where userid=3 and id=3;
update UserEvent set Latitude=22.835625, Longitude=75.589448 where userid=4 and id=4;
update UserEvent set Latitude=30.698648, Longitude=76.835469 where userid=5 and id=5;
update UserEvent set Latitude=18.5248904, Longitude=73.7228796 where userid=1 and id=6;
update UserEvent set Latitude=28.9138175, Longitude=78.439467 where userid=2 and id=7;
update UserEvent set Latitude=28.058933, Longitude=76.532035 where userid=3 and id=8;
update UserEvent set Latitude=28.616818, Longitude=77.167628 where userid=4 and id=9;
update UserEvent set Latitude=19.7540881, Longitude=71.9231165 where userid=2 and id=10;
update UserEvent set Latitude=28.3393409, Longitude=77.3084253 where userid=5 and id=11;
update UserEvent set Latitude=8.88726, Longitude=76.6032933 where userid=2 and id=12;
update UserEvent set Latitude=28.4684629, Longitude=77.1279273 where userid=3 and id=13;
update UserEvent set Latitude=28.378368, Longitude=77.8222583 where userid=2 and id=14;
update UserEvent set Latitude=28.564884,  Longitude=77.241317 where userid=1 and id=15;
update UserEvent set Latitude=28.616818, Longitude=77.167628 where userid=1 and id=16;
update UserEvent set Latitude=23.019550, Longitude=72.546772 where userid=3 and id=17;
update UserEvent set Latitude=12.884071, Longitude=77.187138 where userid=5 and id=18;
update UserEvent set Latitude=12.396742, Longitude=79.537877 where userid=1 and id=19;
update UserEvent set Latitude=13.117072, Longitude=77.536131 where userid=1 and id=20;
update UserEvent set Latitude=12.884071, Longitude=12.904324 where userid=5 and id=21;