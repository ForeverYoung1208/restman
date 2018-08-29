class CreateAccTypes < ActiveRecord::Migration[5.2]
  def change
    create_table :acc_types do |t|
      t.string :name_eng
      t.string :name_ukr

      t.timestamps
      t.datetime :deleted_at
    end
  end
end
