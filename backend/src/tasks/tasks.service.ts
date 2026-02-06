import { Injectable } from '@nestjs/common';
import { ColumnType, Prisma, Task } from 'generated/prisma/client';
import { PrismaService } from 'src/prisma.service';
import {CreateTaskDto } from 'src/tasks/dto/createTask.dto'
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ReorderTasksDto } from './dto/reorderTasks.dto';

@Injectable()
export class TasksService {
    constructor(private prisma: PrismaService) {}

    async create(dto: CreateTaskDto): Promise<Task> {
        return this.prisma.$transaction(async tx => {
            await tx.task.updateMany({
                where: {
                    boardId: dto.boardId,
                    type: ColumnType.TODO,
                },
                data: {
                    position: {increment: 1},
                },
            });
            return tx.task.create({
                data: {
                    title: dto.title,
                    description: dto.description,
                    position: 0,
                    type: ColumnType.TODO,
                    board: {
                        connect: {id: dto.boardId},
                    }
                },
            });
        });
    }

    update(id: string, dto: UpdateTaskDto): Promise<Task> {
        const data: Prisma.TaskUpdateInput = {
            title: dto.title,
            description: dto.description,
            position: dto.position,
            type: dto.type,
        };

        return this.prisma.task.update({
            where: {id},
            data,
        });
    }

    async delete(id: string): Promise<Task> {
        return this.prisma.$transaction(async tx => {
            const task = await tx.task.findUnique({
                where: {id}
            });

            if(!task)
                throw new Error("Task doesnt exist");

            await tx.task.delete({
                where: {id}
            });

            await tx.task.updateMany({
                where: {
                    boardId: task.boardId,
                    type: task.type,
                    position: {gt: task.position}
                },
                data: {
                    position: {decrement: 1}
                }
            });
            return task;
        });
    }

    findByBoardId(boardId: string): Promise<Task[]> {
        return this.prisma.task.findMany({
            where: { boardId },
            orderBy: { position: 'asc' },
        });
    }

    findById(id: string): Promise<Task | null> {
        return this.prisma.task.findUnique({
            where: { id },
        });
    }

    findByType(type: ColumnType): Promise<Task[] | null> {
        return this.prisma.task.findMany({
            where: { type },
            orderBy: { position: 'asc' },
        });
    }

    async reorderTasks(dto: ReorderTasksDto): Promise<void> {
        const updates = dto.tasks.map(task =>
            this.prisma.task.update({
            where: { id: task.id },
            data: { position: task.position,
                type: task.type
             },
            }),
        );

        await this.prisma.$transaction(updates);
    }

}