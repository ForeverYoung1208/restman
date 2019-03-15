class AddSignedByToMovements < ActiveRecord::Migration[5.2]
  def change
  	change_table :movements do |t|
  		t.references :signed_by
  	end
  end
end
