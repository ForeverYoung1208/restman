class Account < ApplicationRecord
  belongs_to :company
  belongs_to :bank
  belongs_to :currency
end
