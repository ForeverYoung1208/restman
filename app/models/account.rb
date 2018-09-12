class Account < ApplicationRecord
  belongs_to :company
  belongs_to :bank
  belongs_to :currency
  belongs_to :acc_type

  has_many :movements

	validates :number, :bank, :currency, :company, :acc_type, presence: true

end
