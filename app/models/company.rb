class Company < ApplicationRecord
  belongs_to :group
  has_many :accounts

	# moved to ApplicationRecord
  # scope :permitted_for_user, ->(user){ where(key_role: user.roles_names)}

  def self.permitted_for_user(user)
    
    if user.roles.active.pluck(:id).include?(::ADMIN_ROLE_ID)
      all
    else
      where(key_role: user.roles_names)
    end
  end	  


end
