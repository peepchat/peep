select pg.*, pgm.user_id as admin_id, pgm.group_id, pgm.permission, pgr.*
from peep_group_request pgr 
join peep_groups pg on pg.group_id = pgr.group_id
join peep_group_members pgm on pgm.group_id = pgr.group_id
where pgm.user_id = $1 and pgm.permission = true;