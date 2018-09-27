class Movement < ApplicationRecord
	belongs_to :movement_group,  class_name: :MovementGroup, foreign_key: :group_id
	belongs_to :account
	belongs_to :last_editor, class_name: :User, foreign_key: :last_editor_id
	belongs_to :day

	enum direction: {Income: 0, Outcome: 1}

  def self.permitted_for_user(user)
    if user.role_ids.include?(::ADMIN_ROLE_ID)
      all
    else
      account_ids = Account.joins(:company).where('companies.key_role': user.roles_names).pluck(:'accounts.id')
      where(account_id: account_ids)
    end
  end	

	

end
