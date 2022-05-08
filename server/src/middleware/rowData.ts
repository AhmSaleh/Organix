export default (req: any, res: any, next: any) => {
  if (req.file) req.body.img = req.file.path;
  if (req.body.name) req.body.name = JSON.parse(req.body.name);
  if (req.body.addresses) req.body.addresses = JSON.parse(req.body.addresses);
  next();
};
