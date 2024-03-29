module.exports = (Users, Boards, rndString) => {
  let user_params = ['id', 'passwd', 'name', 'phone_number', "business_reg_number"];
  const balju_params = ['business_name']
  const oder_params = ['accept_height', 'business_start_day', 'business_area']
  const boards_params = ['title', 'contents'];

  Users.pre('save', async function (next) {
    let user = this;
    let check_param;
    let result; //파라미터가 있는지 확인하여 넣을 

    if (user.type) {
      check_param = await oder_params.every(str => user.hasOwnProperty(str));

      if (check_param)
        next(new paramsError("wrong param"));

      user_params += balju_params;
    } else {
      if (user.hasOwnProperty(balju_params[0]))
        next(new paramsError("wrong param"));
      user_params += oder_params;
    }

    result = await user_params.every(str => user.hasOwnProperty(str) && user[str] != null && user[str].length > 0);

    if (!result)
      next(new paramsError("param missing or null"));
    else {
      this.token = this.generateToken();
      next(this);
    }
  });

  Users.post('save', (error, res, next) => {
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if (error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Users.post('update', (error, res, next) => {
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if (error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Boards.pre('save', async function (next, done) {
    const boards = this;
    const result = await boards_params.every(str => boards[str] != undefined && boards[str] != null && boards[str].length > 0);
    if (!result) done(new paramsError("param missing or null"));
    this.board_id = this.generateToken();
    next(this);
  });

  Users.method('generateToken', () => {
    return rndString.generate(); //토큰 생성
  });

  Boards.method('generateToken', () => {
    return rndString.generate(); //토큰 생성
  });

}
