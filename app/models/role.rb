class Role < ApplicationRecord
	has_and_belongs_to_many :users

	scope :active, ->{ where("roles_users.deleted_at IS NULL")}

	before_validation :define_deleted_at
	# default_scope ->{ where("deleted_at IS NULL")}

	attr_accessor :is_deleted

	def bind_to_users!(users_ids)
		users_ids.each do |user_id|
			unless RolesUser.where(role_id: id, user_id: user_id).any?
				RolesUser.create!(role_id: id, user_id: user_id)
			end			
		end
	end	

	def define_deleted_at
		if self.is_deleted =="0" || self.is_deleted == nil || self.is_deleted == false
			self.deleted_at = nil 
		elsif !self.deleted_at 
			self.deleted_at = DateTime.now
		end

	end
end
