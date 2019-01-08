class Account < ApplicationRecord
  belongs_to :company
  belongs_to :bank
  belongs_to :currency
  belongs_to :acc_type

  has_many :movements

	validates :number, :bank, :currency, :company, :acc_type, presence: true

	#TODO: stuck here (((( can't implement easy one-query saldo cunting due to income and outcome calculations

	def self.all_with_saldo_on(date = DateTime.now.strftime("%Y-%m-%d"))
		begin_of_year = DateTime.now.year.to_s+'-01-01'

		income_movs = Movement.where("direction = ?", 0)
			.joins(:day).where("days.date > ? and days.date < ?", begin_of_year, date)
    outcom_movs = Movement.where("direction = ?", 1)
      .joins(:day).where("days.date > ? and days.date < ?", begin_of_year, date)
    res = income_movs.sum(:value) - outcom_movs.sum(:value)



		# joins(:movements).where("movements.id < ?", 3)
	end



	# TODO: implement this

  # def self.permitted_for_user(user)
  #   if user.roles.active.pluck(:id).include?(::ADMIN_ROLE_ID)
  #     all
  #   else
  #     ??????? where(key_role: user.roles_names) ????
  #   end
  # end	  	


end
