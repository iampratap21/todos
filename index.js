let itemsArray = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];
console.log(itemsArray);

function createItem(item) {
    if (item.value.trim() === "") {
        alert("Please enter a non-empty todo item.");
        return;
    }
    itemsArray.push(item.value);
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
}

function displayItems() {
    let items = '';
    for(let i=0 ; i<itemsArray.length ; i++) {
        items += `<div class="item">
                    <div class="input-controller">
                        <textarea class="fixed-size" disabled>${itemsArray[i]}</textarea>
                        <div class="edit-controller">
                            <i class="fa-solid fa-trash deleteBtn"></i>
                            <i class="fa-solid fa-pen-to-square editBtn"></i>
                        </div>
                    </div>
                    <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                    </div>
                </div>`
    }
    const itemDiv = document.querySelector('.todo-list');
    itemDiv.innerHTML = items;
    Delete();
    Edit();
    Save();
    Cancel();
}

// delete start
function Delete() {
    let deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((db,i)=>{
        db.addEventListener('click',()=>{deleteItem(i)});
    })
}

function deleteItem(i) {
    itemsArray.splice(i, 1);
    localStorage.setItem('items',JSON.stringify(itemsArray));
    location.reload();
}
// delete end

// edit start
let originalItemsArray;
function Edit() {
    let editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');

    editBtn.forEach((eb,i)=>{
        eb.addEventListener('click', ()=>{
            originalItemsArray = itemsArray.slice();    
            updateController[i].style.display = 'block';
            inputs[i].disabled = false;
        })
    })
}
let enterBtn = document.querySelector('#enter');
enterBtn.addEventListener('click', () => {
    const item = document.querySelector('#item');
    createItem(item);
});
// edit end

// save start
function Save() {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.input-controller textarea');
    saveBtn.forEach((sb,i)=>{

        sb.addEventListener('click',()=>{
            updateItem(inputs[i].value, i)
        })
    })
}

function updateItem(text, i) {
    itemsArray[i] = text;
    localStorage.setItem('items', JSON.stringify(itemsArray));
    location.reload();
}
// save end

// cancel starts
function Cancel() {
    const cancelBtn = document.querySelectorAll('.cancelBtn');
    const updateController = document.querySelectorAll('.update-controller');
    const inputs = document.querySelectorAll('.input-controller textarea');
    cancelBtn.forEach((cb,i)=>{
        cb.addEventListener('click',()=>{
            itemsArray = originalItemsArray.slice(); 
            localStorage.setItem('items', JSON.stringify(itemsArray));
            updateController[i].style.display = 'none';
            inputs[i].value = itemsArray[i]; 
            inputs[i].disabled = true;
        })
    })
}
// cancel end

const itemInput = document.querySelector('#item');

itemInput.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) { 
        event.preventDefault(); 
        enterBtn.click();
    }
});

window.onload = function() {
    displayItems();
}