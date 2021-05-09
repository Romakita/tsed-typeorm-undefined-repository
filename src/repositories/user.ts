import {EntityRepository, Repository} from 'typeorm';
import {User} from '../entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  findByID(id: string): Promise<User | undefined> {
    return this.findOne(id);
  }
}
  