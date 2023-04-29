import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PlaylistMusicService } from './playlist-music.service';
import { PlaylistMusic as PlaylistMusicModel } from '@prisma/client';

@Controller()
export class PlaylistMusicController {
  constructor(
    private readonly playlistPlaylistMusicService: PlaylistMusicService
  ) {}

  @Get('playlistPlaylistMusic/:id')
  async getPlaylistMusicById(
    @Param('id') id: string
  ): Promise<PlaylistMusicModel[]> {
    return this.playlistPlaylistMusicService.playlistMusics({
      where: {
        playlistId: Number(id),
      },
    });
  }

  @Post('playlistPlaylistMusic')
  async createPlaylistMusic(
    @Body()
    playlistMusicData: {
      playlistId: number;
      musicId: number;
    }
  ): Promise<PlaylistMusicModel> {
    return this.playlistPlaylistMusicService.createPlaylistMusic({
      playlist: {
        connect: {
          id: Number(playlistMusicData.playlistId),
        },
      },
      music: {
        connect: {
          id: Number(playlistMusicData.musicId),
        },
      },
    });
  }

  @Delete('playlistPlaylistMusic/:id')
  async deletePlaylistMusic(
    @Param('id') id: string
  ): Promise<PlaylistMusicModel> {
    return this.playlistPlaylistMusicService.deletePlaylistMusic({
      id: Number(id),
    });
  }
}
