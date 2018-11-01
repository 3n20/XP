let express              = require('express');
let router               = express.Router();
//var Validation = require('./clients/watson/validation/validation');
let salesForceController = require('../../../clients/salesforce/controller/salesforce');
router.post('/salesforce/sendEmailToCase', salesForceController.getConversation, salesForceController.sendEmailToCase, salesForceController.endConversation, salesForceController.updateUserContext,  function (req, res) {
    res.send(res.result);
});
module.exports = router;