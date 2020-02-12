CREATE DATABASE company_DB;
USE company_DB;


CREATE TABLE employee (
id int primary key,
first_name character varying(100),
last_name character varying(100),
manager_id bigint,
role_id bigint

)

CREATE TABLE roles (

title character varying(100),
salary bigint,
dept_id bigint,
id int primary key

)

CREATE TABLE department (
id int primary key,
dept_name character varying(100)
)