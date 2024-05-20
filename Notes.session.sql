-- creating tables
CREATE TABLE notes (
	note_id SERIAL,
	title VARCHAR(50) NOT NULL,
	body VARCHAR(280) NOT NULL,
	archived BOOLEAN NOT NULL DEFAULT false,
	create_dte DATE NOT NULL DEFAULT CURRENT_DATE,
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
INSERT INTO notes(title, body, archived, create_dte)
VALUES (
		'My first note',
		'Hello, this is my first note!',
		false,
		'2024-05-20 14:17:36-05'
	);
INSERT INTO notes(title, body, archived, create_dte)
VALUES (
		'A child is born',
		'There has been a child born today',
		true,
		'1999-10-16 16:02:13-05'
	);
INSERT INTO notes(title, body)
VALUES ('Hello world', 'Hello world!');
-- inserting tags
INSERT INTO tags (tag_name, note_id)
VALUES('important', 2);
INSERT INTO tags (tag_name, note_id)
VALUES('test', 3);
INSERT INTO tags (tag_name, note_id)
VALUES('exciting', 1);
INSERT INTO tags (tag_name, note_id)
VALUES('important', 1);