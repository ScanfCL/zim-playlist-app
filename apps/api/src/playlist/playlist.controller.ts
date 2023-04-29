import { Controller, Get, Param, Post, Body, Delete } from '@nestjs/common';
import { PlaylistService } from './playlist.service';
import { Playlist as PlaylistModel } from '@prisma/client';

@Controller()
export class PlaylistController {
  constructor(private readonly playlistService: PlaylistService) {}

  @Get('playlist/:id')
  async getPostById(@Param('id') id: string): Promise<PlaylistModel> {
    return this.playlistService.playlist({ id: Number(id) });
  }

  @Post('playlist')
  async createPlaylist(
    @Body()
    playlistData: {
      name: string;
    }
  ): Promise<PlaylistModel> {
    const { name } = playlistData;
    return this.playlistService.createPlaylist({
      name,
    });
  }

  @Post('playlist-update')
  async updateDraft(
    @Body()
    playlistData: {
      id: number;
      name: string;
    }
  ): Promise<PlaylistModel> {
    const { name, id } = playlistData;
    return this.playlistService.updatePlaylist({
      where: { id },
      data: {
        name,
      },
    });
  }

  @Delete('playlist/:id')
  async deletePlaylist(@Param('id') id: string): Promise<PlaylistModel> {
    return this.playlistService.deletePlaylist({ id: Number(id) });
  }
}
