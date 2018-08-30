module ApplicationHelper
  def yn(bool_var)
    bool_var ? "Так" : "Ні"
  end

  def fa_link_to(icon, *args, &block)

  	link_to(*args) do
  		concat content_tag("span", nil, class: "fa fa#{icon}")
  		concat ' '
  		concat capture &block
  	end
  end

  def mainmenu_li( p, *args, &block)
    p[:synonyms]||=[]
  	args[0][:class] += " active" if ( p[:current].match( p[:menuitem] ) or p[:synonyms].include?( p[:current] ) )
		content_tag("li", *args) do
			capture &block
  	end
  end

  def mainmenu_item( p, *args, &block)
  	mainmenu_li(p, class: "nav-item") do
  		link_to( p[:menuitem], class: "nav-link #{'disabled' if !p[:active]}" ) do
  			capture &block
  		end
  	end
  end


  def mainmenu_dropdown( p, &block)
    paths = []
    p[:menuitems].each { |name, path| paths<<path[0] }

    args = {class: "nav-item dropdown"}
    args[:class] += " active" if paths.include?( p[:current] )

    content_tag("li", args) do
      content_tag("a", {
        class: "nav-link dropdown-toggle",
        href: "",
        id: "navbarDropdownMenuLink1",
        'data-toggle': "dropdown",
        'aria-haspopup': "true",
        'aria-expanded': "false"
      }) { capture &block } +
      content_tag("div", { class: "dropdown-menu", 'aria-labelledby': "navbarDropdownMenuLink1" }) do 
        p[:menuitems].collect do |name, path|
          if path[1] == true #active
            concat( link_to( path[0], class: "dropdown-item" ){ name } )
          else #not active
            concat( tag.span( class: "dropdown-item disabled" ){ name } )
          end

            
        end
      end

    end

  end

  def list_change_buttons(all_fn, mine_fn, is_all_checked)

    content_tag("input", {
      type: "radio",
      name: "listType",
      id: "radio-contracts-all",
      onchange: all_fn,
      checked: is_all_checked
    }) {' всі що мені доступні'} +
    tag.br + 
    content_tag("input", {
      type: "radio",
      name: "listType",
      id: "radio-contracts-mine" ,
      onchange: mine_fn,
      checked: !is_all_checked
    }) {' тільки мої'}
    
  end


  def management_details( entity )
    fa_link_to('-id-card fa-2x', entity, data: { toggle: "tooltip", placement: "bottom" }, title: "Деталі", class: "management-button") {''}
  end

  def management_edit( entity )
    fa_link_to('-edit fa-2x', polymorphic_path(entity, {action: :edit}), data: { toggle: "tooltip", placement: "bottom" }, title: "Редагувати", class: "management-button" ) {''}
  end

  def management_delete( entity )
    fa_link_to('-remove fa-2x', entity , method: :delete, data: { confirm: 'Видалити запис?', toggle: "tooltip", placement: "bottom" }, title: "Видалити", class: "management-button" ) {''}
  end

  # data-toggle="tooltip" data-placement="bottom" title="Tooltip on bottom"

  def management_links( entity )
    management_details(entity) + 
    management_edit(entity) + 
    management_delete(entity)
  end


  def take_button( entity, text )
    if @current_user.can_take_documents?
      tag.button(
        onclick: "takeUntakeDocument('#{ entity.class }', #{ entity.id })", 
        class: "take-button #{'hidden' if entity.is_taken_as_original}"
      ){ "#{text}"} 
    end
  end

  def untake_button( entity, text )
    if @current_user.can_take_documents?
      tag.button(
        onclick: "if(confirm('Відмінити прийняття? (Відміна буде застосована  і збережена одразу)')){ takeUntakeDocument('#{ entity.class }', #{ entity.id }) }",
         class: "untake-button #{'hidden' if !entity.is_taken_as_original}"
      ){ "#{text}"} 
    end
  end

end
