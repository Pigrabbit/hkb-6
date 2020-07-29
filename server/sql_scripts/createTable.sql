use banksalad;

CREATE TABLE IF NOT EXISTS user (
  id int PRIMARY KEY AUTO_INCREMENT,
  username varchar(255) NOT NULL,
  login_id varchar(255) NOT NULL,
  password varchar(255) NOT NULL
) ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS payment (
  id int PRIMARY KEY AUTO_INCREMENT,
  payment_name varchar(255) NOT NULL,
  user_id int,
  FOREIGN KEY(user_id) REFERENCES user(id) 
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;



CREATE TABLE IF NOT EXISTS `transaction` (
  id bigint PRIMARY KEY AUTO_INCREMENT,
  category varchar(255) NOT NULL,
  user_id int,
  payment_id int,
  amount int NOT NULL,
  created_at datetime NOT NULL,
  content text NOT NULL,
  t_type tinyint NOT NULL,
  FOREIGN KEY(user_id) REFERENCES user(id)
  ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY(payment_id) REFERENCES payment(id)
  ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;