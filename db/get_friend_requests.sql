select * from peep_friend_requests pfr
join peep_users pu on pfr.sent_user_id = pu.user_id
where received_user_id = $1;