update peep_users
set nickname = $2
where user_id = $1;