select * from peep_group_request pgr
join peep_groups pg on pg.group_id = pgr.group_id
where pgr.user_id = $1;