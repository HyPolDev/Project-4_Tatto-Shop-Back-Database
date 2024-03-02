USE project4;

-- crear roles en el sistema (user (default), admin y superadmin):
INSERT INTO roles (id, name) VALUES (1, 'user');
INSERT INTO roles (id, name) VALUES (2, 'admin');
INSERT INTO roles (id, name) VALUES (3, 'superadmin');


-- Users

INSERT INTO users (name, email, password_hash, role_id) 
VALUES ("user", "user@user.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (name, email, password_hash, role_id)
VALUES ("admin", "admin@admin.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "2");

INSERT INTO users (name, email, password_hash, role_id)
VALUES ("super", "super", "super@super.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "3");

INSERT INTO users (name, email, password_hash, role_id) 
VALUES ("user2", "user2", "user2@user.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (name, email, password_hash, role_id) 
VALUES ("user3", "user3", "user3@user.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

INSERT INTO users (name, email, password_hash, role_id) 
VALUES ("user4", "user4", "user4@user.net", "$2b$08$NZOf4QPFlzzaiUiuBI76e.SDWK3RAnkjN.daswlTqPdrBdf86MXNO", "1");

--Services
INSERT INTO services (service_name, description)
VALUES ("Catalog Tattoo", "We offer a vast catalog of tattoo art work for every one and every part of anys body");

INSERT INTO services (service_name, description)
VALUES ("Custom Tattoo", "Get in contact an design your unique tattoo with the help suppervision and guidance of our artists");

INSERT INTO services (service_name, description)
VALUES ("Restoring and recoloring artworks", "Well take care of your old tattos to make them shine as the fist day");

INSERT INTO services (service_name, description)
VALUES ("Piercings", "We offer piercing and dilatation works as well as maintainance");

INSERT INTO services (service_name, description)
VALUES ("Miscellay", "Requested works will be considered by our staff, please get in contact for more information");


-- Appointments
INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("1", "2024-03-05", "1", "1");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("2", "2024-03-05", "4", "4");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("3", "2024-03-05", "5", "5");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("4", "2024-03-05", "6", "2");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("5", "2024-03-06", "5", "3");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("6", "2024-03-07", "6", "2");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("7", "2024-03-08", "4", "5");

INSERT INTO appointments (id, appointment_date, user_id, service_id)
VALUES ("8", "2024-03-08", "1", "3");