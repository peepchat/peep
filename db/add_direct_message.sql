insert into peep_direct_chat_history (user_id, chat_id, message, gif_url, img_url, video_url)
values ($1, $2, $3, $4, $5, $6)
returning *;