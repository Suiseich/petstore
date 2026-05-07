create table pets (
    id varchar(64) primary key,
    name varchar(160) not null,
    category varchar(32) not null,
    price numeric(10, 2) not null check (price >= 0),
    availability varchar(32) not null,
    summary varchar(500),
    description varchar(2000),
    care_notes varchar(2000),
    primary_media_url varchar(500),
    created_at timestamp with time zone not null default current_timestamp,
    updated_at timestamp with time zone not null default current_timestamp
);

create index idx_pets_availability_created on pets (availability, created_at, id);
create index idx_pets_category_availability_created on pets (category, availability, created_at, id);
