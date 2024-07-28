
import config from "config";
import { IgApiClient, AccountRepositoryLoginResponseLogged_in_user, AccountFollowersFeedResponse, BlockedUsersFeedResponseRootObject, } from "instagram-private-api";
import { InstaAccountConfig } from "./config/default";
import winston from "winston";




class InstagramApiWrapper extends IgApiClient {
  private currentUser!: AccountRepositoryLoginResponseLogged_in_user;
  private isInitialized!: boolean;
  private logger = winston.createLogger({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.File({ filename: 'combined.log' }),
      new winston.transports.Console()
    ]
  })

  async initSesion(): Promise<void> {
    if (this.isInitialized) return;

    let { username, password } = config.get<InstaAccountConfig>("instaAccount")
    this.state.generateDevice(username);
    await this.simulate.preLoginFlow();
    this.currentUser = await this.account.login(username, password);
  }

  async getCurrentUserFollowers(): Promise<AccountFollowersFeedResponse> {
    const accountFollowers = await this.feed.accountFollowers(this.currentUser.pk).request();
    this.logger.info('Current AccountFollowers:', accountFollowers)
    return accountFollowers

  }

  async getUserFollowersByPk(pk: string | number): Promise<AccountFollowersFeedResponse> {
    const accountFollowers = await this.feed.accountFollowers(pk).request();
    this.logger.info('AccountFollowers:', accountFollowers)
    return accountFollowers
  }

  async getBlockedUsers(): Promise<BlockedUsersFeedResponseRootObject> {
    const blockedUsers = await this.feed.blockedUsers().request()
    this.logger.info('BlockedUsers:', blockedUsers)
    return blockedUsers
  }

}




async function start() {
  const instaClient = new InstagramApiWrapper()
  try {
    await instaClient.initSesion()
    await instaClient.getBlockedUsers()

    // const followers = await instaClient.getCurrentUserFollowers()
    // for (const [index, follower] of followers.users.entries()) {
    //   console.log(await instaClient.getUserFollowersByPk(follower.pk), `userul ${index}`)
    // }
  } catch (error) {
    console.log(error)
  }
}
start()