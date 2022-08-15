create table user(
  id int primary key AUTO_INCREMENT,
  name varchar(200),
  contactNumber varchar(10),
  email varchar(30),
  password varchar(50),
  status varchar(20),
  role varchar (20),
  unique (email)
);

insert into user(name,contactNumber,email,password,status,role)values('Admin','9025715306','kavin@gmail.com','123456789','true','admin');


create table category(
  id int   NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  primary key(id)
);


create table prodect(
  id int NOT NULL AUTO_INCREMENT,
  name varchar(255) NOT NULL,
  categoryId integer NOT NULL,
  price integer,
  status varchar(20),
  primary key(id)
)