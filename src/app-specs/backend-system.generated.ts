import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { Register } from "./backend-specs/account-auth.design";
import { Login } from "./backend-specs/account-auth.design";
import { MyProfile } from "./backend-specs/account-data.design";
import { MyInvoice } from "./backend-specs/account-data.design";
import { GetInvoiceDetail } from "./backend-specs/account-data.design";
import { MyCertificate } from "./backend-specs/account-data.design";
import { GetCertificateDetail } from "./backend-specs/account-data.design";
import { AdminLogin } from "./backend-specs/admin.login.design";
import { UploadAssignment } from "./backend-specs/material-assignment.design";
import { CheckInOutMaterialOfflineClass } from "./backend-specs/material-offline-class.design";
import { CheckInOutMaterialOnlineClass } from "./backend-specs/material-online-class.design";
import { SubmitQuizAnswer } from "./backend-specs/material-quiz.design";
import { GetTraining } from "./backend-specs/public.design";
import { GetTrainingDetail } from "./backend-specs/public.design";
import { GetTrainer } from "./backend-specs/public.design";
import { GetTrainerDetail } from "./backend-specs/public.design";
import { SettingData } from "./backend-specs/setting.design";
import { SettingDetail } from "./backend-specs/setting.design";

import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, validateOrReject } from 'class-validator';
import cors from 'cors';
import momentTz from 'moment-timezone';
import { AppDataSource } from '../data-source';

export namespace BackendSystem {
  export namespace Logic {
    export type IRegister = (param: { body: Register.Body,  }) => Promise<Register.Output>
    export type ILogin = (param: { body: Login.Body,  }) => Promise<Login.Output>
    export type IMyProfile = (param: { query: MyProfile.Query, header: MyProfile.Header,  }) => Promise<MyProfile.Output>
    export type IMyInvoice = (param: { query: MyInvoice.Query, header: MyInvoice.Header,  }) => Promise<MyInvoice.Output>
    export type IGetInvoiceDetail = (param: { query: GetInvoiceDetail.Query, header: GetInvoiceDetail.Header,  }) => Promise<GetInvoiceDetail.Output>
    export type IMyCertificate = (param: { query: MyCertificate.Query, header: MyCertificate.Header,  }) => Promise<MyCertificate.Output>
    export type IGetCertificateDetail = (param: { query: GetCertificateDetail.Query, header: GetCertificateDetail.Header,  }) => Promise<GetCertificateDetail.Output>
    export type IAdminLogin = (param: { body: AdminLogin.Body,  }) => Promise<AdminLogin.Output>
    export type IUploadAssignment = (param: { body: UploadAssignment.Body, header: UploadAssignment.Header,  }) => Promise<UploadAssignment.Output>
    export type ICheckInOutMaterialOfflineClass = (param: { body: CheckInOutMaterialOfflineClass.Body, header: CheckInOutMaterialOfflineClass.Header,  }) => Promise<CheckInOutMaterialOfflineClass.Output>
    export type ICheckInOutMaterialOnlineClass = (param: { body: CheckInOutMaterialOnlineClass.Body, header: CheckInOutMaterialOnlineClass.Header,  }) => Promise<CheckInOutMaterialOnlineClass.Output>
    export type ISubmitQuizAnswer = (param: { body: SubmitQuizAnswer.Body, header: SubmitQuizAnswer.Header,  }) => Promise<SubmitQuizAnswer.Output>
    export type IGetTraining = (param: { query: GetTraining.Query,  }) => Promise<GetTraining.Output>
    export type IGetTrainingDetail = (param: { query: GetTrainingDetail.Query,  }) => Promise<GetTrainingDetail.Output>
    export type IGetTrainer = (param: { query: GetTrainer.Query,  }) => Promise<GetTrainer.Output>
    export type IGetTrainerDetail = (param: { query: GetTrainerDetail.Query,  }) => Promise<GetTrainerDetail.Output>
    export type ISettingData = (param: { query: SettingData.Query, header: SettingData.Header,  }) => Promise<SettingData.Output>
    export type ISettingDetail = (param: { query: SettingDetail.Query, header: SettingDetail.Header,  }) => Promise<SettingDetail.Output>

  }
  
  export interface SystemParam {
    port?: number
  }
  
  export type ExpressMethod = 'get' | 'post' | 'put' | 'delete';

  export interface ExpressRequestData {
    body?: ClassConstructor<any>
    header?: ClassConstructor<any>
    query?: ClassConstructor<any>
  }

  export class Engine {
    private express?: Express;


    private errorToString(list_error: ValidationError[]): string {
      return list_error.map(err => {
        const constrains: any = err.constraints;
        const keys = Object.keys(constrains);
        return keys.filter(key => constrains[key].length > 0).map(key => constrains[key]).join(', ');
      }).join(', ');
    }

    private createRoute<X>(method: ExpressMethod, path: string, clss: ExpressRequestData, processor: X): Router {
      const router = Router();
      router[method](path, async (req: Request, res: Response) => {
        try {
          let query = {};
          let header = {};
          let body = {};

          if (clss.query) {
            query = plainToInstance(clss.query, req.query);
          }
          if (clss.body) {
            body = plainToInstance(clss.body, req.body);
          }
          if (clss.header) {
            header = plainToInstance(clss.header, req.headers);
          }
          
          try {
            if (clss.query) {
              await validateOrReject(query);
            }
            if (clss.body) {
              await validateOrReject(body);
            }
            if (clss.header) {
              await validateOrReject(header);
            }
          } catch (err_validation: any) {
            return res.status(400).end(this.errorToString(err_validation));
          }
          
          const output = await (processor as Function)({ query, body, header });
          res.json(output);
        } catch (err: any) {
          const [err_code, ...msg]: string[] = err.message.split(':');
          const has_valid_error_code = /^[1-5]\d{2}$/.test(err_code);
          const message: string = has_valid_error_code ? msg.join(':') : err.message;
          res.status(has_valid_error_code ? parseInt(err_code) : 500).end(message.trim());
        }
      });

      return router;
    }

    public async init(param: SystemParam): Promise<Engine> {
      momentTz.tz.setDefault('Asia/Jakarta');
      await AppDataSource.initialize();
      console.log('Data source has been initialized!');
      
      this.express = express();
      const port = param?.port ?? process.env.PORT ?? 3000;
      
      this.express.use(cors());
      this.express.use(express.json({limit: '5mb'}));
      this.express.set('trust proxy', true);
      this.express.listen(port, () => {
        console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
      });
      
      return this;
    }


    public register(logic: Logic.IRegister) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        Register.Endpoint.method, 
        Register.Endpoint.url, 
        { body: Register.Body,  },
        logic
      ));
    }

    public login(logic: Logic.ILogin) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        Login.Endpoint.method, 
        Login.Endpoint.url, 
        { body: Login.Body,  },
        logic
      ));
    }

    public myProfile(logic: Logic.IMyProfile) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        MyProfile.Endpoint.method, 
        MyProfile.Endpoint.url, 
        { query: MyProfile.Query, header: MyProfile.Header,  },
        logic
      ));
    }

    public myInvoice(logic: Logic.IMyInvoice) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        MyInvoice.Endpoint.method, 
        MyInvoice.Endpoint.url, 
        { query: MyInvoice.Query, header: MyInvoice.Header,  },
        logic
      ));
    }

    public getInvoiceDetail(logic: Logic.IGetInvoiceDetail) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetInvoiceDetail.Endpoint.method, 
        GetInvoiceDetail.Endpoint.url, 
        { query: GetInvoiceDetail.Query, header: GetInvoiceDetail.Header,  },
        logic
      ));
    }

    public myCertificate(logic: Logic.IMyCertificate) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        MyCertificate.Endpoint.method, 
        MyCertificate.Endpoint.url, 
        { query: MyCertificate.Query, header: MyCertificate.Header,  },
        logic
      ));
    }

    public getCertificateDetail(logic: Logic.IGetCertificateDetail) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetCertificateDetail.Endpoint.method, 
        GetCertificateDetail.Endpoint.url, 
        { query: GetCertificateDetail.Query, header: GetCertificateDetail.Header,  },
        logic
      ));
    }

    public adminLogin(logic: Logic.IAdminLogin) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminLogin.Endpoint.method, 
        AdminLogin.Endpoint.url, 
        { body: AdminLogin.Body,  },
        logic
      ));
    }

    public uploadAssignment(logic: Logic.IUploadAssignment) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        UploadAssignment.Endpoint.method, 
        UploadAssignment.Endpoint.url, 
        { body: UploadAssignment.Body, header: UploadAssignment.Header,  },
        logic
      ));
    }

    public checkInOutMaterialOfflineClass(logic: Logic.ICheckInOutMaterialOfflineClass) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        CheckInOutMaterialOfflineClass.Endpoint.method, 
        CheckInOutMaterialOfflineClass.Endpoint.url, 
        { body: CheckInOutMaterialOfflineClass.Body, header: CheckInOutMaterialOfflineClass.Header,  },
        logic
      ));
    }

    public checkInOutMaterialOnlineClass(logic: Logic.ICheckInOutMaterialOnlineClass) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        CheckInOutMaterialOnlineClass.Endpoint.method, 
        CheckInOutMaterialOnlineClass.Endpoint.url, 
        { body: CheckInOutMaterialOnlineClass.Body, header: CheckInOutMaterialOnlineClass.Header,  },
        logic
      ));
    }

    public submitQuizAnswer(logic: Logic.ISubmitQuizAnswer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        SubmitQuizAnswer.Endpoint.method, 
        SubmitQuizAnswer.Endpoint.url, 
        { body: SubmitQuizAnswer.Body, header: SubmitQuizAnswer.Header,  },
        logic
      ));
    }

    public getTraining(logic: Logic.IGetTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetTraining.Endpoint.method, 
        GetTraining.Endpoint.url, 
        { query: GetTraining.Query,  },
        logic
      ));
    }

    public getTrainingDetail(logic: Logic.IGetTrainingDetail) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetTrainingDetail.Endpoint.method, 
        GetTrainingDetail.Endpoint.url, 
        { query: GetTrainingDetail.Query,  },
        logic
      ));
    }

    public getTrainer(logic: Logic.IGetTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetTrainer.Endpoint.method, 
        GetTrainer.Endpoint.url, 
        { query: GetTrainer.Query,  },
        logic
      ));
    }

    public getTrainerDetail(logic: Logic.IGetTrainerDetail) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetTrainerDetail.Endpoint.method, 
        GetTrainerDetail.Endpoint.url, 
        { query: GetTrainerDetail.Query,  },
        logic
      ));
    }

    public settingData(logic: Logic.ISettingData) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        SettingData.Endpoint.method, 
        SettingData.Endpoint.url, 
        { query: SettingData.Query, header: SettingData.Header,  },
        logic
      ));
    }

    public settingDetail(logic: Logic.ISettingDetail) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        SettingDetail.Endpoint.method, 
        SettingDetail.Endpoint.url, 
        { query: SettingDetail.Query, header: SettingDetail.Header,  },
        logic
      ));
    }

  }
}
