const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Device = mongoose.model('Device')

router.get('/', (req, res) => {
    res.render("device/addOrEdit", {
        viewTitle: "Add Smart Device "
    });
});

router.post('/', async(req, res, next) => {
  
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


async function insertRecord(req, res) {

    var device = new Device();
    device.deviceName = req.body.deviceName;
    device.macAddress = req.body.macAddress;
    device.manufacturer = req.body.manufacturer;
    device.modelNo = req.body.modelNo;
    device.save((err, doc) => {
        if (!err)
            res.redirect('device/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("device/addOrEdit", {
                    viewTitle: "Add Smart Device",
                    device: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });

    

}

function updateRecord(req, res) {
    Device.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('device/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("device/addOrEdit", {
                    viewTitle: 'Update Smart Device',
                    device: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Device.find((err, docs) => {
        if (!err) {
               console.log("All the device " , docs);
            res.render("device/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving device list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'deviceName':
                body['deviceNameError'] = err.errors[field].message;
                break;
            case 'macAddress':
                body['macAddressError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Device.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("device/addOrEdit", {
                viewTitle: "Update Smart Device",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Device.findOneAndDelete(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/device/list');
        }
        else { console.log('Error in device delete :' + err); }
    });
});

module.exports = router;