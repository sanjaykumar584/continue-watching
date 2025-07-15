import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetContinueWatchingQuery } from './get-continue-watching.query';
import { ContinueWatchingService } from '../continue-watching.service';

@QueryHandler(GetContinueWatchingQuery)
export class GetContinueWatchingHandler implements IQueryHandler<GetContinueWatchingQuery> {
  constructor(private readonly continueWatchingService: ContinueWatchingService) {}

    async execute(query: GetContinueWatchingQuery): Promise<any> {
      console.log("inside query handler")
    return this.continueWatchingService.getContinueWatchingFromES(query.username);
  }
}
