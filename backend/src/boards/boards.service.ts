import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Board, Prisma } from '../../generated/prisma/client';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateBoardDto): Promise<Board> {
    const data: Prisma.BoardCreateInput = {
      name: dto.name,
    };
    return this.prisma.board.create({ data });
  }

  update(id: string, dto: UpdateBoardDto): Promise<Board> {
    const data: Prisma.BoardUpdateInput = { name: dto.name };
    return this.prisma.board.update({
      where: { id },
      data,
    });
  }

  findById(id: string): Promise<Board | null> {
    return this.prisma.board.findUnique({
      where: { id },
      include: {
        tasks: {
          orderBy: { position: 'asc' },
        },
      },
    });
  }

  delete(id: string) {
    return this.prisma.board.delete({
      where: { id },
    });
  }
}
