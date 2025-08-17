import { PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import type { UpdateTaskDto as UpdateTaskDtoModel } from '@task-manager/shared-types';

export class UpdateTaskDto extends PartialType(CreateTaskDto) implements UpdateTaskDtoModel {}
