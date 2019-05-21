export class Users {
  constructor(
    public id: string,
    public name: string,
    public type: string,
    public room: string,
    public userId: string,
    public rooms?: string[]
  ) {}
}
