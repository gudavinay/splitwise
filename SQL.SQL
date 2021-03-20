CREATE TABLE user_profile_table (
	rec_id INT(10) NOT NULL AUTO_INCREMENT,
	email VARCHAR(50) NOT NULL COLLATE 'utf8_bin',
	name VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_bin',
	password VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_bin',
	profile_picture_url VARCHAR(1000) NULL DEFAULT NULL COLLATE 'utf8_bin',
	phone VARCHAR(20) NULL DEFAULT NULL COLLATE 'utf8_bin',
	currency VARCHAR(5) NULL DEFAULT 'USD' COLLATE 'utf8_bin',
	timezone VARCHAR(50) NULL DEFAULT '-8' COLLATE 'utf8_bin',
	language VARCHAR(20) NULL DEFAULT 'EN' COLLATE 'utf8_bin',
	PRIMARY KEY (rec_id) USING BTREE,
	UNIQUE INDEX rec_id (email) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=1
;



CREATE TABLE group_info_table (
	rec_id INT(10) NOT NULL AUTO_INCREMENT,
	name VARCHAR(50) NOT NULL COLLATE 'utf8_bin',
	admin_email VARCHAR(50) NULL DEFAULT NULL COLLATE 'utf8_bin',
	profile_picture_url VARCHAR(1000) NULL DEFAULT NULL COLLATE 'utf8_bin',
	PRIMARY KEY (rec_id) USING BTREE,
	UNIQUE INDEX name (name) USING BTREE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=1
;



CREATE TABLE user_group_table (
	rec_id INT(10) NOT NULL AUTO_INCREMENT,
	group_id INT(10) NULL DEFAULT NULL,
	user_id INT(10) NULL DEFAULT NULL,
	isAccepted INT(10) NULL DEFAULT NULL,
	INDEX rec_id (rec_id) USING BTREE,
	INDEX FK_user_group_table_user_profile_table (user_id) USING BTREE,
	INDEX FK_user_group_table_group_details_table (group_id) USING BTREE,
	CONSTRAINT FK_user_group_table_group_details_table FOREIGN KEY (group_id) REFERENCES splitwise_db.group_info_table (rec_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_user_group_table_user_profile_table FOREIGN KEY (user_id) REFERENCES splitwise_db.user_profile_table (rec_id) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=1
;



CREATE TABLE expenses_table (
	rec_id INT(10) NOT NULL AUTO_INCREMENT,
	group_id INT(10) NULL DEFAULT NULL,
	description VARCHAR(100) NULL DEFAULT NULL COLLATE 'utf8_bin',
	paid_by INT(10) NULL DEFAULT NULL,
	paid_to INT(10) NULL DEFAULT NULL,
	amount VARCHAR(10) NULL DEFAULT NULL COLLATE 'utf8_bin',
	settled VARCHAR(5) NULL DEFAULT NULL COLLATE 'utf8_bin',
	created_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	updated_date DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
	INDEX rec_id (rec_id) USING BTREE,
	INDEX FK__user_profile_table (paid_by) USING BTREE,
	INDEX FK_expenses_table_user_profile_table (paid_to) USING BTREE,
	INDEX FK_expenses_table_group_info_table (group_id) USING BTREE,
	CONSTRAINT FK_expenses_table_group_info_table FOREIGN KEY (group_id) REFERENCES splitwise_db.group_info_table (rec_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK_expenses_table_user_profile_table FOREIGN KEY (paid_by) REFERENCES splitwise_db.user_profile_table (rec_id) ON UPDATE CASCADE ON DELETE CASCADE,
	CONSTRAINT FK__user_profile_table FOREIGN KEY (paid_to) REFERENCES splitwise_db.user_profile_table (rec_id) ON UPDATE CASCADE ON DELETE CASCADE
)
COLLATE='utf8_bin'
ENGINE=InnoDB
AUTO_INCREMENT=1
;
