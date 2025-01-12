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


function oneStudentInfo() {
    console.log('function is works');
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

async function loadAllStudents() {
    try {
        const newResponse = await axios.get("https://hp-api.onrender.com/api/characters");

        const students = await newResponse.data;
        console.log(students);   
        listStudents(students);
    
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