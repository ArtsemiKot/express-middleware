const fs = require('fs');
const path = './src/storage/environment.json';

function getAllUsers() {
    const data = JSON.parse(fs.readFileSync(path))
    if (!data) throw new Error('Empty');
    return data;
}

function getUserByID(id) {
    const data = JSON.parse(fs.readFileSync(path))
    const filtered = data.filter((el) => el.id == id);
    if (!filtered.length) throw new Error('User with such ID not found');
    return filtered;
}

function createUser(name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.email == email)
    if (filtered.length > 0) throw new Error('Email already exist')
    const item = {
        id: data.length + 1,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    }
    data.push(item);
    fs.writeFileSync(path, JSON.stringify(data));
    return data;
}

function patchUser(id, clientObj) {
    const data = JSON.parse(fs.readFileSync(path));
    // const oldData = data.filter((el) => el.id == id);
    // if (oldData.length == 0) throw new Error('ID is not found');
    // const newData = { ...oldData[0], ...clientObj };
    const oldData = data.find((el) => el.id == id)
    const newData = { ...oldData, ...clientObj }
    const filtered = data.filter((el) => el.id != id);
    if (filtered.length == data.length) throw new Error('ID is not found');
    filtered.push(newData);
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered;
}

function updateUser(id, name, surname, email, pwd) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);
    if (filtered.length == data.length) throw new Error('ID is not found');
    const item = {
        id: id,
        name: name,
        surname: surname,
        email: email,
        pwd: pwd
    };
    filtered.push(item);
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered;
}


function deleteUserById(id) {
    const data = JSON.parse(fs.readFileSync(path));
    const filtered = data.filter((el) => el.id != id);
    if (filtered.length == data.length) throw new Error('Элемента с таким ID не существует');
    fs.writeFileSync(path, JSON.stringify(filtered));
    return filtered;
}

module.exports = { getAllUsers, getUserByID, createUser, patchUser, updateUser, deleteUserById };