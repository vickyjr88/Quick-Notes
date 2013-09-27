// JavaScript Document
//JSON.parse and JSON.stringify

var createHomePage = function(content){
	for(var i=0; i<content.notes.length; i++){
		var data = '<div class="note"><h3>'+content.notes[i].title+'</h3>';
		data += '<p>'+content.notes[i].txt+' <a href="#'+i+'" id="'+i+'"" class="more">more..</a></p></div>'
		$('#wrapper #hcontent').append(data);
		}
}

var showIndPage = function(ref){
	content = JSON.parse(localStorage.notes);
	//var page = '<div id="page'+ref+'"  data-role="page">';
		var page = '<div class="note"><h3>'+content.notes[ref].title+'</h3>';
		page += '<p>'+content.notes[ref].txt+'<br/><a href="#'+ref+'" id="'+ref+'"" class="delete">Delete</a></p>';
		//page += '</div>';
		$('body .c-free #free').html(page);
		var url = '#page'+ref;
		$('body .c-free').attr('id', 'page'+ref);
		$(".delete").click(function(e) {
		var ref = $(this).attr('id');
		deletePage(ref); 
	});
		$.mobile.changePage(url, "fade", true, false);
}

var deletePage = function(ref){
	content = JSON.parse(localStorage.notes);
	
	content.notes.splice(ref, 1);
	myNotes = JSON.stringify(content);
	localStorage.notes = myNotes;
	$.mobile.changePage('#wrapper', "fade", true, true);
	}

$(function(){
	var content = {"notes":[
	{
		"title":"My new note.",
		"txt":"My first note",
		"date":"12/12/2013"
	},
	{
		"title":"My note.",
		"txt":"My second note",
		"dte":"12/12/2013"
	},
	{
		"title":"Apps day.",
		"txt":"My second note",
		"dte":"21/09/2013"
	}
	]}
	myNotes = JSON.stringify(content);
	if (localStorage.key("notes") == null)
		localStorage.notes = myNotes;
		
	content = JSON.parse(localStorage.notes);


	createHomePage(content);
	var cont = content.notes;
	
	$("#submit").click(function(e) {
		var newNote = {
			"title":$('#myTitle').val(),
			"txt":$('#myTxt').val()
			}
				
		    content.notes.push(newNote);	
			myNotes = JSON.stringify(content);
			localStorage.notes = myNotes;
			var i = content.notes.length - 1;
			
		var data = '<div class="note"><h3>'+$('#myTitle').val()+'</h3>';
		data += '<p>'+$('#myTxt').val()+' <a href="#'+i+'" id="'+i+'"" class="more">more..</a></p>'
		$('#wrapper #hcontent').append(data);
		$('#myTitle').val("");
		$('#myTxt').val("");
		$.mobile.changePage("#wrapper", "fade", true, true);
  });	

	$(".more").click(function(e) {
		var ref = $(this).attr('id');
		showIndPage(ref); 
	});	
	
		
});