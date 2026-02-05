create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text not null,
  email text,
  created_at timestamp with time zone default now()
);

create table if not exists registries (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  template_type text not null,
  chain text not null,
  contract_address text,
  created_at timestamp with time zone default now()
);

alter table profiles enable row level security;
alter table registries enable row level security;

create policy "Profiles are viewable by owner" on profiles
for select using (auth.uid() = id);

create policy "Profiles are insertable by owner" on profiles
for insert with check (auth.uid() = id);

create policy "Registries are viewable by owner" on registries
for select using (auth.uid() = owner_id);

create policy "Registries are insertable by owner" on registries
for insert with check (auth.uid() = owner_id);
