json.extract! bank, :id, :code, :name, :created_at, :updated_at
json.url bank_url(bank, format: :json)

json.id bank.id
json.code bank.code
json.name bank.name