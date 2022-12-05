import { Module } from '@nestjs/common';

import { TodosModule } from './todo.module';

@Module({
  imports: [TodosModule],
})
export class AppModule {}
