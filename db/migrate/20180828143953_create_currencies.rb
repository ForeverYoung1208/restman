class CreateCurrencies < ActiveRecord::Migration[5.2]
  def change
    create_table :currencies do |t|
      t.string :code
      t.string :name_ukr
      t.string :name_eng
      t.string :name_int

      t.timestamps
      t.datetime :deleted_at
    end
  end
end
