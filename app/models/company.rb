class Company < ApplicationRecord
  belongs_to :group

  def self.permitted_for_user( user)
  	a = user_roles_names = user.roles.all.pluck(:name)
  	debugger
  end

end
