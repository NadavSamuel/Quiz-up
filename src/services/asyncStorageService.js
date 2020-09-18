

export default {
    query,
    get,
    post,
    put,
    remove,
}

function query(entityType,filterBy={}) {
    console.log("query -> filterBy", filterBy)
    
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    console.log(entities);
    if(!filterBy) return Promise.resolve(entities);
    if(filterBy.title)return Promise.resolve(entities.filter(entitie=>entitie.title.toLowerCase().includes(filterBy.title.toLowerCase()) ));
    else return Promise.resolve(entities);
}




function get(entityType, entityId) {
    console.log("get -> entityType, entityId", entityType, entityId)
    return query(entityType)
        .then(entities => entities.find(entity => entity._id === entityId))
}
function post(entityType, newEntity) {    
    newEntity._id = _makeId()
    return query(entityType)
        .then(entities => {
            entities.unshift(newEntity);
            _save(entityType, entities)
            return newEntity;
        })
}



function put(entityType, updatedEntity) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === updatedEntity._id);
            entities.splice(idx, 1, updatedEntity)
            _save(entityType, entities)
            return updatedEntity;
        })
}

function remove(entityType, entityId) {
    return query(entityType)
        .then(entities => {
            const idx = entities.findIndex(entity => entity._id === entityId);
            entities.splice(idx, 1)
            _save(entityType, entities)
        })
}


function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}