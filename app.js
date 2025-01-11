const forSearch = document.getElementById('inputSearch');
const searchButton = document.getElementById('searchBtn');
const text = document.querySelector('.text');

function search() {
    //add
}

searchButton.addEventListener('click', search);

const axiosInstance = axios.create({
    baseURL: "https://potterapi-fedeperin.vercel.app/en",
    headers: {
        'Content-Type': 'application/json',
    },
});

// axios.defaults.baseURL = 'https://potterapi-fedeperin.vercel.app/en';
// axios.defaults.headers.common['Content-Type'] = 'application/json';

async function initialLoad() {
    try {
        // Fetch from API

        //"routes": ["/en/books", "/en/characters", "/en/houses", "/en/spells"],
        
        const response = await axiosInstance.get("/spells");

        const spells = await response.data;
        console.log(spells);

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
         * description :  "On his birthday, Harry Potter discovers that he is the son of two well-known wizards, from whom he has inherited magical powers. 
         *                  He must attend a famous school of magic and sorcery, where he establishes a friendship with two young men who will become his 
         *                  companions on his adventure. During his first year at Hogwarts, he discovers that a malevolent and powerful wizard named Voldemort 
         *                  is in search of a philosopher's stone that prolongs the life of its owner."
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
  
initialLoad();