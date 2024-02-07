--liquibase formatted sql

-- changeset liquibase:create_collection_table
CREATE TABLE storage.collection (
  `id` BINARY(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID(), true)),
  `name` VARCHAR(30) NOT NULL
);
-- rollback DROP TABLE storage.collection;

-- changeset liquibase:create_item_table
CREATE TABLE storage.item (
  `id` BINARY(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID(), true)),
  `name` VARCHAR(30) NOT NULL,
  `form` VARCHAR(30) NOT NULL,
  `quantity` INTEGER NOT NULL
);
-- rollback DROP TABLE storage.item;

-- changeset liquibase:create_icon_table
CREATE TABLE storage.icon (
  `id` BINARY(16) UNIQUE PRIMARY KEY NOT NULL DEFAULT (UUID_TO_BIN(UUID(), true)),
  `name` VARCHAR(30) NOT NULL
);
-- rollback DROP TABLE storage.icon;

-- changeset liquibase:create_item_icon_table
CREATE TABLE storage.item_icon (
  `item_id` BINARY(16) NOT NULL,
  `icon_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`item_id`, `icon_id`)
);
-- rollback DROP TABLE storage.item_icon;

-- changeset liquibase:create_collection_item_table
CREATE TABLE storage.collection_item (
  `item_id` BINARY(16) NOT NULL,
  `collection_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`item_id`, `collection_id`)
);
-- rollback DROP TABLE storage.collection_item;

-- changeset liquibase:create_collection_icon_table
CREATE TABLE storage.collection_icon (
  `collection_id` BINARY(16) NOT NULL,
  `icon_id` BINARY(16) NOT NULL,
  PRIMARY KEY (`collection_id`, `icon_id`)
);
-- rollback DROP TABLE storage.collection_icon;

-- changeset liquibase:create_item_action_log_table
CREATE TABLE storage.item_action_log (
  `item_id` BINARY(16) PRIMARY KEY NOT NULL,
  `action` VARCHAR(30) NOT NULL,
  `date` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP())
);
-- rollback DROP TABLE storage.item_action_log;
