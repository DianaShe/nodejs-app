const getCuttent = async(req, res) =>{
    const {email, subscription} = req.user

    res.status(200).json({
        email,
        subscription,
    })
}

module.exports = getCuttent