const { ObjectID } = require('mongodb');
const { ISP } = require('../model/ISP');

const insertIsp = async (userObject) => {
    try {

        let ispData = new ISP(userObject);
        let data = await ispData.save();

        if (data.nInserted === 0) {
            return {
                message: 'ISP Insertion Failed',
                status: "ERROR"
            }
        } else {
            return {
                message: 'ISP Insertion Successful',
                status: "OK"
            };
        }
    } catch (e) {
        return {
            message: e.message,
            status: "ERROR"
        };
    }
};


const findIspByQuery = async (query, option) => {
    try {


        let data = await ISP.findOne(query);

        if (data) {
            return {
                data,
                message: 'ISP Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'ISP Not Found',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            data: null,
            message: e.message,
            status: 'ERROR'
        };
    }
};



const findAllIspByQuery = async (query, option) => {
    try {


        let data = await ISP.find(query);

        if (data) {
            return {
                data,
                message: 'ISP Found',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: 'ISP Not Found',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            data: null,
            message: e.message,
            status: 'ERROR'
        };
    }
};



const findByIdAndUpdate = async (id, update) => {

    try {
        let data = await ISP.findByIdAndUpdate(id, update);

        if (data) {
            return {
                data,
                message: ' Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: ' Update Failed',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            data: null,
            message: e.message,
            status: 'ERROR'
        };
    }


}



const UpdateOne = async (id, update) => {

    try {
        let data = await ISP.updateOne(id, update);

        if (data) {
            return {
                data,
                message: ' Update Successful',
                status: 'OK'
            }
        } else {
            return {
                data: null,
                message: ' Update Failed',
                status: 'ERROR'
            };
        }

    } catch (e) {
        return {
            data: null,
            message: e.message,
            status: 'ERROR'
        };
    }


}



module.exports = {
    insertIsp,
    findIspByQuery,
    findByIdAndUpdate,
    findAllIspByQuery,
    UpdateOne
}