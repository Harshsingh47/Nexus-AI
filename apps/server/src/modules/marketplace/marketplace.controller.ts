import { Controller, Get, Post, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { MarketplaceService } from './marketplace.service';

@ApiTags('Marketplace')
@Controller('marketplace')
export class MarketplaceController {
  constructor(private readonly marketplaceService: MarketplaceService) {}

  @Get()
  @ApiOperation({ summary: 'List all marketplace agents and templates' })
  async getMarketplaceItems() {
    return this.marketplaceService.getMarketplaceItems();
  }

  @Post('install/:id')
  @ApiOperation({ summary: 'Install agent or workflow template into workspace' })
  async installItem(@Param('id') id: string) {
    return this.marketplaceService.installItem(id);
  }
}
