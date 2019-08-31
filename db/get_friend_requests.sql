select pfr.*, pu.user_id, pu.email, pu.nickname, pu.profile_img, pu.bio from peep_friend_request pfr
join peep_users pu on pfr.sent_user_id = pu.user_id
where pfr.received_user_id = $1;