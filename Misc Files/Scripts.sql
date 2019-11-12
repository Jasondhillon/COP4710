INSERT INTO `heroku_8a8e9bdedc4afce`.`universities`
(`name`,
`description`
)
VALUES
(
"University of Central Florida",
"Yeet"
);


INSERT INTO `heroku_8a8e9bdedc4afce`.`users`
(
`username`,
`password`,
`auth_level`,
`Users_university_id`)
VALUES
(
"jason",
123,
2,
2);


INSERT INTO `heroku_8a8e9bdedc4afce`.`rsos`
(
`name`,
`RSOs_admin_id`,
`RSOs_university_id`)
VALUES
("UCF Knights",
2,
2);



INSERT INTO `heroku_8a8e9bdedc4afce`.`events`
(`name`,
`category`,
`description`,
`time`,
`date`,
`location`,
`phone`,
`email`,
`status`,
`Events_university_id`,
`Events_RSO_id`,
`Events_admin_id`)
VALUES
("First University Meeting",
"Meeting",
"First Meeting for all university members!",
"6:00pm",
"10/21/19",
"28.6024° N, 81.2001° W",
"407-000-0000",
"test@knights.mail.edu",
"public",
2,
2,
2);


{
  "name": "South Florida Bulls Football Game 3",
  "category": "Meeting",
  "description": "Football!",
  "time": "6:00pm",
  "date": "11/26/19",
  "location": "USF",
  "phone": "417-414-6328",
  "email": "test@bulls.usf.edu",
  "status": "Public",
  "Events_university_id": "12",
  "Events_RSO_id": "32",
  "Events_admin_id": "292",
  "approved": "1"
  
}