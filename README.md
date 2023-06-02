This project was made with node.js and express.js
It's using mysql as database and JWToken as auth login.

## Databse

Database is formed by two tables: user and contact.

### fields

1. user: id, email, username, password
1. contact: name, number, created_by -> id(user)
