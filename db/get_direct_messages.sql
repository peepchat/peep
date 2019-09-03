select * from peep_direct_chat_history
where chat_id = $1
order by date desc;