# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
require 'date'

# IMPORTANT! frontend rely on role.id
roles = [
	Role.where(id: 1).first_or_create(
		name: 'admin'
	),
	Role.where(id: 2).first_or_create(
		name: 'user'
	),
	Role.create(
		name: 'can_close_day'
	),

]

# IMPORTANT! first admin names will be binded to 'admin' and 'siafin2010@gmail.com'
admin_users_ids = User.where("name = 'admin' or name = 'siafin2010@gmail.com'").pluck(:id)
roles[0].bind_to_users!(admin_users_ids)

# IMPORTANT! frontend rely on acc_type.id
acc_types = [
	AccType.where(id: -1).first_or_create(name_eng: 'closed', name_ukr: 'закритий/не використовується'),
	AccType.where(id: 1).first_or_create(
		name_eng: 'current',
		name_ukr: 'поточний/розрахунковий'
	),
	AccType.where(id: 2).first_or_create(
		name_eng: 'deposit',
		name_ukr: 'депозитний'
	)
]



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

group = Group.where(id: 1).first_or_create(
	code_name_ukr: 'К-Р',
	code_name_eng: 'K-R',
	key_role: 'admin'
)

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

# company = Company.where(code_name: 'test').first_or_create(
# 	code_name:'test',
# 	group: group,
# 	key_role: 'admin'	
# )


# day = Day.where(id: 1).first_or_create(
# 	date: '11.09.2018'.to_date,
# 	is_closed: false,
# 	comment: 'fist test date'
# )


# accounts = [Account.where(number: '26000001').first_or_create(
# 		number: '26000001',
# 		bank: banks[0],
# 		currency: currencies[0],
# 		saldo_begin_year: 0,
# 		company: company,
# 		acc_type: acc_types[0],
# 		term: '31.12.2018'
# 	),
# 	Account.where(number: '260500002').first_or_create(
# 		number: '260500002',
# 		bank: banks[0],
# 		currency: currencies[0],
# 		saldo_begin_year: 0,
# 		company: company,
# 		acc_type: acc_types[1],
# 		term: '31.12.2018'
# 	)
# ]

movement_groups = [
	MovementGroup.where( id: 1).first_or_create(
		direction: :Income,
		name: "Депозитарные доходы",
		description: "Депозитарные доходы(абонплаты, собрания)"
	),
	MovementGroup.where( id: 2).first_or_create(
		direction: :Income,
		name: "Прочие доходы",
		description: "Прочие доходы(проценты банка)"
	),
	MovementGroup.where( id: 3).first_or_create(
		direction: :Outcome,
		name: "РКО",
		description: "РКО за обслуживание счета, клиент-банк"
	),
	MovementGroup.where( id: 4).first_or_create(
		direction: :Outcome,
		name: "Содержание компании",
		description: "Содержание компании( Ремонт и обслуживание авто, бензин, нотариус и т.п. )"
	)
]

# movements = [
# 	Movement.where( id: 1).first_or_create(
# 		value: 1010.23,
# 		direction: :Income,
# 		comment: "Some comment1",
# 		log: "log here",
# 		movement_group: movement_groups[0],
# 		account: accounts[0],
# 		day: day,
# 		last_editor: User.where(name: "admin").first,
# 		created_at: DateTime.now,
# 		updated_at: DateTime.now,
# 		deleted_at: nil
# 	),
# 	Movement.where( id: 2).first_or_create(
# 		value: 2010.23,
# 		direction: :Income,
# 		comment: "Some comment2",
# 		log: "log here",
# 		movement_group: movement_groups[0],
# 		account: accounts[1],
# 		day: day,
# 		last_editor: User.where(name: "admin").first,
# 		created_at: DateTime.now,
# 		updated_at: DateTime.now,
# 		deleted_at: nil
# 	),
# 	Movement.where( id: 3).first_or_create(
# 		value: 3010.23,
# 		direction: :Outcome,
# 		comment: "Some comment3",
# 		log: "log here",
# 		movement_group: movement_groups[3],
# 		account: accounts[0],
# 		day: day,
# 		last_editor: User.where(name: "admin").first,
# 		created_at: DateTime.now,
# 		updated_at: DateTime.now,
# 		deleted_at: nil
# 	),
# 	Movement.where( id: 4).first_or_create(
# 		value: 4010.23,
# 		direction: :Outcome,
# 		comment: "Some comment4",
# 		log: "log here",
# 		movement_group: movement_groups[3],
# 		account: accounts[1],
# 		day: day,
# 		last_editor: User.where(name: "admin").first,
# 		created_at: DateTime.now,
# 		updated_at: DateTime.now,
# 		deleted_at: nil
# 	)
# ]
