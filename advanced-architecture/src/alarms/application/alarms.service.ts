import { Injectable } from '@nestjs/common';
import { CreateAlarmCommand } from './commands/create-alarm.command';
import { AlarmRepository } from './ports/alarm.repository';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAlarmsQuery } from './queries/get-alarm.query';

@Injectable()
export class AlarmsService {

  constructor(
    private readonly alarmRepository: AlarmRepository,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
    ){}

  create(createAlarmCommand: CreateAlarmCommand) {
    return this.commandBus.execute(createAlarmCommand);
  }

  findAll() {
    return this.queryBus.execute(new GetAlarmsQuery());
  }

}
