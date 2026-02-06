import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { ColumnType } from 'generated/prisma/enums';
import { ReorderTasksDto } from './dto/reorderTasks.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@Body() dto: CreateTaskDto) {
        return this.tasksService.create(dto);
    }

    @Patch('reorder')
    reorder(@Body() dto: ReorderTasksDto) {
        return this.tasksService.reorderTasks(dto);
    }

    @Get()
    getByBoard(@Query('boardId') boardId: string) {
        return this.tasksService.findByBoardId(boardId);
    }

    @Get('column/:type')
    getByType(@Param('type') type: ColumnType) {
        return this.tasksService.findByType(type);
    }

    @Get(':id')
    getTask(@Param('id') id: string) {
        return this.tasksService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateTaskDto ) {
        return this.tasksService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }
}