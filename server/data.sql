root:admin@localhost/test_schema

CREATE TABLE `task` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `text` varchar(45) DEFAULT NULL,
  `day` varchar(45) DEFAULT NULL,
  `reminder` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`)
);

insert into task( id, text, day, reminder) 
values (1,'Breakfast','Today',1);

insert into task( id, text, day, reminder) 
values (2,'Coffee','26 April 2024',1);