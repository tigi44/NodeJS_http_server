function JsonResult(code, message) {
 this.code = code;
 this.message = message;
};

var proto = JsonResult.prototype;

proto.setCode = function(code){
 this.code = code;
};

proto.getCode = function() {
 return this.code;
};

proto.setMessage = function(message) {
 this.message = message;
};

proto.getMessage = function() {
 return this.message;
};

proto.json = function () {
   return {"code": this.code, "message": this.message};
};

module.exports = JsonResult;
