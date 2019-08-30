INSERT INTO peep_users (email, nickname, password)
VALUES ($1, $2, $3)
RETURNING *;