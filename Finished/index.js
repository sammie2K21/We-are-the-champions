import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getDatabase, onValue, ref, push, remove } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const firebaseConfig = {
    databaseURL: "https://we-are-the-champions-1f05f-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let inputEl = document.getElementById("input-el");
const btn = document.getElementById("Publish_btn");
const endorsementsinDb = ref(database, "Endorsements");
let endorsementsEL = document.getElementById("Endorsements");

// Push values into the database
btn.addEventListener("click", function() {
    let inputValue = inputEl.value;
    if (inputValue.trim()) { // Ensure input is not empty
        push(endorsementsinDb, inputValue);
        clearInputValue();
    }
});

// Display from the realtime database using onValue function
onValue(endorsementsinDb, function(snapshot) {
    let itemsArray = Object.entries(snapshot.val() || {}); // Handle null case
    endorsementsEL.innerHTML = "";

    for (let i = 0; i < itemsArray.length; i++) {
        let currentItem = itemsArray[i];
        let currentItemID = currentItem[0];
        let currentiteminDbValue = currentItem[1];
        appendtoEndorsements(currentItem);
    }
});

// Clear input value
function clearInputValue() {
    inputEl.value = "";
}

// Function to append to the list
function appendtoEndorsements(value) {
    let itemValue = value[1]
    let itemID = value[0]
    
    let newEl = document.createElement("li"); // Create a new <div> element
    newEl.textContent = itemValue; // Set its text content to the provided value
       newEl.addEventListener('dblclick', () => {
        let exactLocationInDB = ref(database, `Endorsements/${itemID}`);
        remove(exactLocationInDB)
   
    
    });
    endorsementsEL.appendChild(newEl); // Append the new <div> to the container
}
