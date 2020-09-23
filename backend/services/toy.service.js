
const fs = require('fs')
const toys = require('../data/toy.json')

module.exports = {
    query,
    getById,
    save,
    remove
}
// function query(filterBy) {


//     var toysToReturn = toys;
//     if (filterBy.q) {
//         toysToReturn = toys.filter(toy => toy.name.includes(filterBy.q))
//     }
//     return Promise.resolve(toysToReturn);
// }

function query(params) {
    if (!Object.keys(params).length) return Promise.resolve(toys)
    var toysToReturn = toys;
    var nameRegex = new RegExp(`${params.filterText || ''}`, 'i');
    toysToReturn = toys.filter(toy => nameRegex.test(toy.name))
    if (params.inStock === 'yes') toysToReturn = toysToReturn.filter(toy => toy.inStock)
    else if (params.inStock === 'no') toysToReturn = toysToReturn.filter(toy => !toy.inStock)
    if (params.sortBy === 'price') toysToReturn.sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
    else if(params.sortBy==='name') toysToReturn.sort((a,b)=>a.name.localeCompare(b.name))
    return Promise.resolve(toysToReturn);
}

function getById(id) {
    const toy = toys.find(toy => toy._id === id)
    return Promise.resolve(toy);
}

function remove(id) {
    const idx = toys.findIndex(toy => toy._id === id)
    if (idx === -1) return Promise.reject('something went wrong')
    toys.splice(idx, 1)
    _saveToFile()
    return Promise.resolve()
}

function save(toy) {
    if (toy._id) {
        const idx = toys.findIndex(dbToys => dbToys._id === toy._id)
        toys[idx] = { ...toys[idx], ...toy };
    } else {
        toy.createdAt = new Date().toJSON()
        toy._id = _makeId()
        toys.unshift(toy)
    }
    _saveToFile()
    return Promise.resolve(toy)
}

function _saveToFile() {
    return new Promise((resolve, reject) => {
        const str = JSON.stringify(toys, null, 2);
        fs.writeFile('data/toy.json', str, function (err) {
            if (err) {
                console.log('Had Problems', err)
                return reject(new Error('Cannot update User file'));
            }
            resolve()
        });
    });
}

function _makeId(length = 5) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}