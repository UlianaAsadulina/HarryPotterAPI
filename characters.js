const listOfCharacters = document.querySelector(".listCharac");
const totalStd = document.getElementById("totalStd");
const oneCharacter = document.querySelector(".oneCharacter");

function clearList () {
    totalStd.textContent = "Total students: ";
    const total = listOfCharacters.childElementCount;
    for (let i=0; i<listOfCharacters.childElementCount; i++) {
            listOfCharacters.removeChild(listOfCharacters.firstChild);
    }
}

function clearBio() {
    oneCharacter.innerHTML = "";
}


async function getStudentInfo() {
    try {
        const response = await axios.get("https://hp-api.onrender.com/api/character/:id?id=9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8");

        const std = await response.data;
        console.log(std);   


    } catch(err) {
        console.log(err)
    }
    
}

function oneStudentInfo() {
    console.log('function is works');

//    getStudentInfo();
    //id :  "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8"
    //<li class="container_li"><a href="https://hp-api.onrender.com/api/character/:id">Specific Character by ID</a></li>

    
        let student = {
        actor :  "Daniel Radcliffe",
        alive :  true,
        alternate_actors :  [],
        alternate_names :  (4) ['The Boy Who Lived', 'The Chosen One', 'Undesirable No. 1', 'Potty'],
        ancestry :  "half-blood",
        dateOfBirth :  "31-07-1980",
        eyeColour :  "green",
        gender :  "male",
        hairColour : "black",
        hogwartsStaff : false,
        hogwartsStudent :  true,
        house :  "Gryffindor",
        id :  "9e3f7ce4-b9a7-4244-b709-dae5c1f1d4a8",
        image :  "https://ik.imagekit.io/hpapi/harry.jpg",
        name :  "Harry Potter",
        patronus : "stag",
        species :  "human",
        wand :  {wood: 'holly', core: 'phoenix tail feather', length: 11},
        wizard :  true,
        yearOfBirth :  1980
        }
        
            
    oneCharacter.innerHTML=`
        <img src="${student.image}">
        <h3>${student.name}</h3>
        <p><strong>Date Of Birth: </strong>${student.dateOfBirth}</p>
        <p><strong>House: </strong>${student.house}</p>
        <p><strong>Species: </strong>${student.species}</p>
        <p><strong>Alive: </strong>${student.alive}</p>
        <p><strong>Gender: </strong>${student.gender}</p>
        <p><strong>Actor: </strong>${student.actor}</p> 




    `;


}
function listStudents(students){
    students.forEach((student) => {
        // console.log(student.name);
        const list=document.createElement("li");
        list.textContent = student.name;
        listOfCharacters.appendChild(list);
        
    })
    
    totalStd.innerHTML+=students.length;

}

let total;

async function loadAllStudents() {
    try {
        const newResponse = await axios.get("https://hp-api.onrender.com/api/characters");

        const students = await newResponse.data;
        console.log(students);   
        listStudents(students);
        total = students.length;
    
        // students.forEach((student) => {
        //     // console.log(student.name);
        //     const list=document.createElement("li");
        //     list.textContent = student.name;
        //     listOfCharacters.appendChild(list);
            
        // })
        
        // totalStd.innerHTML+=students.length;
        


    } catch (err) {
        console.log(err)
    }
}

async function houseStudents(house) {
    try {
        const newResponse = await axios.get("https://hp-api.onrender.com/api/characters/house/"+house);

        const students = await newResponse.data;
        console.log(students);
        clearList();
        listStudents(students);

    } catch (err) {
        console.log(err)
    }
}

loadAllStudents();

const form = document.querySelector("form");

async function addCharacter (event) {
    event.preventDefault();
    try {
        const form = event.target;
        const newsCharacter = {
            // 0 Name <input type="text" /> <br />
            // 1 Date of Birth <input type="text" /> <br />  
            // 2 House <select name="house" id="">
            //     <option value="Gryffindor">Gryffindor</option>
            //     <option value="Ravenclaw">Ravenclaw</option>
            //     <option value="Slytherin">Slytherin</option>
            //     <option value="Hufflepuff">Hufflepuff</option>
            // </select> <br>       
            // 3 Species <input type="text" /> <br />
            // 4 Gender <input type="text" /> <br />
            // 5 Is alive <select name="alive" id="">
            //     <option value="true">Yes</option>
            //     <option value="false">No</option>
            // </select> <br>
            // 6 Photo <input type="text" /> <br />
            // 7 Actor <input type="text" /> <br />

                actor :  form[7].value,
                alive :  form[5].value,
                // alternate_actors :  [],
                // alternate_names :  (4) ['The Boy Who Lived', 'The Chosen One', 'Undesirable No. 1', 'Potty'],
                // ancestry :  "half-blood",
                dateOfBirth :  form[1].value,
                // eyeColour :  "green",
                gender :  form[4].value,
                // hairColour : "black",
                // hogwartsStaff : false,
                // hogwartsStudent :  true,
                house :  form[2].value,
                id :  ++total,
                image :  form[6].value,
                name :  form[0].value,
                // patronus : "stag",
                species :  form[3].value,
                // wand :  {wood: 'holly', core: 'phoenix tail feather', length: 11},
                // wizard :  true,
                // yearOfBirth :  1980
            
            };
    
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newsCharacter),
        });
    
        if (!response.ok) {
            throw 'Bad Request';
        }
    
        const data = await response.json();
    
        alertUser('You Sucessfully Added New Character!');
    } catch (err) {
        console.log(err);
    }
}

function alertUser(message) {
    const alertBox = document.querySelector('#alert');    
    alertBox.textContent = message;  
    setTimeout(() => {
        alertBox.textContent = '';
    }, 4000);
    
}

form.addEventListener("submit", addCharacter);