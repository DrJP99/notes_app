-- set time/date format
-- creating tables
CREATE TABLE notes (
	note_id SERIAL,
	created_by VARCHAR(10) NOT NULL,
	title VARCHAR(50) NOT NULL,
	body VARCHAR(280) NOT NULL,
	archived BOOLEAN NOT NULL DEFAULT false,
	create_dte TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(note_id)
);
CREATE TABLE tags (
	tag_id SERIAL,
	tag_name VARCHAR(10) NOT NULL,
	note_id INT NOT NULL,
	PRIMARY KEY(tag_id),
	CONSTRAINT fk_notes FOREIGN KEY(note_id) REFERENCES notes(note_id)
);
-- inserting notes
INSERT INTO notes(created_by, title, body, archived, create_dte)
VALUES (
		'jp',
		'My first note',
		'Hello, this is my first note!',
		false,
		'2024-05-20 14:17:36' -- '14:17 20/05/2024'
	);
INSERT INTO notes(created_by, title, body, archived, create_dte)
VALUES (
		'jp',
		'A child is born',
		'There has been a child born today',
		true,
		'1999-10-16 16:02:13' -- '16:02 16/10/1999'
	);
INSERT INTO notes(created_by, title, body)
VALUES ('test', 'Hello world', 'Hello world!');
-- inserting tags
INSERT INTO tags (tag_name, note_id)
VALUES('important', 2);
INSERT INTO tags (tag_name, note_id)
VALUES('test', 3);
INSERT INTO tags (tag_name, note_id)
VALUES('exciting', 1);
INSERT INTO tags (tag_name, note_id)
VALUES('important', 1);