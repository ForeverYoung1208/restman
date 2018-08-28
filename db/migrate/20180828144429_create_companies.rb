class CreateCompanies < ActiveRecord::Migration[5.2]
  def change
    create_table :companies do |t|
      t.string :code_name
      t.references :group, foreign_key: true

      t.timestamps
      t.datetime :deleted_at      
    end
  end
end
