//listen for form submit

document.getElementById("myForm").addEventListener('submit',saveBookmark);

//save Bookmark item
function saveBookmark(e){

	//variable for bookmark item

	var SiteName = document.getElementById("SiteName").value;


	var SiteURL = document.getElementById("SiteURL").value;

	if(!validateForm(SiteName,SiteURL)){

		return false;
	}

	var bookmark = {

		name : SiteName,
		url : SiteURL 
	}
			
			/*
				//local storage "save only string"

				localStorage.setItem('test','Hello World');

				console.log(localStorage.getItem('test'));

				localStorage.removetItem('test');//delete Item from local storage

				console.log(localStorage.getItem('test'));
			*/


	//test if bookmark is null

	if(localStorage.getItem('bookmarks')===null){
		
		//into array
		var	bookmarks = [];

		bookmarks.push(bookmark);

		//set item to localstorage

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}	

	else{

		//get bookmarks item from lcalstorage 

		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		//Add bookmark to the array

		bookmarks.push(bookmark);

		//re-set to the localstorage 
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

	}	

	//refreshing form 

	document.getElementById("myForm").reset();

	//re-fetch bookmarks

	fetchBookmarks();

	//prevent form from submitting
	e.preventDefault();

}

//delete bookmark function

function deletebookmark(url){

	//bookmark collect from localstorage

	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

	//loop through the bookmarks

	for(var i=0 ; i < bookmarks.length; i++){

		if(bookmarks[i].url == url){

			bookmarks.splice(i,1);
		}

	}


		//re-set to the localstorage 
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

		//re-fetch bookmarks

		fetchBookmarks();

}

 function fetchBookmarks(){

 	//get bookmarks item from local storage

 	var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

 	//get output id

 	var bookmarksResults = document.getElementById('bookmarksResults'); 

 	//build output

 	bookmarksResults.innerHTML = "";

 	for(var i = 0; i < bookmarks.length; i++){

 		var name = bookmarks[i].name; 
 		var url = bookmarks[i].url; 

 		bookmarksResults.innerHTML += '<div class = "well">'+
 										'<table class="table table-hover">' + '<tr>' +
 										'<td>'+name+ '</td>' +  
 										'<td>' + '<a class="btn btn-success" target= "_blank" href="'+url+'">Visit</a>' + '</td>' +
 										'<td>' + '<a onclick="deletebookmark(\''+url+'\')" class="btn btn-danger"  href="#">Delete</a>' + '</td>'
 										 + '</tr>' + '</table>' +'<div>';
 	}

 }

 //form validation

 function validateForm(SiteName, SiteURL){

 	//blank form blocking

	if(!SiteName || !SiteURL){

		alert('Please Fill Up the Form Correctly');
		return false;
	}

	//Url expression checking 

	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
	var regex = new RegExp(expression);

	if(!SiteURL.match(regex)){

		alert('Please Enter Valid Url');

		return false;
	}

	

	return true;
 }