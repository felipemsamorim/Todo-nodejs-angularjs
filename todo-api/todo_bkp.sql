PGDMP     2                    y            todo    13.2    13.2 	    ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16394    todo    DATABASE     d   CREATE DATABASE todo WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE todo;
                postgres    false            ?            1259    16398 	   TodoItems    TABLE       CREATE TABLE public."TodoItems" (
    "Id" bigint NOT NULL,
    "Descricao" character varying NOT NULL,
    "Status" integer NOT NULL,
    "NomeResp" character varying NOT NULL,
    "Email" character varying NOT NULL,
    "RetornoCount" integer NOT NULL
);
    DROP TABLE public."TodoItems";
       public         heap    postgres    false            ?            1259    16419    TodoItems_Id_seq    SEQUENCE     ?   ALTER TABLE public."TodoItems" ALTER COLUMN "Id" ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."TodoItems_Id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    200            ?          0    16398 	   TodoItems 
   TABLE DATA           g   COPY public."TodoItems" ("Id", "Descricao", "Status", "NomeResp", "Email", "RetornoCount") FROM stdin;
    public          postgres    false    200   3	       ?           0    0    TodoItems_Id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public."TodoItems_Id_seq"', 11, true);
          public          postgres    false    201            $           2606    16405    TodoItems TodoItems_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public."TodoItems"
    ADD CONSTRAINT "TodoItems_pkey" PRIMARY KEY ("Id");
 F   ALTER TABLE ONLY public."TodoItems" DROP CONSTRAINT "TodoItems_pkey";
       public            postgres    false    200            ?   ?   x???A?@?u?s?	?????+/????L-???k`c?u?^?_??H???Y???(?O?IҼ'	??_???U8v(??-????}%??????yf/o?8?B????'???L???`L!?*??     