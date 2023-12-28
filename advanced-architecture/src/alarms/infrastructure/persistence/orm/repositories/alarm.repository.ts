import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AlarmRepository } from "src/alarms/application/ports/alarm.repository";
import { AlarmEntity } from "../entities/alarm.entity";
import { Repository } from "typeorm";
import { Alarm } from "src/alarms/domain/alarm";
import { AlarmMapper } from "../mappers/alarm.mapper";

@Injectable()
export class OrmAlarmRepository implements AlarmRepository {

    constructor(
        @InjectRepository(AlarmEntity)
        private readonly alarmRepository: Repository<AlarmEntity>
    ){}

    async findAll(){
        const entities = await this.alarmRepository.find();
        return entities.map((item) => AlarmMapper.toDomain(item))
    };

    async save(alarm: Alarm): Promise<Alarm>{
        const newPersistenceEntity = AlarmMapper.toPersistence(alarm);
        const persistedEntity = await this.alarmRepository.save(newPersistenceEntity);
        return AlarmMapper.toDomain(persistedEntity)
    }

}