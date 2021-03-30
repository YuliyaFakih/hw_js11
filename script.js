class User {
    constructor(id, name, email, address, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone;
    }
    edit(id, newName, newEmail, newAddress, newPhone) {
        this.name = newName;
        this.email = newEmail;
        this.address = newAddress;
        this.phone = newPhone;
    }
    get() {
        return {id: this.id, name: this.name, email: this.email, address: this.address, phone: this.phone}
    }
}
class Contacts {
    constructor() {
        this.data = [];
        this.addUser = this.addUser.bind(this)
    }
    editUser(event, id) {
        event.preventDefault()
        const name = event.currentTarget[0].value
        const email = event.currentTarget[1].value
        const address = event.currentTarget[2].value
        const phone = event.currentTarget[3].value
        const user = this.data.find(item => item.id === id)
        user.name = name
        user.email = email
        user.address = address
        user.phone = phone
    }
    deleteUser(id) {
        this.data = this.data.filter(item => item.id !== id)
    }
    addUser(event) {
        event.preventDefault()
        const name = event.currentTarget[0].value
        const email = event.currentTarget[1].value
        const address = event.currentTarget[2].value
        const phone = event.currentTarget[3].value
        this.data.push(new User(this.data.length, name, email, address, phone))
    }
}

let contactsData = [];
//let date = new Date(Date.now() + 864000000);
//date = date.toUTCString();
class ContactsApp extends Contacts {
    constructor(data) {
        super(data)
        this.data = []
        
    }

    drawEditForm(id) {
        const currentUser = this.data.find(item => item.id === id)
        console.log(currentUser)
       document.getElementById(id).insertAdjacentHTML('beforeend', `
            <form id="editUser">
                <input type='text' value='${currentUser.name}'>
                <input type='text' value='${currentUser.email}'>
                <input type='text' value='${currentUser.address}'>
                <input type='text' value='${currentUser.phone}'>
                <button> Save </button>
            </form>
       `)
       document.getElementById('editUser').style.position = 'absolute'
       document.getElementById('editUser').style.marginLeft = '340px'
       document.getElementById('editUser').style.marginTop = '-125px'
       document.getElementById('editUser').addEventListener('submit', (event) => {this.editUser(event, id); this.drawUsers()})
        // this.editUser(element.id, this.drawUsers)
    }

    drawUsers() {
        document.body.querySelector('section') && document.body.querySelector('section').remove()
        const dataContainer = document.createElement('section')

        this.data.forEach(element => {
            //delete
            const btnDelete = document.createElement('button')
            btnDelete.innerHTML = 'Delete'
            btnDelete.addEventListener('click', () => {this.deleteUser(element.id);this.drawUsers()})
            //edit
            const btnEdit = document.createElement('button')
            btnEdit.innerHTML = 'Edit'
            btnEdit.addEventListener('click', () => this.drawEditForm(element.id))

            dataContainer.insertAdjacentHTML('beforeend', `
            <div id='${element.id}'>
                <span> ${element.name}, </span>
                <span> ${element.email}, </span>
                <span>${element.address}, </span>
                <span>${element.phone}</span>
            </div>  
        `)
        dataContainer.appendChild(btnDelete)
        dataContainer.appendChild(btnEdit)
        });
        document.body.appendChild(dataContainer)
    }
    init() {
        document.body.insertAdjacentHTML('afterbegin', `
            <form id="addContact">
                <label> Name </label>
                <input type="text" name="name" required>
                <label> Email </label>
                <input type="text" name="email">
                <label> Address </label>
                <input type="text" name="address">
                <label> Phone </label>
                <input type="text" name="tel" required>
                <button> Submit </button>
            </form>
        `)
        document.getElementById('addContact').addEventListener('submit', (event) => {
            this.addUser(event); 
            this.drawUsers()
            this.contactAdd()
            localStorage.setItem('contactsData', JSON.stringify(contactsData))
            let date = new Date(Date.now() + 874800000);
            date = date.toUTCString();
            document.cookie = 'storageExpiration=10days; expires=' + date
            document.querySelectorAll('form input')[0].value = ''
            document.querySelectorAll('form input')[1].value = ''
            document.querySelectorAll('form input')[2].value = ''
            document.querySelectorAll('form input')[3].value = ''
            setTimeout(() => {
                localStorage.clear(); 
              }, 874800000); 

            if(localStorage.length == 0) this.getData()
            
        })
    }

    get storage(){
        console.log(localStorage.getItem('contactsData'))
        return localStorage.getItem('contactsData')
    }

    
    set storage(data) {
        //let contactsData = [];
    }
        
    contactAdd() {
            let inputName = document.querySelector('#addContact input[name="name"]').value;
            let inputEmail = document.querySelector('#addContact input[name="email"]').value;
            let inputAddress = document.querySelector('#addContact input[name="address"]').value;
            let inputPhone = document.querySelector('#addContact input[name="tel"]').value;
        
        if(inputName.length == 0 || inputName == ' ' || inputEmail.length == 0 || inputEmail == ' ' ||
        inputAddress.length == 0 || inputAddress == ' ' ||
        inputPhone.length == 0 || inputPhone == ' ') return;

        let contact = {
            name: inputName,
            email: inputEmail,
            address: inputAddress,
            phone: inputPhone
        }

        contactsData.push(contact)
        //localStorage.setItem('contactsData', JSON.stringify(contactsData))
    }

    getData() {
        const getUsersList = async function () {
            let url = 'https://jsonplaceholder.typicode.com/users'
            await fetch(url).then(function(response) {
                return response.json()
            }).then(function(list) {
                console.log(list)
                data.push(list)                         //data is undefined
                localStorage.setItem('usersList', JSON.stringify(list))
                
            })
        }()
        
    }

        
    
}


const contactsBook = new ContactsApp()
contactsBook.init()
//contactsBook.storage = localStorage.setItem('contactsData', JSON.stringify(contactsData))
//('user1_name', document.querySelectorAll('section div > span')[0].textContent)
//contactsBook.storageSet()


