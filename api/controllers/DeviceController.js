/**
 * DeviceController
 *
 * @description :: Server-side logic for managing devices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	change: function (req, res) {
		Device.update({id: req.param('devId')},{
			x: req.param('x'),
			y: req.param('y')
		}).exec(function(err, updatedDevice) {
			if (err) {
				return res.serverError(err);
			}

			return res.ok(updatedDevice);
		});
	},
	socket: function (req, res) {
			sails.log.debug("Hi!");
			if (req.isSocket == true) {
					Device.find().exec(function(err, devices) {
							Device.subscribe(req.socket, devices);
					});
			}
	},
	afterUpdate: function(updatedRecord, cb) {
			sails.log.debug('test');
			Device.publishUpdate(updatedRecord.id, updatedRecord, req);
	}
};
