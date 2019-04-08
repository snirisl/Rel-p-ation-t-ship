export class Request {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public imgUrl: string,
    public status: string,
    public date: Date
  ) {}
}
