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