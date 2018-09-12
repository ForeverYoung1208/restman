class Movement < ApplicationRecord
  belongs_to :movement_group
  belongs_to :account
  belongs_to :last_editor, class_name: :User, foreign_key: :last_editor_id
  belongs_to :day

  

end
