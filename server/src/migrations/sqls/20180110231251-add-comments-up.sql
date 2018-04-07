create table comments(
id varchar(50) unique,
data varchar(50) not null,
parent varchar(50) not null,
author varchar(50) not null,
isReply boolean,
originID varchar(50),
created varchar(50)

);

insert into comments(id,data,parent,author) values('adfg33hh','comment 1', 1, 1);