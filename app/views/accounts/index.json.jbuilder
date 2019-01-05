json.array! @accounts, partial: 'accounts/account', as: :account
# json.array! @accounts do |account|
# 	json.id account.id
# 	json.number("#{account.currency.name_int} - #{account.number}")
# 	json.bank account.bank
# 	json.currency account.currency
# 	json.saldo_begin_year account.saldo_begin_year
# 	json.company_id account.company_id
# 	json.created_at account.created_at
# 	json.updated_at account.updated_at
# end
