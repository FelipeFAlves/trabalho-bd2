import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BrandingsService } from './brandings.service';
import { CreateBrandingDto } from './dto/create-branding.dto';
import { UpdateBrandingDto } from './dto/update-branding.dto';

@Controller('brandings')
export class BrandingsController {
  constructor(private readonly brandingsService: BrandingsService) {}

  @Post()
  create(@Body() createBrandingDto: CreateBrandingDto) {
    return this.brandingsService.create(createBrandingDto);
  }

  @Get()
  findAll() {
    return this.brandingsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.brandingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBrandingDto: UpdateBrandingDto) {
    return this.brandingsService.update(+id, updateBrandingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.brandingsService.remove(+id);
  }
}
