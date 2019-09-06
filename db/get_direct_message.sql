select pdch.*, pu.nickname, pu.email, pu.profile_img from peep_direct_chat_history pdch
join peep_users pu on pu.user_id = pdch.user_id
where message_id = $1;