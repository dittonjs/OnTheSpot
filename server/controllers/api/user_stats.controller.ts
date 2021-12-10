import { Controller, Get } from '@nestjs/common';
import { JwtBody } from 'server/decorators/jwt_body.decorator';
import { Roles } from 'server/decorators/roles.decorator';
import { JwtBodyDto } from 'server/dto/jwt_body.dto';
import { RoleKey } from 'server/entities/role.entity';
import { UserStat } from 'server/entities/user_stat.entity';
import { UserStatsService } from 'server/providers/services/user_stats.service';
import * as superagent from 'superagent';

interface UserInfo {
  id: number;
  userStat?: UserStat;
}

@Controller()
export class UserStatsController {
  constructor(private userStatsService: UserStatsService) {}

  @Get('/api/user_stats/pick')
  @Roles(RoleKey.CONTEXT_ADMINISTRATOR, RoleKey.CONTEXT_INSTRUCTOR, RoleKey.CONTEXT_TEACHINGASSISTANT)
  public async pick(@JwtBody() jwtBody: JwtBodyDto) {
    const { body: users } = await superagent
      .get(`https://${jwtBody.canvasApiDomain}/api/v1/courses/${jwtBody.courseId}/enrollments`)
      .set('Authorization', `Bearer ${process.env.CANVAS_TOKEN}`)
      .query({ type: ['StudentEnrollment'], per_page: 100 });

    console.log(users[0]);

    const userStats = await this.userStatsService.findAllInContext(jwtBody.contextId);
    const usersDict = {};
    users.forEach(({ user }) => {
      usersDict[`${user.id}`] = user;
    });

    userStats.forEach((userStat) => {
      if (usersDict[userStat.lmsUserId]) {
        usersDict[userStat.lmsUserId].userStat = userStat;
      }
    });

    const allData: UserInfo[] = Object.values(usersDict);

    // sort based on times chosen
    allData.sort((v1: UserInfo, v2: UserInfo) => {
      if (!v1.userStat) {
        return -9999;
      }
      if (!v2.userStat) {
        return 9999;
      }
      return v1.userStat.timesChosen - v2.userStat.timesChosen;
    });

    const selectedUser = allData[0];
    if (!selectedUser.userStat) {
      selectedUser.userStat = new UserStat();
      selectedUser.userStat.level = 0;
      selectedUser.userStat.timesChosen = 0;
      selectedUser.userStat.timesPresent = 0;
      selectedUser.userStat.lmsUserId = `${selectedUser.id}`;
      selectedUser.userStat.contextId = jwtBody.contextId;
      await this.userStatsService.create(selectedUser.userStat);
    }
    console.log(allData);

    return { selectedUser };
  }
}
