json.array! @new_messages do |message|
  json.content messag.content
  json.image message.image
  json.created_at message.created_at
  json.user_name message.user.user_name
  json.id message.id
end
