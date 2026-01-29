--
-- PostgreSQL database cluster dump
--

\restrict AxmqWk8I5kUtMPUUys0xVADRgaiblBcpyOzNsUJf2ge835CRvBfzDLQswrodP1z

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "MRC_DB";




--
-- Drop roles
--

DROP ROLE mrc_user;


--
-- Roles
--

CREATE ROLE mrc_user;
ALTER ROLE mrc_user WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:72rDn36s+sKy2yzusQ10kg==$aFXN47m2Me8+WuU1dukiwIkg3wqckjC7y5XYlmvRITw=:xapM6dMx6g59AoKKHDdwQH4ayuenWETMQp/4YO8pftU=';

--
-- User Configurations
--








\unrestrict AxmqWk8I5kUtMPUUys0xVADRgaiblBcpyOzNsUJf2ge835CRvBfzDLQswrodP1z

--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

\restrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty

-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: mrc_user
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO mrc_user;

\unrestrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty
\connect template1
\restrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: mrc_user
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: mrc_user
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\unrestrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty
\connect template1
\restrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: mrc_user
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict V9xlerih3xiia6mVzzxgi20PYvL4L1sPYjsaie9f7r9coNcew1guaHBVxJMZ7Ty

--
-- Database "MRC_DB" dump
--

--
-- PostgreSQL database dump
--

\restrict fIpdCUO9IybsxeMv3taAkDwGUCsFcVICj7wEbIlSWfdq6LiuPLhpsTVCke2qPOf

-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: MRC_DB; Type: DATABASE; Schema: -; Owner: mrc_user
--

CREATE DATABASE "MRC_DB" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "MRC_DB" OWNER TO mrc_user;

\unrestrict fIpdCUO9IybsxeMv3taAkDwGUCsFcVICj7wEbIlSWfdq6LiuPLhpsTVCke2qPOf
\connect "MRC_DB"
\restrict fIpdCUO9IybsxeMv3taAkDwGUCsFcVICj7wEbIlSWfdq6LiuPLhpsTVCke2qPOf

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Ingredients; Type: TABLE; Schema: public; Owner: mrc_user
--

CREATE TABLE public."Ingredients" (
    "Id" integer NOT NULL,
    "Name" character varying(200) NOT NULL,
    "Unit" character varying(50) NOT NULL,
    "Amount" double precision NOT NULL,
    "RecipeId" integer
);


ALTER TABLE public."Ingredients" OWNER TO mrc_user;

--
-- Name: Ingredients_Id_seq; Type: SEQUENCE; Schema: public; Owner: mrc_user
--

ALTER TABLE public."Ingredients" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Ingredients_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Instructions; Type: TABLE; Schema: public; Owner: mrc_user
--

CREATE TABLE public."Instructions" (
    "Id" integer NOT NULL,
    "Text" text NOT NULL,
    "Order" integer NOT NULL,
    "RecipeId" integer NOT NULL
);


ALTER TABLE public."Instructions" OWNER TO mrc_user;

--
-- Name: Instructions_Id_seq; Type: SEQUENCE; Schema: public; Owner: mrc_user
--

ALTER TABLE public."Instructions" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Instructions_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: Recipe; Type: TABLE; Schema: public; Owner: mrc_user
--

CREATE TABLE public."Recipe" (
    "Id" integer NOT NULL,
    "Name" character varying(200) NOT NULL,
    "Author" character varying(100) NOT NULL,
    "CreatedDate" timestamp with time zone NOT NULL
);


ALTER TABLE public."Recipe" OWNER TO mrc_user;

--
-- Name: Recipe_Id_seq; Type: SEQUENCE; Schema: public; Owner: mrc_user
--

ALTER TABLE public."Recipe" ALTER COLUMN "Id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME public."Recipe_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Data for Name: Ingredients; Type: TABLE DATA; Schema: public; Owner: mrc_user
--

COPY public."Ingredients" ("Id", "Name", "Unit", "Amount", "RecipeId") FROM stdin;
\.


--
-- Data for Name: Instructions; Type: TABLE DATA; Schema: public; Owner: mrc_user
--

COPY public."Instructions" ("Id", "Text", "Order", "RecipeId") FROM stdin;
\.


--
-- Data for Name: Recipe; Type: TABLE DATA; Schema: public; Owner: mrc_user
--

COPY public."Recipe" ("Id", "Name", "Author", "CreatedDate") FROM stdin;
1	Simple Vanilla Ice Cream	Cuisinart	2024-01-01 00:00:00+00
2	Simple Chocolate Ice Cream	Cuisinart	2024-01-01 00:00:00+00
3	Butter Pecan Ice Cream	Cuisinart	2024-01-01 00:00:00+00
4	Fresh Strawberry Ice Cream	Cuisinart	2024-01-01 00:00:00+00
5	Peanut Butter Cup Ice Cream	Cuisinart	2024-01-01 00:00:00+00
6	S'mores Ice Cream	Cuisinart	2024-01-01 00:00:00+00
7	Banana Walnut Chip Ice Cream	Cuisinart	2024-01-01 00:00:00+00
8	Vanilla Bean Ice Cream	Cuisinart	2024-01-01 00:00:00+00
9	Fresh Mint and Chocolate Cookies Ice Cream	Cuisinart	2024-01-01 00:00:00+00
10	Mexican-Style Chocolate Ice Cream	Cuisinart	2024-01-01 00:00:00+00
11	Salted Caramel Ice Cream	Cuisinart	2024-01-01 00:00:00+00
12	Dark Chocolate Sorbet	Cuisinart	2024-01-01 00:00:00+00
13	Grapefruit and Prosecco Sorbet	Cuisinart	2024-01-01 00:00:00+00
14	Dairy-Free Vanilla Ice Cream	Cuisinart	2024-01-01 00:00:00+00
15	Coconut-Chocolate Ice Cream	Cuisinart	2024-01-01 00:00:00+00
16	Rich Vanilla Frozen Yogurt	Cuisinart	2024-01-01 00:00:00+00
17	Mango Frozen Yogurt	Cuisinart	2024-01-01 00:00:00+00
18	Chocolate-Pretzel Frozen Yogurt	Cuisinart	2024-01-01 00:00:00+00
19	Chocolate-Hazelnut Gelato	Cuisinart	2024-01-01 00:00:00+00
20	Espresso Gelato	Cuisinart	2024-01-01 00:00:00+00
21	Custard Gelato	Cuisinart	2024-01-01 00:00:00+00
\.


--
-- Name: Ingredients_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: mrc_user
--

SELECT pg_catalog.setval('public."Ingredients_Id_seq"', 1, false);


--
-- Name: Instructions_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: mrc_user
--

SELECT pg_catalog.setval('public."Instructions_Id_seq"', 1, false);


--
-- Name: Recipe_Id_seq; Type: SEQUENCE SET; Schema: public; Owner: mrc_user
--

SELECT pg_catalog.setval('public."Recipe_Id_seq"', 21, true);


--
-- Name: Ingredients PK_Ingredients; Type: CONSTRAINT; Schema: public; Owner: mrc_user
--

ALTER TABLE ONLY public."Ingredients"
    ADD CONSTRAINT "PK_Ingredients" PRIMARY KEY ("Id");


--
-- Name: Instructions PK_Instructions; Type: CONSTRAINT; Schema: public; Owner: mrc_user
--

ALTER TABLE ONLY public."Instructions"
    ADD CONSTRAINT "PK_Instructions" PRIMARY KEY ("Id");


--
-- Name: Recipe PK_Recipe; Type: CONSTRAINT; Schema: public; Owner: mrc_user
--

ALTER TABLE ONLY public."Recipe"
    ADD CONSTRAINT "PK_Recipe" PRIMARY KEY ("Id");


--
-- Name: IX_Ingredients_RecipeId; Type: INDEX; Schema: public; Owner: mrc_user
--

CREATE INDEX "IX_Ingredients_RecipeId" ON public."Ingredients" USING btree ("RecipeId");


--
-- Name: IX_Instructions_RecipeId; Type: INDEX; Schema: public; Owner: mrc_user
--

CREATE INDEX "IX_Instructions_RecipeId" ON public."Instructions" USING btree ("RecipeId");


--
-- Name: Ingredients FK_Ingredients_Recipe_RecipeId; Type: FK CONSTRAINT; Schema: public; Owner: mrc_user
--

ALTER TABLE ONLY public."Ingredients"
    ADD CONSTRAINT "FK_Ingredients_Recipe_RecipeId" FOREIGN KEY ("RecipeId") REFERENCES public."Recipe"("Id");


--
-- Name: Instructions FK_Instructions_Recipe_RecipeId; Type: FK CONSTRAINT; Schema: public; Owner: mrc_user
--

ALTER TABLE ONLY public."Instructions"
    ADD CONSTRAINT "FK_Instructions_Recipe_RecipeId" FOREIGN KEY ("RecipeId") REFERENCES public."Recipe"("Id") ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict fIpdCUO9IybsxeMv3taAkDwGUCsFcVICj7wEbIlSWfdq6LiuPLhpsTVCke2qPOf

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

\restrict myXdVQYM3NfhtpdOLjGfc7w6fslHiT7bYkK1HwQeJ6nZNzD1Zu1rPijhK2QH86L

-- Dumped from database version 17.7 (Debian 17.7-3.pgdg13+1)
-- Dumped by pg_dump version 17.7 (Debian 17.7-3.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: mrc_user
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO mrc_user;

\unrestrict myXdVQYM3NfhtpdOLjGfc7w6fslHiT7bYkK1HwQeJ6nZNzD1Zu1rPijhK2QH86L
\connect postgres
\restrict myXdVQYM3NfhtpdOLjGfc7w6fslHiT7bYkK1HwQeJ6nZNzD1Zu1rPijhK2QH86L

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: mrc_user
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

\unrestrict myXdVQYM3NfhtpdOLjGfc7w6fslHiT7bYkK1HwQeJ6nZNzD1Zu1rPijhK2QH86L

--
-- PostgreSQL database cluster dump complete
--

