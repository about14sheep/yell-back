#!/bin/sh
psql -U postgres
yellapppassword
create user yellapp with password 'yellapppassword' createdb;
\q
npx sequelize-cli db:create
npx sequelize-cli db:migrate

npm run dev