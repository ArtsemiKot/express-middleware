function isValidUserId(req, res, next) {
    const { id } = req.params;

    if (!id) throw new Error('Значение ID не может быть пустым');
    if (isNaN(id)) throw new Error('Значение ID не может быть строкой');

    next();
}

function isValidUserData(req, res, next) {
    const { name, surname, email, pwd } = req.body;

    if (!name) throw new Error('Значение nsme пустое');
    if (!surname) throw new Error('Значение surname пустое');
    if (!email) throw new Error('Значение email пустое');
    if (!pwd) throw new Error('Значение пароля пустое');
    if (!isNaN(name)) throw new Error('Значение name не может быть числом');
    if (!isNaN(surname)) throw new Error('Значение surname не может быть числом');
    if (!/^[a-zA-Z0-9\.\-\_]+@[a-z]+\.[a-z]+$/gm.test(email)) throw new Error('Не корректная почта');
    if (pwd.length < 8) throw new Error ('pwd менее 8 символов');

     next();
}
module.exports = { isValidUserId, isValidUserData };