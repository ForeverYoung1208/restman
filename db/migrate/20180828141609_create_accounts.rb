class CreateAccounts < ActiveRecord::Migration[5.2]
  def change
    create_table :accounts do |t|
      t.string :number
      t.references :bank
      t.references :currency
      t.decimal :saldo_begin_year, precision: 17, scale: 2
      t.references :company
      t.timestamps
    end
  end
end
