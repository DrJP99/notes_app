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
	color VARCHAR(10),
	PRIMARY KEY(tag_id)
);
CREATE TABLE note_tag (
	nt_id SERIAL,
	note_id INT NOT NULL,
	tag_id INT NOT NULL,
	PRIMARY KEY(nt_id),
	CONSTRAINT fk_notes FOREIGN KEY(note_id) REFERENCES notes(note_id),
	CONSTRAINT fk_tags FOREIGN KEY(tag_id) REFERENCES tags(tag_id)
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
INSERT INTO tags(tag_name, color)
VALUES ('important', 'red');
INSERT INTO tags(tag_name, color)
VALUES ('school', 'blue');
INSERT INTO tags(tag_name, color)
VALUES ('work', 'green');
INSERT INTO tags(tag_name, color)
VALUES ('home', 'purple');
-- inserting note_tags
INSERT INTO note_tag(note_id, tag_id)
VALUES (1, 1);
INSERT INTO note_tag(note_id, tag_id)
VALUES (1, 3);
INSERT INTO note_tag(note_id, tag_id)
VALUES (2, 4);
INSERT INTO note_tag(note_id, tag_id)
VALUES (3, 2);
INSERT INTO note_tag(note_id, tag_id)
VALUES (3, 3);
-- INSERT INTO tags (tag_name, note_id)
-- VALUES('important', 2);
-- INSERT INTO tags (tag_name, note_id)
-- VALUES('test', 3);
-- INSERT INTO tags (tag_name, note_id)
-- VALUES('exciting', 1);
-- INSERT INTO tags (tag_name, note_id)
-- VALUES('important', 1);