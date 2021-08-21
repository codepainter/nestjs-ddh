import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ConflictException, DomainException, ExceptionBase, NotFoundException } from '@exceptions';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import {
  ConflictException as NestConflictException,
  ForbiddenException as NestForbiddenException,
  InternalServerErrorException as NestInternalServerErrorException,
  NotFoundException as NestNotFoundException,
} from '@nestjs/common/exceptions';

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((err) => {
        if (err instanceof DomainException) {
          throw new NestForbiddenException(err.message);
        }
        if (err instanceof NotFoundException) {
          throw new NestNotFoundException(err.message);
        }
        if (err instanceof ConflictException) {
          throw new NestConflictException(err.message);
        }
        throw new NestInternalServerErrorException('Unknown Error');
      }),
    );
  }
}
