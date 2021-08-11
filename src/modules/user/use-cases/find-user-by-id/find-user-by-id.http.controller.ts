import {ID} from '@core/value-objects/id.value-object';
import {routes} from '@infrastructure/configs/app.routes';
import {UserMongooseRepository} from '@modules/user/database/user.mongoose-repository';
import {UserResponse} from '@modules/user/dtos/user.response.dto';
import {Controller} from '@nestjs/common/decorators';
import {Get, Param} from '@nestjs/common/decorators/http';

@Controller()
export class FindUserByIdHttpController {
  constructor(private readonly userRepo: UserMongooseRepository) {}

  @Get(routes.user.get)
  async findById(
    @Param('id') id: string,
  ): Promise<UserResponse | { not: string }> {
    const user = await this.userRepo.findOne({ id: new ID(id) });
    if (!user) {
      return { not: 'found' };
    }

    return new UserResponse(user);
  }
}
