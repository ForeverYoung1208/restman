class ApplicationRecord < ActiveRecord::Base
  self.abstract_class = true

	# scope :permitted_for_user, ->(user){ where(key_role: user.roles_names)}
	# rewrited to use condition, for admin user:

  # def self.permitted_for_user(user)
  #   if user.role_ids.include?(::ADMIN_ROLE_ID)
  #     all
  #   else
  #     where(key_role: user.roles_names)
  #   end
  # end	
  def lt_destroy
    self.deleted_at = DateTime.now
    self.save
  end

end
