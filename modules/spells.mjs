// import { axiosInstance } from "./app.js";

const axiosInstance = axios.create({
    baseURL: "https://potterapi-fedeperin.vercel.app/en",
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function randomSpell() {
    try {

       
        const response = await axiosInstance.get("spells/random");

        const spell = await response.data;
        console.log(spell);
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
