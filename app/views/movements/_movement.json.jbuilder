# json.extract! movement, :id, :value, :direction, :group_id, :comment, :account_id, :last_editor_id, :day_id, :deleted_at, :log, :created_at, :updated_at

json.id movement.id 
json.value movement.value
json.direction movement.direction
json.group_id movement.group_id
json.comment movement.comment
json.account_id movement.account_id
json.company_id movement.account.company_id
json.last_editor_id movement.last_editor_id
json.day_id movement.day_id
json.deleted_at movement.deleted_at
json.log movement.log
json.created_at movement.created_at
json.updated_at movement.updated_at
