const Contact = require('../models/Contact')
const ContactController = {
    create: async(req, res, next) => {
        let name = req.body.name || ''
        let mail = req.body.mail || ''
        let subject = req.body.subject || ''
        let additional = req.body.additional || ''
        //console.log(req.body);
        let ContactData = await Contact.create({
            name: name,
            mail: mail,
            subject: subject,
            additional: additional
        })
        res.json(ContactData);

    }
}

module.exports = ContactController