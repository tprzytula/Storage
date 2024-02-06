--liquibase formatted sql

-- changeset liquibase:add_foreign_key_item_id_to_item_icon
ALTER TABLE `item_icon` ADD CONSTRAINT `fk__item_icon__item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__item_icon__item_id`;

-- changeset liquibase:add_foreign_key_icon_id_to_item_icon
ALTER TABLE `item_icon` ADD CONSTRAINT `fk__item_icon__icon_id` FOREIGN KEY (`icon_id`) REFERENCES `icon` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__item_icon__icon_id`;

-- changeset liquibase:add_foreign_key_item_id_to_collection_item
ALTER TABLE `collection_item` ADD CONSTRAINT `fk__collection_item__item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__collection_item__item_id`;

-- changeset liquibase:add_foreign_key_collection_id_to_collection_item
ALTER TABLE `collection_item` ADD CONSTRAINT `fk__collection_item__collection_id` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__collection_item__collection_id`;

-- changeset liquibase:add_foreign_key_collection_id_to_collection_icon
ALTER TABLE `collection_icon` ADD CONSTRAINT `fk__collection_icon__collection_id` FOREIGN KEY (`collection_id`) REFERENCES `collection` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__collection_icon__collection_id`;

-- changeset liquibase:add_foreign_key_icon_id_to_collection_icon
ALTER TABLE `collection_icon` ADD CONSTRAINT `fk__collection_icon__icon_id` FOREIGN KEY (`icon_id`) REFERENCES `icon` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__collection_icon__icon_id`;

-- changeset liquibase:add_foreign_key_item_id_to_item_action_log
ALTER TABLE `item_action_log` ADD CONSTRAINT `fk__item_action_log__item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);
-- rollback ALTER TABLE user_connection DROP FOREIGN KEY `fk__item_action_log__item_id`;
