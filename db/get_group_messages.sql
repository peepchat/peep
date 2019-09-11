select pgch.*, pu.nickname, pu.email, pu.profile_img from peep_group_chat_history pgch
join peep_users pu on pu.user_id = pgch.user_id
where group_id = $1
order by date asc;