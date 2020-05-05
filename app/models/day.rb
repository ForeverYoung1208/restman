class Day < ApplicationRecord
	has_many :movements
	validates :date, presence: true, uniqueness: true

  after_initialize :set_defaults

  def set_defaults
  	if self.new_record? 

	    self.is_closed = false
	  end
  end

  # def movements_list
  # 	movements.pluck(:value).join(', ')
  # end

  def movements_list_detailed(current_user)
    res={}
    movements.permitted_for_user(current_user).each do |m|
      if m.direction != 'Technical'
        if m.account
          res[m.id] = "#{m.account.company.code_name} #{m.direction == 'Outcome' ? '-' : '+'}#{m.value.to_s} #{m.account.extended_info} [#{m.movement_group.name}] (#{m.comment})"
        end
      end
    end
    res
  end


end
