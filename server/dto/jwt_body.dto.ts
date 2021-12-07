import { RoleKey } from 'server/entities/role.entity';

export interface JwtBodyDto {
  userId: number;
  contextId: string;
  roles: RoleKey[];
}
