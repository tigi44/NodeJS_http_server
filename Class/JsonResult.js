class JsonResult {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  json() {
     return {"code": this.code, "message": this.message};
  }

  json(data) {
     return {"code": this.code, "message": this.message, "data": data};
  }

  static success() {
    const success = new JsonResult(0, "success")
    return success
  }

  static fail(message) {
    const fail = new JsonResult(-1, message ? message : "fail")
    return fail
  }
}

module.exports = JsonResult;
