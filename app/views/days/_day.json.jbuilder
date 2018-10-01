# json.extract! day, :id, :date, :is_closed, :comment, :created_at, :updated_at

# json.day do
  json.id @day.id
  json.date @day.date.strftime('%d.%m.%Y')
  json.is_closed @day.is_closed
  json.comment @day.comment
  json.created_at @day.created_at
  json.updated_at @day.updated_at

# end
