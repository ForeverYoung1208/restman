class Day < ApplicationRecord
	has_many :movements
	validates :date, presence: true, uniqueness: true

  after_initialize :set_defaults

  def set_defaults
  	if self.new_record? 

	    self.is_closed = false
	  end
  end

  def movements_list
  	movements.pluck(:value).join(', ')
  end

end
