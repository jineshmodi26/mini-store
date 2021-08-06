const getUniqueErrorMessage = (err) => {
    let output
    try {
        let fieldName = Object.keys(err.keyPattern)[0]
        output = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ' Already Exists'
    } catch (ex) {
        output = 'Unique Field Already Exists'
    }

    return output
}

const getError = (err) => {

    let message = ''

    if(err.code){
        switch (err.code) {
            case 11000:
            case 11001:
                message = getUniqueErrorMessage(err)
                break
            default:
                message = 'Something went wrong'
        }
    }else{
        for (let errName in err.errors) {
            if (err.errors[errName].message) 
                message = err.errors[errName].message
        }
    }

    console.log(message)

    return message
}

module.exports = getError