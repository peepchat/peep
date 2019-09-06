select pu.user_id, pu.email, pu.nickname, pu.profile_img, pu.bio, pu.online, pmg.* from peep_group_members pmg
join peep_users pu on pmg.user_id = pu.user_id
where pmg.group_id = $1;