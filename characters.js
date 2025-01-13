const listOfCharacters = document.querySelector(".listCharac");
const totalStd = document.getElementById("totalStd");
const oneCharacter = document.querySelector(".oneCharacter");
const addForm = document.getElementById("addForm");

function clearList () {
    totalStd.textContent = "Total students: ";
    const total = listOfCharacters.childElementCount;
    console.log(total);
    for (let i=0; i<total; i++) {
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
    clearList();
    
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



async function addCharacter (event) {
    event.preventDefault();
    try {
        const form = event.target;
        const newsCharacter = {
                    // 0 Full name <input type="text" />  
                    // 1 Nickname <input type="text" /> <br />
                    // 2 Date of Birth <input type="text" /> <br />  
                    // 3 House <select name="house" id="">
                    //     <option value="Gryffindor">Gryffindor</option>
                    //     <option value="Ravenclaw">Ravenclaw</option>
                    //     <option value="Slytherin">Slytherin</option>
                    //     <option value="Hufflepuff">Hufflepuff</option>
                    // </select> <br>                       
                    // 4 Photo <input type="text" /> 
                    // 5 Actor <input type="text" /> <br />                   

            birthdate :  form[2].value,
            // children :  ['James Sirius Potter', 'Albus Severus Potter', 'Lily Luna Potter'],
            fullName :  form[0].value,
            hogwartsHouse : form[3].value,
            image : form[4].value,
            index: ++total,
            interpretedBy :  form[5].value,
            nickname : form[1].value,
    
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
        addForm.reset();
    }, 4000);
    
}

addForm.addEventListener("submit", addCharacter);