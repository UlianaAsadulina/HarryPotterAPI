import { randomSpell, findSpell } from "./modules/spells.mjs";

const forSearch = document.getElementById('inputSearch');
// const searchButton = document.getElementById('searchBtn');
const text = document.querySelector('.text');



//export 
const axiosInstance = axios.create({
    baseURL: "https://potterapi-fedeperin.vercel.app/en",
    headers: {
        'Content-Type': 'application/json',
    },
});

function sortHat() {
    const houseID = Math.floor(Math.random() * 4);
    switch(houseID) {
        case 0: {
            alert('SortHat says your House is Gryffindor');
            break;
        };
        case 1: {
            alert('SortHat says your House is Hufflepuff');
            break;
        };
        case 2:{
            alert('SortHat says your House is Ravenclaw');
            break;
        };
        case 3:{
            alert('SortHat says your House is Slytherin');
            break;
        };

    }   

}

async function initialLoad() {
    try {
        // Fetch from API

        //"routes": ["/en/books", "/en/characters", "/en/houses", "/en/spells"],
        
        // const response = await axiosInstance.get("/spells",
        //               { params: { search: "Levi" } });

        // const spells = await response.data;
        // console.log(spells);
        

        /**Spell Object
         * index :  3
         * spell :  "Wingardium Leviosa/Locomotor"
         * use :  "Levitates objects"
         * 
         */

        // const houses = await response.data;
        // console.log(houses);

        /**One House Object
         * animal : "Lion"
         * colors :  (2) ['red', 'gold']
         * emoji :  "🦁"
         * founder : "Godric Gryffindor"
         * house :  "Gryffindor"
         * index :  0 
         */



        // const characters = await response.data; 
        // console.log(characters);

        /**One Character object
         * birthdate : "Jul 31, 1980"
         * children :  (3) ['James Sirius Potter', 'Albus Severus Potter', 'Lily Luna Potter']
         * fullName : "Harry James Potter"
         * hogwartsHouse :  "Gryffindor"
         * image :  "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/characters/harry_potter.png" 
         * index :  0
         * interpretedBy :  "Daniel Radcliffe"
         * nickname :  "Harry" 
         */
    
    
        // const books = await response.data; 
    
        // console.log(books);

        /** One book object
         * cover : "https://raw.githubusercontent.com/fedeperin/potterapi/main/public/images/covers/1.png"
         * description :  "On his birthday.."
         * index :  0
         * number :  1
         * originalTitle :  "Harry Potter and the Sorcerer's Stone"
         * pages :  223
         * releaseDate :  "Jun 26, 1997"
         * title :  "Harry Potter and the Sorcerer's Stone" 
         */







        /** 
        
        books.forEach((book) => {
            let oneBook = document.createElement("p");
            
            oneBook.textContent = book.title; // Set the displayed text 
            text.appendChild(oneBook); // Append the book in the text area
        });*/
  
  
    } catch (err) {
        console.log(err);
    }
}
  
//initialLoad();

const flag = document.querySelector(".flag");
const houseInfo = document.querySelector(".houseInfo");

// async function houseStudents(house) {
//     try {
//         const newResponse = await axios.get("https://hp-api.onrender.com/api/characters/house/"+house);

//         const stds = await newResponse.data;
//         console.log(stds);

//         const studentsContainer = document.createElement("div");
//         studentsContainer.setAttribute("class", "students");
//         houseInfo.appendChild(studentsContainer);
        
//         stds.forEach((std) => {         
            
//             let name = document.createElement("p");
//             name.textContent = std.name;
//             name.style.paddingRight = "15px";            
//             studentsContainer.appendChild(name);
//         })


//     } catch (err) {
//         console.log(err)
//     }
// }

async function getHouseInfo(houseID) {
    try {
        // Fetch data  from API

        const response = await axiosInstance.get("/houses", { params: { index: houseID } });

        const selectedHouse = await response.data;
        // const houses = await response.data;
        // console.log(houses);

        /**One House Object
         * animal : "Lion"
         * colors :  (2) ['red', 'gold']
         * emoji :  "🦁"
         * founder : "Godric Gryffindor"
         * house :  "Gryffindor"
         * index :  0 
         */

        // const selectedHouse = houses.find((house) => house.index == houseID);
        // console.log(selectedHouse);

        houseInfo.innerHTML = `
            <h2>${selectedHouse.house}</h2>            
            <p><strong>Founder: </strong> ${selectedHouse.founder}</p>
            <p><strong>Animal: </strong> ${selectedHouse.animal}  ${selectedHouse.emoji}</p>          
            <p><strong>Colors: </strong> ${selectedHouse.colors.join()}</p>            
            `;
        // const studentsBtn = document.createElement("button");
        // studentsBtn.textContent="ShowStudents";
        // let nameofHouse = selectedHouse.house.toLowerCase();
        // console.log(nameofHouse);
        // studentsBtn.setAttribute("onclick", `houseStudents("${nameofHouse}")` );
        // houseInfo.appendChild(studentsBtn);    

    } catch (err) {
        console.log(err);
    }

}

// async function randomSpell() {
//     try {
//         const response = await axiosInstance.get("/spells/random");

//         const spell = await response.data;
//         console.log(spell);
//         alert(`Spell "${spell.spell}"\n${spell.use}`);

//     } catch (err) {
//         console.log(err);
//     }
    
// }

// async function findSpell() {
//     try {
//         const search = document.getElementById("inputSearch").value;
//         console.log(search);

//         const response = await axiosInstance.get("/spells", { 
//             params: { 
//                 search: search 
//             } 
//         });
        
//         const spells = await response.data;

//         console.log(spells);
    
//         let message = `Total ${spells.length} spell(s) was find: \n`;
//         spells.forEach((spell) => {
//             message+=`Spell "${spell.spell}" ${spell.use}\n`;
//         })

//         alert(message);

//     } catch (err) {
//         console.log(err);
//     }
    
// }


document.getElementById("searchBtn").addEventListener("click", findSpell);
document.getElementById("random").addEventListener("click", randomSpell);