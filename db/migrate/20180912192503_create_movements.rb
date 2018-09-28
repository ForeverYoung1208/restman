class CreateMovements < ActiveRecord::Migration[5.2]
  def change
    create_table :movements do |t|
      t.decimal :value, precision: 11, scale: 2
      t.integer :direction
      t.text :comment
      t.text :log
      
      t.references :group, foreign_key: {to_table: :movement_groups}
      t.references :account, foreign_key: true
      t.references :day, foreign_key: true
      t.references :last_editor

      t.timestamps
    end
  end
end
