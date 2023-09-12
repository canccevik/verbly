import { Injectable } from '@nestjs/common'
import { BaseAuthGuard } from './base-auth.guard'
import { LOCAL_STRATEGY } from '../passport/strategies'

@Injectable()
export class LocalAuthGuard extends BaseAuthGuard(LOCAL_STRATEGY) {}
