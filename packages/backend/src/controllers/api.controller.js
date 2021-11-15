const Burger = require("../model").burger;

exports.getMetadata = (req, res) => {
    let tokenId = req.params.id;
    Burger.find({tokenId: tokenId})
    .exec((err, burger) => {
        
        if (err) {
            res.status(500).send({
                message: err,
                success: false,
            });
            return;
        }

        if (!burger) {
            return res.status(404).send({
                message: "burger Not found.",
                success: false,
            });
        }
        res.status(200).send({
            burger,
            success: true,
        });
    });
}

exports.getBurgers = (req, res) => {
    const {tokenIds} = req.query;
    Burger.find({tokenId: {$in: tokenIds}}).exec((err, burgers) => {
        console.log('error: ', err);
        console.log('burgers: ', burgers);

        if (err) {
            res.status(500).send({
                message: err,
                success: false,
            });
            return;
        }

        if (!burgers) {
            return res.status(404).send({
                message: "burger Not found.",
                success: false,
            });
        }
        
        res.status(200).send({
            burgers,
            success: true,
        });
    })
}