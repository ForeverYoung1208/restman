class AddDeletedAtToSomeTables < ActiveRecord::Migration[5.2]
  def change
    add_column :movement_groups, :deleted_at, :datetime  	
    add_column :days, :deleted_at, :datetime  	

  end
end
