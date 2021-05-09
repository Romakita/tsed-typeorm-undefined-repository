import {Configuration, Inject, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";
import "@tsed/typeorm"; // !!!!!! IMPORTANT TO ADD THIS  !!! Follow the doc please!
import "@tsed/platform-express";
import {ConnectionOptions} from "typeorm";

const rootDir = __dirname;

@Configuration({
  rootDir,
  acceptMimes: ["application/json"],
  mount: {
    '/': [
      `${rootDir}/controllers/*.ts`,
    ],
  },
  typeorm: [
    {
      type: 'sqlite',
      database: './data/sqlite.db',
      synchronize: true,
      entities: [
        `${rootDir}/entities/*{.ts,.js}`,
      ],
    } as ConnectionOptions,
  ],
})
export class Server {
  @Inject()
  app: PlatformApplication;

  @Configuration()
  settings: Configuration;

  /**
   * This method let you configure the express middleware required by your application to works.
   * @returns {Server}
   */
  public $beforeRoutesInit(): void | Promise<any> {
    this.app
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
  }
}
