$(document).ready(function(){

	const outputContainer = $("#output");
	const teamUL = $("#teamsList");

	const loadTeams = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/teams.json")
			.done((data) => resolve(data.teams))
			.fail((error) => reject(error));
		});
	};

	const loadCharacters = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/characters.json")
			.done((data) => resolve(data.characters))
			.fail((error) => reject(error));
		});
	};

	const loadGenders = () => {
		return new Promise((resolve, reject) => {
			$.ajax("./db/genders.json")
			.done((data) => resolve(data.genders))
			.fail((error) => reject(error));
		});
	};


	let teamList = [];
	let charactersArray = [];
	let gendersArray = [];
	

	loadTeams().then((teams) => {
		teamList = teams;
		loadNav(teamList);	
		return loadGenders();
		})
	.then((genders) => {
		gendersArray = genders;
		return loadCharacters();
	})	
	.then((characters) => {
		charactersArray = characters;

	});

	teamUL.on('click', 'li', function(){	
       let teamSelectId = $(this).attr('id');
    	makeDOM(teamSelectId, charactersArray, gendersArray);  
   	 });

	
	const loadNav = (teamList) => {

   		 teamList.forEach((team) => {
			teamUL.append(`<li id=${team.id}><a href="#">${team.name}</a></li>`);
			console.log(team.name);
    		});
	};


const makeDOM = (teamSelectId, charactersArray, gendersArray) => {

$("h1").hide();
let domString = "";
console.log(teamSelectId , charactersArray, gendersArray);
	for (let i=0; i<charactersArray.length; i++){

		let gender = "";
		if (teamSelectId == charactersArray[i].team_id){

			for (j=0;j<gendersArray.length; j++){
				if (charactersArray[i].gender_id == gendersArray[j].id){
					gender = gendersArray[j].type;
					break;
				}
			};

			domString +=  `<div class="col-md-3 charBox">`;
		    domString += `<h4>${charactersArray[i].name}</h4>`;
			domString += `<img class=${gender} src="${charactersArray[i].image}">`;

			if (charactersArray[i].description > ""){
				domString += `<p>${charactersArray[i].description}</p>`;
			}
			else{
				if (gender == "Male"){
					domString += `<p>1234567890</p>`;
				}else{
					domString += `<p>abcde fghij klmno pqrst uvwxy z</p>`;
				}
			}
			
		    domString += `</div>`;
		};
	};
	 outputContainer.html(domString);

}



});