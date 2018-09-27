class AddDeletedAtToMovements < ActiveRecord::Migration[5.2]
  def change
    add_column :movements, :deleted_at, :datetime
  end
end
