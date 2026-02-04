import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class BoardsService {
  constructor(private prisma: PrismaService) {}

  create(name: string) {
    return this.prisma.board.create({
      data: {
        name,
        tasks: {

        },
      },
    });
  }

  findById(id: string) {
    return this.prisma.board.findUnique({
      where: { id },
      include: { tasks: true },
    });
  }

  delete(id: string) {
    return this.prisma.board.delete({
      where: { id },
    });
  }
}
