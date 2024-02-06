--liquibase formatted sql

-- changeset liquibase:add_procedure_add_item_to_collection endDelimiter://
CREATE PROCEDURE AddItemToCollection(IN input_name VARCHAR(30), IN input_form VARCHAR(30), IN input_quantity INTEGER(30), IN input_collection_id BINARY(16), IN input_icon_id BINARY(16))
BEGIN
    IF input_name IS NULL OR input_name = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Item name is null or empty', MYSQL_ERRNO = 1001;
    END IF;
    
    IF input_form IS NULL OR input_form = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Item form is null or empty', MYSQL_ERRNO = 1001;
    END IF;

    IF input_quantity IS NULL OR input_collection_id = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Item quantity is null or empty', MYSQL_ERRNO = 1001;
    END IF;

    IF input_collection_id IS NULL OR input_collection_id = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Collection id is null or empty', MYSQL_ERRNO = 1001;
    END IF;

    IF input_icon_id IS NULL OR input_icon_id = ''
    THEN
        SIGNAL SQLSTATE '10000' SET MESSAGE_TEXT = 'Icon id is null or empty', MYSQL_ERRNO = 1001;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM storage.collection WHERE id = input_collection_id)
    THEN
        SIGNAL SQLSTATE '10001' SET MESSAGE_TEXT = 'Chosen collection does not exist', MYSQL_ERRNO = 1001;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM storage.icon WHERE id = input_icon_id)
    THEN
        SIGNAL SQLSTATE '10001' SET MESSAGE_TEXT = 'Chosen icon does not exist', MYSQL_ERRNO = 1001;
    END IF;

    INSERT INTO storage.item (name, form, quantity) VALUES (input_name, input_form, input_quantity);
    SELECT LAST_INSERT_ID() as inserted_item_id;
    
    INSERT INTO storage.collection_item (item_id, collection_id) VALUES (inserted_item_id, input_collection_id);
    INSERT INTO storage.item_icon (item_id, icon_id) VALUES (inserted_item_id, input_icon_id);
END //
-- rollback DROP PROCEDURE AddItemToCollection
