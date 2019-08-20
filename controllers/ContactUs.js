const Contact = require('../models/Contact')
const ContactController = {
    create: async(req, res, next) => {
        let name = req.body.name || ''
        let mail = req.body.mail || ''
        let subject = req.body.subject || ''
        let additional = req.body.additional || ''
        let organisation = req.body.organisation || ''
        let type = req.body.type || ''
        //console.log(req.body);
        let ContactData = await Contact.create({
            name: name,
            mail: mail,
            subject: subject,
            additional: additional,
            organisation: organisation,
            type:type
        })
        res.json(ContactData)
    }
}

module.exports = ContactController