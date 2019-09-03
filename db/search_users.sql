SELECT user_id, email, nickname, profile_img, bio FROM peep_users
WHERE email ILIKE $1;