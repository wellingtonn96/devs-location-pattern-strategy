const devsValidation = (req, res, next) => {
    const { github_username, techs, latitude, longitude } = req.body
    
    if(!github_username) res.status(401).json({ message: 'campo github_username invalido'})
    if(!techs) res.status(401).json({ message: 'campo techs invalido'})
    if(!latitude) res.status(401).json({ message: 'campo latitude invalido'})
    if(!longitude) res.status(401).json({ message: 'campo longitude invalido'})

    next()
}

module.exports = devsValidation