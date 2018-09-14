class MovementGroup < ApplicationRecord
	has_many :movenents
  enum direction: {'0': :Income, '1': :Outcome}

end
