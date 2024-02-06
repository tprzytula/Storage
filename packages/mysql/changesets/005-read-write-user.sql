--liquibase formatted sql

-- changeset liquibase:add_rds_read_write_user
CREATE USER 'rds_storage_read_write'@'%' IDENTIFIED WITH AWSAuthenticationPlugin as 'RDS';
-- rollback DROP USER 'rds_storage_read_write'@'%';

-- changeset liquibase:add_rds_privileges
GRANT ALL PRIVILEGES ON storage.* TO 'rds_storage_read_write'@'%';
-- rollback REVOKE ALL PRIVILEGES ON *.* FROM 'rds_storage_read_write'@'%';
