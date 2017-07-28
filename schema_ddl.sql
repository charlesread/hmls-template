drop table user_role;
drop table user;
drop table role;

create table user (
id int not null auto_increment,
username varchar(50) not null unique,
first_name varchar(50),
last_name varchar(50),
hash varchar(100) not null,
primary key (id)
);

create table role (
id int not null auto_increment,
role varchar(50) not null,
primary key (id)
);

create table user_role (
id int not null auto_increment,
user_id int not null,
role_id int not null,
primary key (id),
foreign key (user_id)
	references user(id),
foreign key (role_id)
	references role(id)
);