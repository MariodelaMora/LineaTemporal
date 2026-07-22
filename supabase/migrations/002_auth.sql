-- Cierra el acceso: solo usuarios autenticados pueden leer/escribir.
-- Sustituye las políticas abiertas (using true) de 001 por auth.role() = 'authenticated'.

alter policy "public read memories"   on memories using (auth.role() = 'authenticated');
alter policy "public write memories"  on memories with check (auth.role() = 'authenticated');
alter policy "public update memories" on memories using (auth.role() = 'authenticated');
alter policy "public delete memories" on memories using (auth.role() = 'authenticated');

alter policy "public read photos"   on memory_photos using (auth.role() = 'authenticated');
alter policy "public write photos"  on memory_photos with check (auth.role() = 'authenticated');
alter policy "public delete photos" on memory_photos using (auth.role() = 'authenticated');

alter policy "public read milestones"   on milestones using (auth.role() = 'authenticated');
alter policy "public write milestones"  on milestones with check (auth.role() = 'authenticated');
alter policy "public update milestones" on milestones using (auth.role() = 'authenticated');
alter policy "public delete milestones" on milestones using (auth.role() = 'authenticated');

-- Subir/borrar fotos solo autenticados. La lectura se mantiene por URL pública:
-- ponytail: bucket público con rutas UUID imposibles de adivinar. Si algún día
-- quieres blindar también los blobs, pasar bucket a privado + createSignedUrl.
alter policy "public upload memory-photos" on storage.objects with check (bucket_id = 'memory-photos' and auth.role() = 'authenticated');
alter policy "public delete memory-photos" on storage.objects using (bucket_id = 'memory-photos' and auth.role() = 'authenticated');
