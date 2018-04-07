create table cards (
 id varchar(50) not null,
 name varchar(50) not null,
 description varchar(50),
 parent varchar(50) not null,
 author varchar(50) not null
);

insert into cards (id,name,description,parent,author)values ('boidhf','Card 1','card ones description', 1, 1);
