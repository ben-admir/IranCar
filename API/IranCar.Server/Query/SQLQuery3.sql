IF NOT EXISTS (SELECT * FROM sys.columns WHERE Name = N'UserId' AND Object_ID = Object_ID(N'Cars'))
BEGIN
    ALTER TABLE Cars ADD UserId nvarchar(MAX) NULL;
END