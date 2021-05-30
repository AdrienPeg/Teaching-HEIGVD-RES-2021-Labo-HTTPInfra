$(function() {
	console.log("loading students");
		function loadStudents(){
			$.getJSON( "/api/students/", function( students ) {
			console.log(students);
			var message = "Nobody is here";
			if ( students.length > 0) {
				message = students[0].name;
			}
		$(".footer-info").append("<p> " + message + "</p>");
	});
	};
	loadStudents();
	setInterval(loadStudents, 2000);
});