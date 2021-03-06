# json.extract! account, :id, :number, :bank, :currency, :saldo_begin_year, :company_id, :created_at, :updated_at
json.id account.id
json.number("#{account.currency.name_int} #{account.number} (#{account.bank.name} #{account.bank.code})")
json.bank account.bank
json.currency account.currency
json.saldo_begin_year account.saldo_begin_year
json.saldo_on_date account.saldo_on_date(@date_of_saldo)
json.company_id account.company_id
json.is_default account.is_default
json.created_at account.created_at
json.updated_at account.updated_at
json.acc_type_id account.acc_type_id
json.term account.term.try(:strftime, "%Y-%m-%d")
json.interest account.interest