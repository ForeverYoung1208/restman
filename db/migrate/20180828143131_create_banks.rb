class CreateBanks < ActiveRecord::Migration[5.2]
  def change
    create_table :banks do |t|
      t.string :code
      t.string :name

      t.timestamps
      t.datetime :deleted_at
    end
  end
end
