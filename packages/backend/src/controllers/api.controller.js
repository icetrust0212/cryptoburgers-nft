const Burger = require("../model").burger;

exports.getMetadata = (req, res) => {
    let user_id = req.params.id;
    Burger.findById(user_id)
    .exec((err, user) => {
        if (err) {
            res.status(500).send({
                message: err,
                success: false,
            });
            return;
        }

        if (!user) {
            return res.status(404).send({
                message: "User Not found.",
                success: false,
            });
        }
        res.status(200).send({
            user,
            success: true,
        });
    });
}