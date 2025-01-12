const booksContainer = document.querySelector(".booksContainer");
const bookInfo = document.querySelector(".bookInfo");


const axiosInstance = axios.create({
    baseURL: "https://potterapi-fedeperin.vercel.app/en",
    headers: {
        'Content-Type': 'application/json',
    },
});

let books = [];


async function initialBooksLoad() {
    try {
        // Fetch from API        
        const response = await axiosInstance.get("/books");

        books = await response.data; 
            
        books.forEach((book) => {
            let newBook = document.createElement("div");
            newBook.setAttribute("class", "oneBook");
            newBook.setAttribute("id", book.number);
            newBook.setAttribute("onclick", "showInfo(event)");
            booksContainer.appendChild(newBook);
            let cover = document.createElement("img");
            cover.setAttribute ("src", book.cover);
            newBook.appendChild(cover);
            let title = document.createElement("p");
            title.textContent = book.title;
            newBook.appendChild(title);           
            
        }); 
  
    } catch (err) {
        console.log(err);
    }
}
  
initialBooksLoad();

function showInfo(event) {
    
    let bookNumber = event.target.parentElement.id;
    
    for (let i=0; i<books.length; i++) {     

        if (books[i].number == bookNumber) {
            bookInfo.innerHTML = `
                <h1>${books[i].title}</h1>
                <h2>Book # ${books[i].number}</h2>
                <p><strong>Date of release:</strong> ${books[i].releaseDate}</p>
                <p><strong>Official Title:</strong> ${books[i].originalTitle}</p>
                <p>${books[i].description}</p>
                <p><strong>Pages:</strong> ${books[i].pages}</p>
                `
        }

    }


}
