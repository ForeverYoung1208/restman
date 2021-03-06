class Movement < ApplicationRecord
	belongs_to :movement_group,  class_name: :MovementGroup, foreign_key: :group_id
	belongs_to :account
	belongs_to :last_editor, class_name: :User, foreign_key: :last_editor_id
  belongs_to :signed_by, class_name: :User, optional: true
	belongs_to :day

  default_scope { where('movements.deleted_at IS NULL') }

	enum direction: {Income: 0, Outcome: 1, Technical: 2}

  def account_with_deleted
    Account.unscoped.where('id = ?', account_id).first
  end

  def self.permitted_for_user(user)

    if user.roles.active.pluck(:id).include?(::ADMIN_ROLE_ID)
      all
    else
      account_ids = Account.joins(:company).where('companies.key_role': user.roles_names).pluck(:'accounts.id')
      where(account_id: account_ids)
    end
  end	

	

end
