class CreateDays < ActiveRecord::Migration[5.2]
  def change
    create_table :days do |t|
      t.date :date
      t.boolean :is_closed
      t.text :comment

      t.timestamps
    end
  end
end
