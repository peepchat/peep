update peep_group_chat_history
set message = $2
where message_id = $1;