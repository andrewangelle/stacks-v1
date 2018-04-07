create table list_items(
id varchar(50) not null,
data varchar(50) not null,
completed boolean not null,
parent varchar(50) not null,
author varchar(50) not null,
created varchar(50),
updated varchar(50)
);

insert into list_items(id,data,completed,parent,author) values('scvb8fgj','list item', 'false' , 1, 1);