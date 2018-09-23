class AddKeyRoleToCompany < ActiveRecord::Migration[5.2]
  def change
    add_column :companies, :key_role, :string
  end
end
