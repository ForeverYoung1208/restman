class CreateGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :groups do |t|
      t.string :code_name_ukr
      t.string :code_name_eng

      t.timestamps
      t.datetime :deleted_at      
    end
  end
end
