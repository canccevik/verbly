import { Injectable } from '@nestjs/common'
import { BaseAuthGuard } from './base-auth.guard'
import { GOOGLE_STRATEGY } from '../passport/strategies'

@Injectable()
export class GoogleOAuthGuard extends BaseAuthGuard(GOOGLE_STRATEGY) {}
