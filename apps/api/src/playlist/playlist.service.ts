import { Injectable } from '@nestjs/common';
import { Playlist, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PlaylistService {
  constructor(private prisma: PrismaService) {}

  async playlist(
    playlistWhereUniqueInput: Prisma.PlaylistWhereUniqueInput
  ): Promise<Playlist | null> {
    return this.prisma.playlist.findUnique({
      where: playlistWhereUniqueInput,
    });
  }

  async playlists(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.PlaylistWhereUniqueInput;
    where?: Prisma.PlaylistWhereInput;
    orderBy?: Prisma.PlaylistOrderByWithRelationInput;
  }): Promise<Playlist[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.playlist.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createPlaylist(data: Prisma.PlaylistCreateInput): Promise<Playlist> {
    return this.prisma.playlist.create({
      data,
    });
  }

  async updatePlaylist(params: {
    where: Prisma.PlaylistWhereUniqueInput;
    data: Prisma.PlaylistUpdateInput;
  }): Promise<Playlist> {
    const { data, where } = params;
    return this.prisma.playlist.update({
      data,
      where,
    });
  }

  async deletePlaylist(
    where: Prisma.PlaylistWhereUniqueInput
  ): Promise<Playlist> {
    return this.prisma.playlist.delete({
      where,
    });
  }
}
