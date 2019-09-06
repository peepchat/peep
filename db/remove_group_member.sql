delete from peep_group_members
where user_id = $1 and group_id = $2;