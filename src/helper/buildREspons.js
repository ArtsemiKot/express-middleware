function buildRespons(response, code, message){
response.status(code).send(message)
};

module.exports = {buildRespons};