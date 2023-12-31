import { Controller, Get, Post, Body, Patch, Param, Delete , Query } from '@nestjs/common';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  // @Post()
  // create(@Body() createChannelDto: CreateChannelDto) {
  //   return this.channelsService.create(createChannelDto);
  // }

  @Get()
  findAll() {
    console.log('aaaa')
    return this.channelsService.findAll();
  }

  @Get('search')
  async searchVideos(@Query() query: any) {
    try {
      const result = await this.channelsService.searchChannels(query);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: 'Erro ao buscar dados.' };
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.channelsService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
  //   return this.channelsService.update(+id, updateChannelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.channelsService.remove(+id);
  // }
}