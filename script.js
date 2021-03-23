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

class ContactsApp extends Contacts {
    constructor() {
        super()
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
                <input type="text" required>
                <label> Email </label>
                <input type="text">
                <label> Address </label>
                <input type="text">
                <label> Phone </label>
                <input type="text" required>
                <button> Submit </button>
            </form>
        `)
        document.getElementById('addContact').addEventListener('submit', (event) => {
            this.addUser(event); 
            this.drawUsers()
            document.querySelectorAll('form input')[0].value = ''
            document.querySelectorAll('form input')[1].value = ''
            document.querySelectorAll('form input')[2].value = ''
            document.querySelectorAll('form input')[3].value = ''
        })
    }

    get storage(){
        //localStorage.getItem()
    }

    set storage(data) {

    }
}

const contactsBook = new ContactsApp()
contactsBook.init()
//contactsBook.storage = localStorage.setItem('user1_name', document.querySelectorAll('section div > span')[0].textContent)
