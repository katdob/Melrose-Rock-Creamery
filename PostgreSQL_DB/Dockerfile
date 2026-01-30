# FROM postgres:latest
FROM postgres:17

ENV POSTGRES_DB=MRC_DB
ENV POSTGRES_USER=mrc_user
ENV POSTGRES_PASSWORD=passpass

COPY 30Jan2026_first_5_recipe_data.sql /docker-entrypoint-initdb.d

EXPOSE 5432
