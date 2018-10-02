module.exports = (Users, Boards,rndString)=>{
  var user_params = ['id', 'passwd', 'name'];
  var forbid = ['is_admin'];
  var boards_params = ['title', 'contents'];

  Users.pre('save', async function(next, done){
    const user = this;
    const result = await user_params.every(str => user[str] != undefined && user[str] != null && user[str].length > 0);
    const has_forbid = await forbid.every(str => user[str] != undefined && user[str] != null && user[str].length > 0);
    if(has_forbid) done(new paramsError("admin params include"));
    if(!result) done(new paramsError("param missing or null"));
    this.token = this.generateToken();
    next(this);
  });

  Users.post('save', (error, res, next)=>{
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Users.post('update', (error, res, next)=>{
    if (error.name === 'MongoError' && error.code === 11000) next(new user_duplicate("duplicate error"));
    else if(error.name === "ValidationError") next(new ValidationError(error.message));
    else next(error);
  });

  Boards.pre('save', async function(next, done){
    const boards = this;
    const result = await boards_params.every(str => boards[str] != undefined && boards[str] != null && boards[str].length > 0);
    if(!result) done(new paramsError("param missing or null"));
    this.board_id = this.generateToken();
    next(this);
  });

  Users.method('generateToken', ()=>{
    return rndString.generate(); //토큰 생성
  });

  Boards.method('generateToken', ()=>{
    return rndString.generate(); //토큰 생성
  });

}
