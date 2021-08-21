import { routes } from '@config/app.routes';
import { NotFoundException } from '@core/exceptions';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { UserMongooseRepository } from '@modules/user/database/user.mongoose-repository';
import { UserResponse } from '@modules/user/dtos/user.response.dto';
import { Body, Controller, Get } from '@nestjs/common';
import { UseInterceptors } from '@nestjs/common/decorators/core';

import { FindUserByEmailRequest } from './find-user-by-email.request.dto';

@Controller()
export class FindUserByEmailHttpController {
  constructor(private readonly userRepo: UserMongooseRepository) {}

  /* Since this is a simple query with no additional business
     logic involved, it bypasses application's core completely 
     and retrieves user directly from repository.
   */
  @Get(routes.user.root)
  @UseInterceptors(ExceptionInterceptor)
  async findByEmail(
    @Body() { email }: FindUserByEmailRequest,
  ): Promise<UserResponse | { not: string }> {
    const user = await this.userRepo.findOneByEmailOrUndefined(email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    /* Returning a Response class which is responsible
       for whitelisting data that is sent to the user */
    return new UserResponse(user);
  }
}
