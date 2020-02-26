const Yup = require('yup')

const devsValidation = async (req, res, next) => {
    const schema = Yup.object().shape({
        github_username: Yup.string().required(),
        techs: Yup.string().required(),
        latitude: Yup.number().required().min(10),
        longitude: Yup.number().required().min(10)
    })
    
    if (!(await schema.isValid(req.body))) {
        return res.status(401).json({ error: 'Validation is failed !' });
    }

    next()
}

module.exports = devsValidation