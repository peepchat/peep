select pgr.*, pg.*, pu.nickname, pu.email, pu.profile_img
from peep_group_request pgr
join peep_groups pg on pg.group_id = pgr.group_id
join peep_users pu on pgr.user_id = pu.user_id
where pgr.group_id in (
select pgm.group_id
from peep_group_members pgm
where pgm.user_id = $1 and pgm.permission = true
)


