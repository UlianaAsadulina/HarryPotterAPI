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

async function getStudent() {
    try {
        clearList();
        clearBio();
        const studentName = searchCharacter.value;
        console.log(studentName);
        const newResponse = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters", {
            params: { 
                    search: studentName
                }
            });       

        const students = await newResponse.data;
        console.log(students);        
        listStudents(students);

    } catch(err) {
        console.log(err)
    }
    
}

const searchCharacter = document.getElementById("searchCharacter");
const getCharacter = document.getElementById("getCharacBTN");
getCharacter.addEventListener("click", getStudent);

async function oneStudentInfo(studentID) {
    console.log('function is starts');
    console.log(studentID);
    clearBio();

    const response = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters", {
        params: { 
            index: studentID 
            }, 
        });
    const student = await response.data;
    console.log(student);

    
    // student = {
    //         birthdate :  "Jul 31, 1980",
    //         children :  ['James Sirius Potter', 'Albus Severus Potter', 'Lily Luna Potter'],
    //         fullName :  "Harry James Potter",
    //         hogwartsHouse : "Gryffindor",
    //         image : "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/characters/harry_potter.png",
    //         index: 0,
    //         interpretedBy :  "Daniel Radcliffe",
    //         nickname : "Harry",
    // }
        
            
    oneCharacter.innerHTML=`
        <img src="${student.image}">
        <h3>${student.fullName}</h3>
        <p><strong>Date Of Birth: </strong>${student.birthdate}</p>
        <p><strong>House: </strong>${student.hogwartsHouse}</p>     
        <p><strong>Actor: </strong>${student.interpretedBy}</p> 
    `;


}

function listStudents(array){
    const students = array;
    console.log(students);
    
    students.forEach((student) => {
        // console.log(student.fullName);
        const list=document.createElement("li");
        list.textContent = student.fullName;
        list.setAttribute("onclick", `oneStudentInfo("${student.index}")`);
        listOfCharacters.appendChild(list);
        
    })
    
    totalStd.innerHTML+=students.length;

}

let total;

async function loadAllStudents() {
    try {
        const newResponse = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters");
        const students = await newResponse.data;
        console.log(students);   
        listStudents(students);
        total = students.length;   
    } catch (err) {
        console.log(err)
    }
}

async function houseStudents(house) {
    try {
        clearBio();
        console.log(house);
        const newResponse = await axios.get("https://potterapi-fedeperin.vercel.app/en/characters", {
            params: { 
                    search: house 
                }
            });       

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