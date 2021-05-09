import {Controller, Get, Inject,} from '@tsed/common';
import {UserRepository} from '../repositories/user';

@Controller('/hello')
export class HelloCtrl {
  @Inject()
  userRepository: UserRepository;

  @Get('/')
  async count(): Promise<string> {
    const count = await this.userRepository.count();
    return `User count is ${count}`;
  }
}
  