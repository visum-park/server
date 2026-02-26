import { BaseRepository } from '../../../common/interfaces/base.repository';

export class EmptyRepository<T> implements BaseRepository<T> {
  async findAll(): Promise<T[]> {
    return [];
  }

  async findById(id: string): Promise<T | null> {
    return null;
  }

  async save(entity: T): Promise<void> {
    return;
  }
}
