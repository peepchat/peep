insert into peep_groups (group_name, group_img)
values ($1, $2)
returning *;