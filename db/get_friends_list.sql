select pu.user_id, pu.email, pu.nickname, pu.profile_img, pu.bio, pf.chat_id from peep_friends pf
join peep_users pu on pf.friend_id = pu.user_id
where pf.user_id = $1;