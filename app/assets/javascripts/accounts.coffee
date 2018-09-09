# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$(document).ready ->
	if $('meta[name=psj]').attr('controller')=='accounts' && ["new", "edit"].indexOf($('meta[name=psj]').attr('action')) >= 0
		$('.datepicker').datepicker({
			format: "dd.mm.yyyy",
			todayBtn: "linked",
			clearBtn: true,
			autoclose: true,
			todayHighlight: true,		
			language: "ua",
			orientation: "bottom right"
		});