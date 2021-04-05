import {Configuration, Inject, InjectorService, PlatformApplication} from "@tsed/common";
import * as bodyParser from "body-parser";

import { TypeORMService } from '@tsed/typeorm';
import { ConnectionOptions } from "typeorm";

const rootDir = __dirname;


const connectionOptions: ConnectionOptions = {
  name: 'default',
  type: 'sqlite',
  database: './data/sqlite.db',
  synchronize: true,
} as ConnectionOptions;


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
      ...connectionOptions,
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

  @Inject()
  injector: InjectorService;

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

  async $onReady(): Promise<void> {
    this.injector.get<TypeORMService>(TypeORMService);
  }

}
