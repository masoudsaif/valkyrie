--#1
DELIMITER //

CREATE TRIGGER checkParentIdNotEqualId BEFORE INSERT ON product_categories
FOR EACH ROW
BEGIN
    IF NEW.parentId IS NOT NULL AND NEW.parentId = NEW.id THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'parentId cannot be equal to id';
    END IF;
END//

DELIMITER ;