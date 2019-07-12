json.id @user.id
json.name @user.name
json.roles do 
	json.array! @user.roles.active.pluck(:name)
end