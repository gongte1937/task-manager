import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/user.entity';

@ApiTags('tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  create(@Body() createTaskDto: CreateTaskDto, @CurrentUser() user: User) {
    return this.tasksService.create(createTaskDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks for current user' })
  findAll(@CurrentUser() user: User) {
    return this.tasksService.findAll(user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  findOne(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.findOne(id, user);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @CurrentUser() user: User
  ) {
    return this.tasksService.update(id, updateTaskDto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.tasksService.remove(id, user);
  }
}
