select * from peep_friend_request pfr
join peep_users pu on pfr.received_user_id = pu.user_id
where sent_user_id = $1;