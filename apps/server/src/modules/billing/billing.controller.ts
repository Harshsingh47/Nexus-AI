import { Controller, Get, Post, Body, Request } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { BillingService } from './billing.service';
import { SubscriptionPlanTier } from '@nexusmind/shared';

@ApiTags('Billing & Subscriptions')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @Get('plans')
  @ApiOperation({ summary: 'Get all available subscription plans' })
  async getPlans() {
    return this.billingService.getSubscriptionPlans();
  }

  @Get('balance')
  @ApiOperation({ summary: 'Get user credit balance and daily refresh status' })
  async getBalance() {
    return this.billingService.getUserCreditBalance('usr-demo-admin-01');
  }

  @Post('subscribe')
  @ApiOperation({ summary: 'Subscribe to Weekly, Monthly, Yearly, or Enterprise tier' })
  async subscribe(@Body() body: { planTier: SubscriptionPlanTier }) {
    return this.billingService.upgradeSubscription('usr-demo-admin-01', body.planTier);
  }
}
