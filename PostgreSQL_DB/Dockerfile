# FROM postgres:latest
FROM postgres:17

ENV POSTGRES_DB=MRC_DB
ENV POSTGRES_USER=mrc_user
ENV POSTGRES_PASSWORD=passpass

COPY 02Feb2026.sql /docker-entrypoint-initdb.d

EXPOSE 5432
