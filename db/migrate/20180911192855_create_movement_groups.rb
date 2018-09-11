class CreateMovementGroups < ActiveRecord::Migration[5.2]
  def change
    create_table :movement_groups do |t|
      t.string :direction
      t.string :name
      t.text :description
      t.timestamps
    end
  end
end
