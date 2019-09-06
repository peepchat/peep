select * from peep_group_members pgm
join peep_groups pg on pg.group_id = pgm.group_id
where pgm.user_id = $1;