insert into peep_group_chat_history (user_id, group_id, message, gif_url, img_url, video_url)
values ($1, $2, $3, $4, $5, $6)
returning *;