# RBA_zadatak
Selekcijski zadatak

user_manager_web
npm install 
npm start

DB
docker-compose -up na folderu za kreaciju postgres baze
Izvrsiti upite po redu
INSERT INTO manager."role" (id,name) VALUES
	 (3,'ROLE_ADMIN'),
	 (2,'ROLE_MODERATOR'),
	 (1,'ROLE_USER');


za schemu manager treba izvrsiti sljedeće upite


 INSERT INTO manager.user_acc (id,last_login,"password",username,created_date,updated_date) VALUES
 (4,NULL,'$2a$10$P2cQOrVWPfpdac0c.Mxwcudz6GNMeMDHQWiAEwytvRoH0W5gArYNO','admin','2024-07-11 12:01:28.912373+02','2024-07-11 12:01:28.912373+02');
	 
 INSERT INTO manager.user_role (id,datetime,role_id,user_id) VALUES
 (1,'2024-07-11 12:01:28.912',1,4);

CREATE TABLE shedlock (
  name VARCHAR(64),
  lock_until TIMESTAMP(3) NULL,
  locked_at TIMESTAMP(3) NULL,
  locked_by VARCHAR(255),
  PRIMARY KEY (name)
)

Ostale tablice se kreiraju sa DDL-om

Nakon pokretanja manager i issuing aplikacije, u web se prijavljuje sa podacima 
username: admin
password: admin

