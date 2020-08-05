const { User } = require('../models');

class NullUser {
    isValid() { return false; }
    setPassword() { }
    isValidPassword() { return false; }
    toSafeObject() { return {}; }
}

const create = async details => {
    const user = await User.build(details);
    user.setPassword(details.password);
    return await user.save();
}

const findByEmail = async email => {
    const user = await User.findOne({ where: { email } })
    return user || new NullUser();
}

const findByTokenId = async tokenId => {
    const user = await User.findOne({ where: { tokenId } });
    return user || new NullUser();
}

module.exports = {
    create,
    findByEmail,
    findByTokenId
}