const Contact = require('../models/Contact')
const ContactController = {
    create: async(req, res, next) => {
        let name = req.body.name || ''
        let mail = req.body.mail || ''
        let subject = req.body.subject || ''
        let additional = req.body.additional || ''
        //console.log(req.body);
        let Contact = await Contact.create({
            name: name,
            mail: mail,
            subject: subject,
            additional: additional
        })
        res.json(Contact);

    }
}

module.exports = ContactController