export default (req: any, res: any, next: any) => {
  req.body.img = req.file.path;
  req.body.name = JSON.parse(req.body.name);
  req.body.addresses = JSON.parse(req.body.addresses);
  next();
};
