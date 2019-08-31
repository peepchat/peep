delete from peep_friends
where (user_id = $1 and friend_id = $2) or (user_id = $2 and friend_id = $1);