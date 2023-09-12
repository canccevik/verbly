import { Injectable } from '@nestjs/common'
import { BaseAuthGuard } from './base-auth.guard'
import { FACEBOOK_STRATEGY } from '../passport/strategies'

@Injectable()
export class FacebookAuthGuard extends BaseAuthGuard(FACEBOOK_STRATEGY) {}
