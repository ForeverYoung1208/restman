class Account < ApplicationRecord
  belongs_to :company
  belongs_to :bank
  belongs_to :currency
  belongs_to :acc_type

end
