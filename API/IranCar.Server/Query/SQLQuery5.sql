UPDATE Cars 
SET UserId = 'admin_root' 
WHERE UserId IS NULL;

SELECT * FROM Cars;