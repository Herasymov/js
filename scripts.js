window.onload = init;

let cm;

let trashbin = document.createElement("img");
trashbin.src = "https://imgur.com/yHyDPio.png";
// trashbin.dataset.filmId = 3; // 3 is the current row index and corresponds
                                // to film at index = 3 in the array of films


function addInput(name, el, placeholder) {
    var firstInput;
    var text = document.getElementById(el);
    firstInput  = document.createElement("input");
    firstInput.type = "text"
    firstInput.name  = name
    firstInput.placeholder = placeholder
    text.appendChild(firstInput);
    text.appendChild(document.createElement("br"));

}

function init() {
    cm = new FilmManager();
    cm.addTestData();
    cm.printfilmsToConsole();
  
  cm.displayfilmsAsATable("films");
}



class Film {
  constructor (name, year=0, director="", actors=[], platforms=[], picture=""){
    this.name = name;
    this.year = year;
    this.director = director;
    this.actors = actors;
    this.platforms = platforms;
    this.picture = picture;
  }
}



class FilmManager{
    constructor(){
      // when we build the film manager, it has an empty list of films
      this.listOfFilms = [];    
    }
    addTestData(){
      let c1 = new Film("mandalores", 2001, "Xuyan Po", ["Arnold Schwarzenneger", "Angus Young"]);
      let c2 = new Film("Polaj", 2011, "Nicola Vlaxovich");
      let c3 = new Film("Angus Young", 2015, "Lois Pollinov");
      let c4 = new Film("X-Men", 2000, "Bryan Singer", [], ["netflix"], "https://upload.wikimedia.org/wikipedia/en/thumb/8/81/X-MenfilmPoster.jpg/220px-X-MenfilmPoster.jpg" )
  
      this.add(c1);
      this.add(c2);
      this.add(c3);
      this.add(c4);
      // Let´s sort the list of films by name
      this.listOfFilms.sort((a, b) => b.year - a.year);

      console.log(this.listOfFilms)
    }
    
    add (film){
      this.listOfFilms.push(film);    
    }
  
  
  //
  removeName(film, nameSelected){
      // we iterate on the list of films until we find the film 
      // passed as a aparemeter (we say that they are equal if name match)
      console.log("removeName", nameSelected)
      for (let i = 0; i <this.listOfFilms.length; i++){
            var c = this.listOfFilms[i];
            console.log(c) 
            if (c.name.split(' ').join() === nameSelected) {
              // remove the film at index i
                console.log("i = "+i) 
                this.listOfFilms.splice(i,1);
                // stop / exit the loop
            break;
            }
        }
    }
  
  //
  searchName(film, nameSelected, idOfContainer){
      // we iterate on the list of films until we find the film 
      // passed as a aparemeter (we say that they are equal if emails match)
      console.log("Searching name");
      let container = document.querySelector("#"+ idOfContainer);
          container.innerHTML = "";
                                             
      for (let i = 0; i <this.listOfFilms.length; i++){
            var c = this.listOfFilms[i];
            let table = document.createElement("table");
        
        
            console.log(c) ;
            if (c.name === nameSelected) {
              // remove the film at index i
                console.log("i = "+i) 
                container.innerHTML = "<br>name: " + c.name + "<br><br> year: "+ c.year + "<br><br> director: "
                    + c.director + "<br><br> actors: "+ c.actors  + "<br><br> platforms: "+ c.platforms + "<br><br> image: " +
                    `<img src=${c.picture} alt="">`
                // stop / exit the loop
            break;
            } else {
              console.log("Name not found");
              container.innerHTML = nameSelected + " not found";
            }
        }
  }

  
    printfilmsToConsole(){
      this.listOfFilms.forEach(function(c){
        console.log(c.name)
      });
    };

    
    displayfilmsAsATable (idOfContainer) {
      // to empty the container that contains the result
        let container = document.querySelector("#" + idOfContainer);
            container.innerHTML = "";

        if(this.listOfFilms.length === 0){
            container.innerHTML = "<p>No films to display.</p>";
        //stops the execution of this method
        return;
        }

        // creates and populates the table with users
        let table = document.createElement("table");

        table.setAttribute('class', "styled-table");
        table.setAttribute('id', "films");
        var thead = document.createElement("thead");
        thead.innerHTML = "<tr> \
           <th onclick=sortByName() style='color: #000000; background-color: #ffdbdb;'>Name</th>\
           <th onclick=sortByYear() style='color: #ff00ff; background-color: #053805;'>Year</th>\
           <th>Director</th>\
           <th>Actors</th>\
           <th>Platforms</th>\
           <th>Image</th>\
           <th>Delete</th>\
        </tr>"
        var tbody = document.createElement("tbody");
        // iterates on the array of users
        this.listOfFilms.forEach(function(currentfilm) {
          // creates a row
          let row = tbody.insertRow();
          trashbin.dataset.filmId = row;
          row.innerHTML = "<td>" + currentfilm.name + "</td>"
                       + "<td>" + currentfilm.year + "</td>"
                       + "<td>" + currentfilm.director + "</td>"
                       + "<td>" + currentfilm.actors + "</td>"
                       + "<td>" + currentfilm.platforms + "</td>"
                       + "<td>" + `<img src=${currentfilm.picture} alt="">` + "</td>"
                       + "<td>" +` <img id=${currentfilm.name.split(' ').join()} src=${trashbin.src}>` + "</td>"
          });
        // adds the table the div
        container.appendChild(table);
        table.appendChild(thead);
        table.appendChild(tbody);
                          
    }
    
  }


function formSubmitted(){
  // get the values from input fields
  let name = document.querySelector("#name");
  let year = document.querySelector("#year");
  let director = document.querySelector("#director");
  let b1 = document.getElementById('act_inp');
  let actors_input= document.getElementsByName('actors');
  let actors = [];
  for (let i = 0; i < actors_input.length; i++) {
    if (actors_input[i].value) {
        actors.push(actors_input[i].value);
    }
  }
  let b2 = document.getElementById('platforms_inp');
  let platforms_input= document.getElementsByName('actors');
  let platforms = [];
  for (let i = 0; i < platforms_input.length; i++) {
    if (platforms_input[i].value) {
        platforms.push(platforms_input[i].value);
    }
  }
  let picture = document.querySelector("#pic");
  let newfilm = new Film(
      name.value,
      year.value,
      director.value,
      actors,
      platforms,
      picture.value
  );
  cm.add(newfilm)
  
  // empty the input fields
  name.value = "";
  year.value = 2021;
  director.value = "";
  b1.innerHTML = "";
  b2.innerHTML = "";
  picture.value = "";
  // refresh the table
  cm.listOfFilms.sort((a, b) => b.year- a.year);
  cm.displayfilmsAsATable("films");
  
  // do not let your browser submit the form using HTTP
  return false;
}

function formSearch(){
  // get the values from input fields
  let nameSearchFor = document.querySelector("#nameSearch");
  cm.searchName("films", nameSearchFor.value, "searchList")
  return false;
  
  
}

function sortByName(){
    cm.listOfFilms.sort(function(a, b) {
  let nameA = a.name.toUpperCase();
  let nameB = b.name.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
  return 0;
});
    cm.displayfilmsAsATable("films");
}

function sortByYear(){
    cm.listOfFilms.sort((a, b) => a.year - b.year);
    cm.displayfilmsAsATable("films");
}

document.addEventListener("click", function(evt) {
 //  var rowSelector = evt.target;
  
  console.log(evt.target.id);
  ///
  cm.removeName("films", evt.target.id)
  ///
  
  
  
  
  cm.displayfilmsAsATable("films");
  
  
  });

// evt.target.dataset.filmId


  
  
  
  
  
  
  
