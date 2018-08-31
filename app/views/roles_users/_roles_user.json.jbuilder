json.extract! roles_user, :id, :role_id, :user_id, :deleted_at, :created_at, :updated_at
json.url roles_user_url(roles_user, format: :json)
