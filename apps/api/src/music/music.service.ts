import { Injectable } from '@nestjs/common';
import { Music, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MusicService {
  constructor(private prisma: PrismaService) {}

  async music(
    musicWhereUniqueInput: Prisma.MusicWhereUniqueInput
  ): Promise<Music | null> {
    return this.prisma.music.findUnique({
      where: musicWhereUniqueInput,
    });
  }

  async musics(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.MusicWhereUniqueInput;
    where?: Prisma.MusicWhereInput;
    orderBy?: Prisma.MusicOrderByWithRelationInput;
  }): Promise<Music[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.music.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createMusic(data: Prisma.MusicCreateInput): Promise<Music> {
    return this.prisma.music.create({
      data: { ...data, createdDate: new Date() },
    });
  }

  async updateMusic(params: {
    where: Prisma.MusicWhereUniqueInput;
    data: Prisma.MusicUpdateInput;
  }): Promise<Music> {
    const { data, where } = params;
    return this.prisma.music.update({
      data,
      where,
    });
  }

  async deleteMusic(where: Prisma.MusicWhereUniqueInput): Promise<Music> {
    return this.prisma.music.delete({
      where,
    });
  }
}
