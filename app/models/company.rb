class Company < ApplicationRecord
  belongs_to :group
  has_many :accounts

	# moved to ApplicationRecord
  # scope :permitted_for_user, ->(user){ where(key_role: user.roles_names)}


end
