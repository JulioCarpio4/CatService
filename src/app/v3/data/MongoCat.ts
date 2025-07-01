import { ObjectId } from 'mongodb';

export default class MongoCat {
  constructor(
    public firstName: string,
    public lastName: string,
    public colorType: string,
    public age: number,
    public nicknames?: string[],
    public favoriteMeals?: string[],
    public externalId?: string,
    public id?: ObjectId,
  ) {}
}
