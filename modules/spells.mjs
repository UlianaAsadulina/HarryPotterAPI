// import { axiosInstance } from "./app.js";

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
  


export async function randomSpell() {
    try {

       
        const response = await axiosInstance.get("spells/random");

        const spell = await response.data;
        // console.log(spell);
        alert(`Spell "${spell.spell}"\n${spell.use}`);

    } catch (err) {
        console.log(err);
    }
    
}

export async function findSpell() {
    try {
        const search = document.getElementById("inputSearch").value;
        console.log(search);

        const response = await axiosInstance.get("spells", { 
            params: { 
                search: search 
            } 
        });
        
        const spells = await response.data;

        console.log(spells);
    

        let message = `Total ${spells.length} spell(s) was find: \n`;
        spells.forEach((spell) => {
            message+=`Spell "${spell.spell}" ${spell.use}\n`;
        })

        alert(message);

    } catch (err) {
        console.log(err);
    }
    
}

window.randomSpell = randomSpell;
window.findSpell = findSpell;