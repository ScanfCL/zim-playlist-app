import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { MusicService } from './music.service';
import { Music as MusicModel } from '@prisma/client';

@Controller()
export class MusicController {
  constructor(private readonly musicService: MusicService) {}

  @Get('music/:id')
  async getPostById(@Param('id') id: string): Promise<MusicModel> {
    return this.musicService.music({ id: Number(id) });
  }

  @Post('music')
  async createMusic(
    @Body()
    musicData: {
      title: string;
      artist: string;
      album: string;
      duration: number;
      musicUrl: string;
    }
  ): Promise<MusicModel> {
    return this.musicService.createMusic(musicData);
  }

  @Post('music-update')
  async updateDraft(
    @Body()
    musicData: {
      id: number;
      title: string;
      artist: string;
      album: string;
      duration: number;
      musicUrl: string;
    }
  ): Promise<MusicModel> {
    const { id, ...music } = musicData;

    return this.musicService.updateMusic({
      where: { id },
      data: music,
    });
  }

  @Delete('music/:id')
  async deleteMusic(@Param('id') id: string): Promise<MusicModel> {
    return this.musicService.deleteMusic({ id: Number(id) });
  }
}
