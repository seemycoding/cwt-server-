const Contact = require("../models/Contact");
const ContactController = {
  index: async (req, res, next) => {
    let contact = await Contact.find();
    if (req.params.id == 1) {
      let mess=req.query.message;
      res.render("pages/contactus", { data: contact, message: mess});
    } else {
      res.json(contact);
    }
  },
  deleteById: async (req, res, next) => {
    let contact = await Contact.find();
    Contact.deleteOne({
      _id: req.params.id
    })
      .then(result => {
        console.log(result);
        if (result.n > 0) {
          res.redirect('/contactus/1/?message=Contact deleted successfully')
          //mess;
          // res.render("pages/contactus", {
          //   message: "Contact Deleted!",
          //   data: contact
          // });
        }
      })
      .catch(error => {
        res.status(500).json({
          message: "Could not delete contact",
          error: error
        });
      });
  },
  create: async (req, res, next) => {
    
    let name = req.body.name || "";
    let mail = req.body.mail || "";
    let subject = req.body.subject || "";
    let additional = req.body.additional || "";
    let organisation = req.body.organisation || "";
    let type = req.body.type || "";
    //console.log(req.body);
    let ContactData = await Contact.create({
      name: name,
      mail: mail,
      subject: subject,
      additional: additional,
      organisation: organisation,
      type: type
    });
    res.json(ContactData);
  },
  //send mail function
};

module.exports = ContactController;
