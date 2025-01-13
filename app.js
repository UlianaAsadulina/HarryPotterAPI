import { randomSpell, findSpell } from "./modules/spells.mjs";

const forSearch = document.getElementById('inputSearch');

const text = document.querySelector('.text');


const axiosInstance = axios.create({
    baseURL: "https://potterapi-fedeperin.vercel.app/en",
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(request => {
    request.metadata = request.metadata || {};
    request.metadata.startTime = new Date().getTime(); 
  
    //Set the body element's cursor style to "progress."
    document.body.style.cursor = "progress";
  
    return request;
  });
  

//Add axios interceptors to log the time between request and response to the console.
  
axiosInstance.interceptors.response.use( (response) => {
        response.config.metadata.endTime = new Date().getTime();
        response.config.metadata.durationInMS = response.config.metadata.endTime - response.config.metadata.startTime;
  
        console.log(`Request took ${response.config.metadata.durationInMS} milliseconds.`);
  
        //ISet the progress cursor style as default from the body element.
        document.body.style.cursor = "auto";
  
        return response;
    },
    (error) => {
        error.config.metadata.endTime = new Date().getTime();
        error.config.metadata.durationInMS = error.config.metadata.endTime - error.config.metadata.startTime;
  
        console.log(`Request took ${error.config.metadata.durationInMS} milliseconds.`)
        throw error;
});
  

export function sortHat() {
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




const flag = document.querySelector(".flag");
const houseInfo = document.querySelector(".houseInfo");

function getFlag(houseID) {  
    
    if (flag.firstChild) {
            flag.removeChild(flag.firstChild);
        }

    const flagImg = document.createElement("img");

    switch(houseID) {
      
        case 0: { //your House is Gryffindor
            flagImg.setAttribute("src", "/img/gryffindor.jpg");
            flag.appendChild(flagImg);
            break;
        };
        case 1: { //"Hufflepuff"
            flagImg.setAttribute("src", "/img/hufflepuff.jpg");
            flag.appendChild(flagImg);
            break;
        };
        case 2:{ //"Ravenclaw"
            flagImg.setAttribute("src", "/img/ravenclaw.jpg");
            flag.appendChild(flagImg);
            break;
        };
        case 3:{ //"Slytherin" 
            flagImg.setAttribute("src", "/img/slytherin.jpg");
            flag.appendChild(flagImg);
            break;
        };

    }   

}

const studentsContainer = document.querySelector(".listCharacters");

export async function houseStudents(house) {
    try {
        const newResponse = await axios.get("https://hp-api.onrender.com/api/characters/house/"+house);

        const stds = await newResponse.data;
        console.log(stds);

        const studentsContainer = document.createElement("div");
        studentsContainer.setAttribute("class", "students");
        houseInfo.appendChild(studentsContainer);
        
        stds.forEach((std) => {        
            
            let name = document.createElement("p");
            name.textContent = std.name;
                    
            studentsContainer.appendChild(name);

        })
            let note = document.createElement("h3") ;
            note.textContent = "For more information about each Character go to the Character page on top of this page";
            studentsContainer.appendChild(note);


    } catch (err) {
        console.log(err)
    }
}

export async function getHouseInfo(houseID) {
    try {
        // Fetch data  from API

        const response = await axiosInstance.get("/houses", { params: { index: houseID } });

        const selectedHouse = await response.data;

        houseInfo.innerHTML = `
            <h2>${selectedHouse.house}</h2>            
            <p><strong>Founder: </strong> ${selectedHouse.founder}</p>
            <p><strong>Animal: </strong> ${selectedHouse.animal}  ${selectedHouse.emoji}</p>          
            <p><strong>Colors: </strong> ${selectedHouse.colors.join()}</p>            
            `;

        getFlag(houseID)    ;


        const studentsBtn = document.createElement("button");
        studentsBtn.textContent="ShowStudents";
        let nameofHouse = selectedHouse.house.toLowerCase();
        console.log(nameofHouse);
        studentsBtn.setAttribute("onclick", `houseStudents("${nameofHouse}")` );
        houseInfo.appendChild(studentsBtn);    

    } catch (err) {
        console.log(err);
    }

}

// Attach the functions to the global `window` object
window.getHouseInfo = getHouseInfo;
window.sortHat = sortHat;
window.houseStudents = houseStudents;

