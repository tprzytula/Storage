--liquibase formatted sql

-- changeset liquibase:add_procedure_add_collection endDelimiter://
CREATE PROCEDURE AddCollection(IN input_name VARCHAR(30), OUT inserted_collection_id BINARY(16))
BEGIN
    IF input_name IS NULL OR input_name = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Collection name is null or empty', MYSQL_ERRNO = 1001;
    END IF;
    
    IF EXISTS (SELECT name FROM storage.collection WHERE name = input_name)
    THEN
        SIGNAL SQLSTATE '10001' SET MESSAGE_TEXT = 'Collection already exists', MYSQL_ERRNO = 1001;
    ELSE
        INSERT INTO storage.collection (name) VALUES (input_name);
        SET inserted_collection_id = (SELECT id FROM storage.collection WHERE name = input_name);
    END IF;
END //
-- rollback DROP PROCEDURE AddCollection