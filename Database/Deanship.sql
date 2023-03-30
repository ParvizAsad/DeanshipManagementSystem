--Database yaradırıq
create database deanship

--Table yaradırıq
create table public.lesson (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
CreditCount INT NOT null,
Duration INT NOT null,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.roomType (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.major (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
MajorCode INT NOT null,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.location (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.positions (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.department (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.gender (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.groups (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.room (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
RoomNumber INT NOT null,
Capacity INT NOT null,
IsDelete Boolean DEFAULT false,
RoomTypeId int,
   CONSTRAINT fk_roomType
      FOREIGN KEY(RoomTypeId) 
	  REFERENCES roomType(id)
)


create table public.person (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
FullName VARCHAR(50) NOT null,
PasportId VARCHAR(50) NOT null,
Email VARCHAR(50) NOT null,
Birthdate date NOT null,
Phno VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false,
GenderId int REFERENCES gender(id),
LocationId int REFERENCES location(id)
)

create table public.student (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
gpa int NOT null,
point int NOT null,
IsDelete Boolean DEFAULT false,
personId int REFERENCES person(id),
groupsId int REFERENCES groups(id),
majorId int REFERENCES major(id)
)

create table public.degree (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
Name VARCHAR(50) NOT null,
IsDelete Boolean DEFAULT false
)

create table public.teacher (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
IsDelete Boolean DEFAULT false,
personId int REFERENCES person(id),
degreeId int REFERENCES degree(id),
departmentId int REFERENCES department(id)
)

create table public.employee (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
IsDelete Boolean DEFAULT false,
personId int REFERENCES person(id),
positionId int REFERENCES position(id),
departmentId int REFERENCES department(id)
)

create table public.schudle (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
IsDelete Boolean DEFAULT false,
roomId int REFERENCES room(id),
lessonTypeId int REFERENCES lessonType(id),
lessonTime date not NULL,
lessonId int REFERENCES lesson(id),
groupsId int REFERENCES groups(id),
teacherId int REFERENCES teacher(id)
)

create table public.examDetail (
Id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
IsDelete Boolean DEFAULT false,
lessonId int REFERENCES lesson(id),
schudleId int REFERENCES schudle(id),
studentid int REFERENCES student(id),
score int not null
)


--table silmək
DROP TABLE positions 
DROP TABLE roomType 

-- table adının dəyişilməsi
 ALTER TABLE roomType RENAME TO lessonType
 
 
 insert into "groups" 
values ('p117'),
		('p314')
 