-- Esquema inicial: recuerdos, fotos e hitos

create extension if not exists "uuid-ossp";

create table if not exists memories (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  description text,
  date date not null,
  location_name text not null,
  lat double precision not null,
  lng double precision not null,
  created_at timestamptz not null default now()
);

create table if not exists memory_photos (
  id uuid primary key default uuid_generate_v4(),
  memory_id uuid not null references memories(id) on delete cascade,
  url text not null,
  position int not null default 0
);

create table if not exists milestones (
  id uuid primary key default uuid_generate_v4(),
  title text not null,
  date date not null,
  icon text
);

create index if not exists memory_photos_memory_id_idx on memory_photos(memory_id);
create index if not exists memories_date_idx on memories(date);

-- Bucket de Storage para las fotos (público para poder mostrarlas directamente)
insert into storage.buckets (id, name, public)
values ('memory-photos', 'memory-photos', true)
on conflict (id) do nothing;

alter table memories enable row level security;
alter table memory_photos enable row level security;
alter table milestones enable row level security;

-- App de uso privado entre dos personas: se permite lectura/escritura pública
-- protegida solo por no compartir la URL/clave del proyecto. Si más adelante
-- añades login, sustituye "using (true)" por comprobaciones de auth.uid().
create policy "public read memories" on memories for select using (true);
create policy "public write memories" on memories for insert with check (true);
create policy "public update memories" on memories for update using (true);
create policy "public delete memories" on memories for delete using (true);

create policy "public read photos" on memory_photos for select using (true);
create policy "public write photos" on memory_photos for insert with check (true);
create policy "public delete photos" on memory_photos for delete using (true);

create policy "public read milestones" on milestones for select using (true);
create policy "public write milestones" on milestones for insert with check (true);
create policy "public update milestones" on milestones for update using (true);
create policy "public delete milestones" on milestones for delete using (true);

-- Política de Storage: lectura pública, escritura abierta al bucket
create policy "public read memory-photos" on storage.objects
  for select using (bucket_id = 'memory-photos');

create policy "public upload memory-photos" on storage.objects
  for insert with check (bucket_id = 'memory-photos');

create policy "public delete memory-photos" on storage.objects
  for delete using (bucket_id = 'memory-photos');
