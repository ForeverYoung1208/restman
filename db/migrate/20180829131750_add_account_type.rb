class AddAccountType < ActiveRecord::Migration[5.2]
  def change
    change_table :accounts do |t|
	    t.references :acc_type, foreign_key: true
	    t.date :term
	  end
  end
end
