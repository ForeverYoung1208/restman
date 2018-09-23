# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/
$(document).ready ->
	if $('meta[name=psj]').attr('controller')=='groups' && ["new", "edit"].indexOf($('meta[name=psj]').attr('action')) >= 0
		$('#group_code_name_eng').on('blur', 
		(e)->
			$('#group_key_role').val('access_to_'+e.target.value+'_group')
		);