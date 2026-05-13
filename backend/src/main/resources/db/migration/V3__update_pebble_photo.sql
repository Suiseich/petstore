update pets
set primary_media_url = 'https://commons.wikimedia.org/wiki/Special:FilePath/Leopard_Gecko_(141593356).jpg?width=900',
    updated_at = current_timestamp
where id = 'reptile-001';
