class Account < ApplicationRecord
  belongs_to :company
  belongs_to :bank
  belongs_to :currency
  belongs_to :acc_type

  default_scope {where('accounts.deleted_at IS NULL')}

  has_many :movements

	validates :number, :bank, :currency, :company, :acc_type, :saldo_begin_year, presence: true

  # validates :is_default, uniqueness: { scope: :company_id, message: "should one default account per company" }, if: :is_default


  validate :can_user_full_edit

  def can_user_full_edit
    if !User.current_user.can_full_edit_account? &&(
        (self.bank_id != self.bank_id_was)||
        (self.currency_id != self.currency_id_was)||
        (self.company_id != self.company_id_was)||
        (self.saldo_begin_year != self.saldo_begin_year_was)
      )
      errors.add(:account_id, 'Немає прав на налаштування рахунків')
    end    
  end

	def saldo_on_date(date = nil)
    begin_of_year = date ? date[0..3]+'-01-01' : DateTime.now.year.to_s+'-01-01'
    date ||= DateTime.now.strftime("%Y-%m-%d")
		# begin_of_year = DateTime.now.year.to_s+'-01-01'


		income_movs = Movement.where("direction = ?", 0).where("account_id = ?", id )
			.joins(:day).where("days.date >= ? and days.date < ?", begin_of_year, date)
    outcome_movs = Movement.where("direction = ?", 1).where("account_id = ?", id )
      .joins(:day).where("days.date >= ? and days.date < ?", begin_of_year, date)
    res = saldo_begin_year + income_movs.sum(:value) - outcome_movs.sum(:value)

	end



	#  user access restriction


  def self.permitted_for_user(user)
    if user.roles.active.pluck(:id).include?(::ADMIN_ROLE_ID)
      all
    else
      Account.joins(:company).where('companies.key_role': user.roles_names)
    end
  end	  	


end
