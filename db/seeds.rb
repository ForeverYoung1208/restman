# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

banks = [
	Bank.where(code: '305299').first_or_create(
		code: '305299',
		name: 'ПАТ КБ Приватбанк'
	),
	Bank.where(code: '305299').first_or_create(
		code: '305482',
		name: 'банк Кредит Дніпро'
	)
]

currencies = [
	Currency.where(code: '980').first_or_create(
		code: '980',
		name_ukr: 'грн.',
		name_eng: 'hryvnya',
		name_int: 'UAH'
	),
	Currency.where(code: '840').first_or_create(
		code: '840',
		name_ukr: 'долл. США',
		name_eng: 'dollar USA',
		name_int: 'USD'
	),
	Currency.where(code: '978').first_or_create(
		code: '978',
		name_ukr: 'євро',
		name_eng: 'euro',
		name_int: 'EUR'
	)
]

company = Company.where(code_name_eng: 'test').first_or_create(
	code_name_ukr:'тест'
	code_name_eng:'test'
)

acc_types = [
	AccType.where(id: 1).first_or_create(
		name_eng: 'current'
		name_ukr: 'поточний/розрахунковий'
	),
	AccType.where(id: 2).first_or_create(
		name_eng: 'deposit'
		name_ukr: 'депозитний'
	)
]


account = Account.where(number: '26000001').first_or_create(
	number: '26000001',
	bank: banks[0],
	currency: currencies[0],
	saldo_begin_year: 0,
	company: company
)