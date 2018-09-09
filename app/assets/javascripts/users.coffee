
class Roles
	constructor:()->
		@jqxhr = $.get("roles.json")
			.done (res)=>
				@data = res
	getRoleById: (id)->
		for role in @data
			if role.id == id
				return role

class Users
	@instances=[]
	constructor: (id, allRoles)->
		@data = []
		@element_id = id
		@constructor.instances<<this
		@allRoles = allRoles

	getAndShow: ()->
		jqxhr = $.get("users.json")
			.done (res)=>
				@data = res
				@redrawTo( $(@element_id) ) 
	redrawTo: (el)=>
		inTag1 = el.attr('inTag1')
		inTag2 = el.attr('inTag2')
		res = ''
		for user in @data 
			do (user)=>
				res +='<'+inTag1+'>' + 
					'<'+inTag2+'>' + user.id + '</'+inTag2+'>' + 
					'<'+inTag2+'>' + user.name + '</'+inTag2+'>' + 
					'<'+inTag2+'>' + user.email + '</'+inTag2+'>' + 
					'<'+inTag2+' class = "userRoles rounded droppable" data-uid="'+user.id+'"> Querying roles.... </'+inTag2+'>' + 
					'</'+inTag1 + '>'
		el.html( res )
		@drawRolesforUsers(@data)
		@setActions(el)
	setActions: (el)=>
		self = this
		el.find(".droppable").droppable({
			drop: (event, ui)->
				uid = parseInt( $(this).attr('data-uid') )
				rid = parseInt( ui.draggable.attr('data-rid') )
				user = self.getById( uid )
				user.roles.push( rid ) if not (rid in user.roles)
				self.drawRolesforUsers([user])
		})
	drawRolesforUsers: (users)=>
		res = ''
		self = this
		for user in users
			res = ''
			if user.roles
				for role_id in user.roles 
					res += '<span class="badge badge-pill badge-info" data-rid="'+
						role_id+
						'" data-uid="'+
						user.id+'" >'+
						role_id+' ' +
						@allRoles.getRoleById(role_id).name 

					res += ' <i class="fa fa-2x fa-trash deletable"></i>'
					res += '</span>'					
			$(@element_id).find("[data-uid='" + user.id + "']").html( res )
			$('.draggable').draggable(
				helper: 'clone'
			)
			$(".deletable").on('click', (e)->
				uid = parseInt( $(this).parent().attr('data-uid') )
				rid = parseInt( $(this).parent().attr('data-rid') )
				self.deleteRoleFromUser(rid, uid)
				self.drawRolesforUsers( [self.getById(uid)])
			)
	deleteRoleFromUser: (role_id, user_id) =>
		user = @getById(user_id)
		i = user.roles.indexOf(role_id)
		user.roles.splice(i,1) if i >= 0
	getById: (user_id)=>
		for user in @data
			if user.id == user_id
				return user
	deleteRoleFromAll:(rid)=>
		for user in @data
			i = user.roles.indexOf(rid)
			user.roles.splice(i,1) if i >= 0
		@drawRolesforUsers(@data)
	addRoleToAll:(rid) =>
		for user in @data
			user.roles.push(rid) if not (rid in user.roles)
		@drawRolesforUsers(@data)
	save:()=>
		$.ajax({
			type : "POST",
			url : "users.json",
			dataType: 'json',
			contentType: 'application/json',
			data : JSON.stringify(@data),
			complete: ( response, status)->
				if status =='success'
					$("#dialog-saved").dialog( "open" )

		});





$(document).ready ->
	if $('meta[name=psj]').attr('controller')=='users' && $('meta[name=psj]').attr('action')=='index'

		allRoles = new Roles()
		allRoles.jqxhr.then ()->
			window.allUsers = new Users('#ajaxUsers', allRoles);
			allUsers.getAndShow();


		window.cancelDialog = ()->
			$("#dialog-confirm-cancel").dialog( "open" )

		$('.draggable').draggable(
			helper: 'clone'
		)
		$('.deleteArea.droppable').droppable(
			drop: (event, ui) ->
				rid = parseInt( ui.draggable.attr('data-rid') )
				allUsers.deleteRoleFromAll( rid )
		)
		$('.addArea.droppable').droppable(
			drop: (event, ui) ->
				rid = parseInt( ui.draggable.attr('data-rid') )
				allUsers.addRoleToAll( rid )
		)

		$("#dialog-confirm-cancel").dialog
			resizable: false
			autoOpen: false
			height: "auto"
			width: 400
			modal: true
			dialogClass: "no-close"
			hide: 
				effect: "fade"
				duration: 500
			show: 
				effect: "fade"
				duration: 500
			buttons:
				"Скасувати": ()->
					$( this ).dialog( "close" );
					allUsers.getAndShow()
				"Відмінити": ()->
					$( this ).dialog( "close" );

		$("#dialog-saved").dialog
			resizable: false
			autoOpen: false
			height: "auto"
			width: 400
			modal: true
			dialogClass: "no-close"
			hide: 
				effect: "fade"
				duration: 500
			show: 
				effect: "fade"
				duration: 500
			buttons:
				"Ok": ()->
					$( this ).dialog( "close" );

	



		

