import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { Query } from '@nestjs/common';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Get()
  findAll(@Query() queryParams: any) {
    return this.videosService.findAll(queryParams);
  }

  // @Get()
  // findAll() {
  //   return this.videosService.findAll();
  // }

  // @Get('id/:id')
  // findOne(@Param('id') id: string) {
  //   return this.videosService.findOne(id);
  // }

  // @Get('publishedAt/:id')
  // findPubli(@Param('id') id: string) {
  //   return this.videosService.findPubli(id);
  // }

  // @Get('channelId/:id')
  // findChannel(@Param('id') id: string) {
  //   return this.videosService.findChannel(id);
  // }

  // @Get('title/:id')
  // findTitle(@Param('id') id: string) {
  //   return this.videosService.findTitle(id);
  // }

  // @Get('description/:id')
  // findDescription(@Param('id') id: string) {
  //   return this.videosService.findDescription(id);
  // }

  // @Get('shortId/:id')
  // findShortId(@Param('id') id: string) {
  //   return this.videosService.findShortId(id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videosService.remove(+id);
  }
}
