select * from peep_friend_request
where sent_user_id = $1 and received_user_id = $2;