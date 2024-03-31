document.getElementById('generate').addEventListener('click', generateFriends);
document.getElementById('reset').addEventListener('click', resetForm);

let friendData = [];

function generateFriends() {
    const friendCount = Math.floor(Math.random() * 9) + 1; // random number of friends 1-9
    document.getElementById("friendCount").innerText = `Enter details for ${friendCount} friend(s):`;

    const form = document.getElementById("friendForm");
    form.innerHTML = ''; // clear form

    for (let i = 0; i < friendCount; i++) {
        const inputGroup = document.createElement("div");
        inputGroup.innerHTML = `
            <input type="text" placeholder="Friend ${i + 1}'s Nickname" id="name${i}" required>
            <input type="number" placeholder="Friend ${i + 1}'s Age" id="age${i}" required>
        `;
        form.appendChild(inputGroup);
    }

    // add select function of calculator
    const selectCalculation = document.createElement("select");
    selectCalculation.classList.add('select')
    selectCalculation.id = "calculationType";
    selectCalculation.innerHTML = `
        <option selected>-- Select function of calculator --</option>
        <option value="totalAge">Total Age</option>
        <option value="averageAge">Average Age</option>
        <option value="youngestFriend">Youngest Friend</option>
        <option value="oldestFriend">Oldest Friend</option>
    `;
    form.appendChild(selectCalculation);

    document.getElementById("calculate").addEventListener("click", () => handleCalculate(friendCount));
}

function handleCalculate(friendCount) {
    let friends = [];
    for (let i = 0; i < friendCount; i++) {
        const name = document.getElementById(`name${i}`).value;
        const age = document.getElementById(`age${i}`).value;
        if (name && age) {
            friends.push({ name, age: parseInt(age, 10) });
        }
    }

    if (friends.length < friendCount) {
        alert("Please fill in all friends' details.");
        return;
    }

    const calculationType = document.getElementById("calculationType").value;
    switch (calculationType) {
        case "totalAge":
            calculateTotalAge(friends);
            break;
        case "averageAge":
            calculateAverageAge(friends);
            break;
        case "youngestFriend":
            calculateYoungestFriend(friends);
            break;
        case "oldestFriend":
            calculateOldestFriend(friends);
            break;
        default:
            alert("Please select a calculation type.");
            break;
    }
}

function calculateTotalAge(friends) {
    const totalAge = friends.reduce((sum, friend) => sum + friend.age, 0);
    document.getElementById("results").innerHTML = `Total age of all friends: ${totalAge}`;
}

function calculateAverageAge(friends) {
    const totalAge = friends.reduce((sum, friend) => sum + friend.age, 0);
    const averageAge = totalAge / friends.length;
    document.getElementById("results").innerHTML = `Average age of all friends: ${averageAge.toFixed(2)}`;
}

function calculateYoungestFriend(friends) {
    // Determine the minimum age among all friends
    const minAge = friends.reduce((min, friend) => friend.age < min ? friend.age : min, friends[0].age);
    
    // Filter the friends who have the minimum age
    const youngestFriends = friends.filter(friend => friend.age === minAge);
    
    // Generate the display string for the youngest friends
    const displayText = youngestFriends.map(friend => `${friend.name} (${friend.age} years old)`).join(', ');
    
    // Update the HTML element with the list of youngest friends
    document.getElementById("results").innerHTML = `Youngest friends : ${displayText}`;
   
}

function calculateOldestFriend(friends) {
     // Determine the maximum age among all friends
     const maxAge = friends.reduce((max, friend) => friend.age > max ? friend.age : max, friends[0].age);
    
     // Filter the friends who have the minimum age
     const oldestFriends = friends.filter(friend => friend.age === maxAge);
     
     // Generate the display string for the oldest friends
     const displayText = oldestFriends.map(friend => `${friend.name} (${friend.age} years old)`).join(', ');
     
     // Update the HTML element with the list of oldest friends
     document.getElementById("results").innerHTML = `Oldest friends : ${displayText}`;
}

function resetForm() {
    document.getElementById('friendForm').innerHTML = '';
    document.getElementById('results').innerHTML = '';
    document.getElementById('friendCount').innerText = '';
}