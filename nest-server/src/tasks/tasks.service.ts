import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { User } from '../users/user.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>
  ) {}

  async create(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      userId: user.id,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(user: User): Promise<Task[]> {
    return this.tasksRepository.find({
      where: { userId: user.id },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, user: User): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    return task;
  }

  async update(
    id: string,
    updateTaskDto: UpdateTaskDto,
    user: User
  ): Promise<Task> {
    const task = await this.findOne(id, user);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: string, user: User): Promise<void> {
    const task = await this.findOne(id, user);
    await this.tasksRepository.remove(task);
  }
}
