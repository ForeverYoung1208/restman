class AddKeyRoleToGroup < ActiveRecord::Migration[5.2]
  def change
    add_column :groups, :key_role, :string
  end
end
