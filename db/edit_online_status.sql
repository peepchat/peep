update peep_users
set online = $2
where user_id = $1;