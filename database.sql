CREATE DATABASE callerslist;
 CREATE TABLE calllist(
    Caller_id SERIAL PRIMARY KEY,
    NAME VARCHAR(40) NOT NULL,
    PHONE VARCHAR(30)NOT NULL,
    EMAIL VARCHAR(40),
    ADDRESS VARCHAR(255) 
 
)