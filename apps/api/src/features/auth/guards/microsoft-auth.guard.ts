import { Injectable } from '@nestjs/common'
import { BaseAuthGuard } from './base-auth.guard'
import { MICROSOFT_STRATEGY } from '../passport/strategies'

@Injectable()
export class MicrosoftAuthGuard extends BaseAuthGuard(MICROSOFT_STRATEGY) {}
