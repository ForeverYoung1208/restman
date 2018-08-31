class CreateRolesUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :roles_users, id: false do |t|
      t.references :role, index: true
      t.references :user, index: true
      t.datetime :deleted_at

      t.timestamps
    end
  end
end
