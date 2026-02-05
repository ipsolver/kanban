import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Post()
    create(@Body() dto: CreateBoardDto) {
        return this.boardsService.create(dto);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.boardsService.findById(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBoardDto) {
        return this.boardsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.boardsService.delete(id);
    }
}
