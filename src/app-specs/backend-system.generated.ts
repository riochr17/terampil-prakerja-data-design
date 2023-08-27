import "reflect-metadata";
import express, { Express, NextFunction, Request, Response, Router } from 'express';
import { Register } from "./backend-specs/account-auth.design";
import { Login } from "./backend-specs/account-auth.design";
import { MyProfile } from "./backend-specs/account-data.design";
import { MyInvoice } from "./backend-specs/account-data.design";
import { GetInvoiceDetail } from "./backend-specs/account-data.design";
import { MyCertificate } from "./backend-specs/account-data.design";
import { GetCertificateDetail } from "./backend-specs/account-data.design";
import { AdminGetBankSoal } from "./backend-specs/admin.bank-soal.design";
import { AdminCreateBankSoal } from "./backend-specs/admin.bank-soal.design";
import { AdminUpdateBankSoal } from "./backend-specs/admin.bank-soal.design";
import { AdminDeleteBankSoal } from "./backend-specs/admin.bank-soal.design";
import { AdminDetailBankSoal } from "./backend-specs/admin.bank-soal.design";
import { AdminLogin } from "./backend-specs/admin.login.design";
import { AdminGetTrainer } from "./backend-specs/admin.trainer.design";
import { AdminCreateTrainer } from "./backend-specs/admin.trainer.design";
import { AdminUpdateTrainer } from "./backend-specs/admin.trainer.design";
import { AdminDeleteTrainer } from "./backend-specs/admin.trainer.design";
import { AdminDetailTrainer } from "./backend-specs/admin.trainer.design";
import { AdminGetTrainingLocation } from "./backend-specs/admin.training-location-schedule.design";
import { AdminDeleteTrainingLocation } from "./backend-specs/admin.training-location-schedule.design";
import { AdminCreateTrainingLocation } from "./backend-specs/admin.training-location-schedule.design";
import { AdminUpdateTrainingLocation } from "./backend-specs/admin.training-location-schedule.design";
import { AdminDeleteTrainingLocationSchedule } from "./backend-specs/admin.training-location-schedule.design";
import { AdminCreateTrainingLocationSchedule } from "./backend-specs/admin.training-location-schedule.design";
import { AdminUpdateTrainingLocationSchedule } from "./backend-specs/admin.training-location-schedule.design";
import { AdminGetTraining } from "./backend-specs/admin.training.design";
import { AdminCreateTraining } from "./backend-specs/admin.training.design";
import { AdminUpdateTraining } from "./backend-specs/admin.training.design";
import { AdminDeleteTraining } from "./backend-specs/admin.training.design";
import { AdminDetailTraining } from "./backend-specs/admin.training.design";
import { AdminGetVoucher } from "./backend-specs/admin.voucher.design";
import { AdminCreateVoucher } from "./backend-specs/admin.voucher.design";
import { AdminUpdateVoucher } from "./backend-specs/admin.voucher.design";
import { AdminDeleteVoucher } from "./backend-specs/admin.voucher.design";
import { AdminDetailVoucher } from "./backend-specs/admin.voucher.design";
import { UploadAssignment } from "./backend-specs/material-assignment.design";
import { CheckInOutMaterialOfflineClass } from "./backend-specs/material-offline-class.design";
import { CheckInOutMaterialOnlineClass } from "./backend-specs/material-online-class.design";
import { SubmitQuizAnswer } from "./backend-specs/material-quiz.design";
import { GetMyTrainingEnrollStatus } from "./backend-specs/my-training.design";
import { EnrollTraining } from "./backend-specs/my-training.design";
import { GetMyTraining } from "./backend-specs/my-training.design";
import { GetMyTrainingProgress } from "./backend-specs/my-training.design";
import { GetMyTrainingQuizData } from "./backend-specs/my-training.design";
import { GetMyTrainingQuizResult } from "./backend-specs/my-training.design";
import { GetMyTrainingOnlineClassData } from "./backend-specs/my-training.design";
import { GetMyTrainingOfflineClassData } from "./backend-specs/my-training.design";
import { GetMyTrainingAssignmentData } from "./backend-specs/my-training.design";
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
    export type IAdminGetBankSoal = (param: { query: AdminGetBankSoal.Query, header: AdminGetBankSoal.Header,  }) => Promise<AdminGetBankSoal.Output>
    export type IAdminCreateBankSoal = (param: { body: AdminCreateBankSoal.Body, header: AdminCreateBankSoal.Header,  }) => Promise<AdminCreateBankSoal.Output>
    export type IAdminUpdateBankSoal = (param: { body: AdminUpdateBankSoal.Body, header: AdminUpdateBankSoal.Header,  }) => Promise<AdminUpdateBankSoal.Output>
    export type IAdminDeleteBankSoal = (param: { query: AdminDeleteBankSoal.Query, header: AdminDeleteBankSoal.Header,  }) => Promise<AdminDeleteBankSoal.Output>
    export type IAdminDetailBankSoal = (param: { query: AdminDetailBankSoal.Query, header: AdminDetailBankSoal.Header,  }) => Promise<AdminDetailBankSoal.Output>
    export type IAdminLogin = (param: { body: AdminLogin.Body,  }) => Promise<AdminLogin.Output>
    export type IAdminGetTrainer = (param: { query: AdminGetTrainer.Query, header: AdminGetTrainer.Header,  }) => Promise<AdminGetTrainer.Output>
    export type IAdminCreateTrainer = (param: { body: AdminCreateTrainer.Body, header: AdminCreateTrainer.Header,  }) => Promise<AdminCreateTrainer.Output>
    export type IAdminUpdateTrainer = (param: { body: AdminUpdateTrainer.Body, header: AdminUpdateTrainer.Header,  }) => Promise<AdminUpdateTrainer.Output>
    export type IAdminDeleteTrainer = (param: { query: AdminDeleteTrainer.Query, header: AdminDeleteTrainer.Header,  }) => Promise<AdminDeleteTrainer.Output>
    export type IAdminDetailTrainer = (param: { query: AdminDetailTrainer.Query, header: AdminDetailTrainer.Header,  }) => Promise<AdminDetailTrainer.Output>
    export type IAdminGetTrainingLocation = (param: { query: AdminGetTrainingLocation.Query, header: AdminGetTrainingLocation.Header,  }) => Promise<AdminGetTrainingLocation.Output>
    export type IAdminDeleteTrainingLocation = (param: { query: AdminDeleteTrainingLocation.Query, header: AdminDeleteTrainingLocation.Header,  }) => Promise<AdminDeleteTrainingLocation.Output>
    export type IAdminCreateTrainingLocation = (param: { body: AdminCreateTrainingLocation.Body, header: AdminCreateTrainingLocation.Header,  }) => Promise<AdminCreateTrainingLocation.Output>
    export type IAdminUpdateTrainingLocation = (param: { body: AdminUpdateTrainingLocation.Body, header: AdminUpdateTrainingLocation.Header,  }) => Promise<AdminUpdateTrainingLocation.Output>
    export type IAdminDeleteTrainingLocationSchedule = (param: { query: AdminDeleteTrainingLocationSchedule.Query, header: AdminDeleteTrainingLocationSchedule.Header,  }) => Promise<AdminDeleteTrainingLocationSchedule.Output>
    export type IAdminCreateTrainingLocationSchedule = (param: { body: AdminCreateTrainingLocationSchedule.Body, header: AdminCreateTrainingLocationSchedule.Header,  }) => Promise<AdminCreateTrainingLocationSchedule.Output>
    export type IAdminUpdateTrainingLocationSchedule = (param: { body: AdminUpdateTrainingLocationSchedule.Body, header: AdminUpdateTrainingLocationSchedule.Header,  }) => Promise<AdminUpdateTrainingLocationSchedule.Output>
    export type IAdminGetTraining = (param: { query: AdminGetTraining.Query, header: AdminGetTraining.Header,  }) => Promise<AdminGetTraining.Output>
    export type IAdminCreateTraining = (param: { body: AdminCreateTraining.Body, header: AdminCreateTraining.Header,  }) => Promise<AdminCreateTraining.Output>
    export type IAdminUpdateTraining = (param: { body: AdminUpdateTraining.Body, header: AdminUpdateTraining.Header,  }) => Promise<AdminUpdateTraining.Output>
    export type IAdminDeleteTraining = (param: { query: AdminDeleteTraining.Query, header: AdminDeleteTraining.Header,  }) => Promise<AdminDeleteTraining.Output>
    export type IAdminDetailTraining = (param: { query: AdminDetailTraining.Query, header: AdminDetailTraining.Header,  }) => Promise<AdminDetailTraining.Output>
    export type IAdminGetVoucher = (param: { query: AdminGetVoucher.Query, header: AdminGetVoucher.Header,  }) => Promise<AdminGetVoucher.Output>
    export type IAdminCreateVoucher = (param: { body: AdminCreateVoucher.Body, header: AdminCreateVoucher.Header,  }) => Promise<AdminCreateVoucher.Output>
    export type IAdminUpdateVoucher = (param: { body: AdminUpdateVoucher.Body, header: AdminUpdateVoucher.Header,  }) => Promise<AdminUpdateVoucher.Output>
    export type IAdminDeleteVoucher = (param: { query: AdminDeleteVoucher.Query, header: AdminDeleteVoucher.Header,  }) => Promise<AdminDeleteVoucher.Output>
    export type IAdminDetailVoucher = (param: { query: AdminDetailVoucher.Query, header: AdminDetailVoucher.Header,  }) => Promise<AdminDetailVoucher.Output>
    export type IUploadAssignment = (param: { body: UploadAssignment.Body, header: UploadAssignment.Header,  }) => Promise<UploadAssignment.Output>
    export type ICheckInOutMaterialOfflineClass = (param: { body: CheckInOutMaterialOfflineClass.Body, header: CheckInOutMaterialOfflineClass.Header,  }) => Promise<CheckInOutMaterialOfflineClass.Output>
    export type ICheckInOutMaterialOnlineClass = (param: { body: CheckInOutMaterialOnlineClass.Body, header: CheckInOutMaterialOnlineClass.Header,  }) => Promise<CheckInOutMaterialOnlineClass.Output>
    export type ISubmitQuizAnswer = (param: { body: SubmitQuizAnswer.Body, header: SubmitQuizAnswer.Header,  }) => Promise<SubmitQuizAnswer.Output>
    export type IGetMyTrainingEnrollStatus = (param: { query: GetMyTrainingEnrollStatus.Query, header: GetMyTrainingEnrollStatus.Header,  }) => Promise<GetMyTrainingEnrollStatus.Output>
    export type IEnrollTraining = (param: { body: EnrollTraining.Body, header: EnrollTraining.Header,  }) => Promise<EnrollTraining.Output>
    export type IGetMyTraining = (param: { query: GetMyTraining.Query, header: GetMyTraining.Header,  }) => Promise<GetMyTraining.Output>
    export type IGetMyTrainingProgress = (param: { query: GetMyTrainingProgress.Query, header: GetMyTrainingProgress.Header,  }) => Promise<GetMyTrainingProgress.Output>
    export type IGetMyTrainingQuizData = (param: { query: GetMyTrainingQuizData.Query, header: GetMyTrainingQuizData.Header,  }) => Promise<GetMyTrainingQuizData.Output>
    export type IGetMyTrainingQuizResult = (param: { query: GetMyTrainingQuizResult.Query, header: GetMyTrainingQuizResult.Header,  }) => Promise<GetMyTrainingQuizResult.Output>
    export type IGetMyTrainingOnlineClassData = (param: { query: GetMyTrainingOnlineClassData.Query, header: GetMyTrainingOnlineClassData.Header,  }) => Promise<GetMyTrainingOnlineClassData.Output>
    export type IGetMyTrainingOfflineClassData = (param: { query: GetMyTrainingOfflineClassData.Query, header: GetMyTrainingOfflineClassData.Header,  }) => Promise<GetMyTrainingOfflineClassData.Output>
    export type IGetMyTrainingAssignmentData = (param: { query: GetMyTrainingAssignmentData.Query, header: GetMyTrainingAssignmentData.Header,  }) => Promise<GetMyTrainingAssignmentData.Output>
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
    public express?: Express;

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

    public adminGetBankSoal(logic: Logic.IAdminGetBankSoal) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminGetBankSoal.Endpoint.method, 
        AdminGetBankSoal.Endpoint.url, 
        { query: AdminGetBankSoal.Query, header: AdminGetBankSoal.Header,  },
        logic
      ));
    }

    public adminCreateBankSoal(logic: Logic.IAdminCreateBankSoal) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateBankSoal.Endpoint.method, 
        AdminCreateBankSoal.Endpoint.url, 
        { body: AdminCreateBankSoal.Body, header: AdminCreateBankSoal.Header,  },
        logic
      ));
    }

    public adminUpdateBankSoal(logic: Logic.IAdminUpdateBankSoal) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateBankSoal.Endpoint.method, 
        AdminUpdateBankSoal.Endpoint.url, 
        { body: AdminUpdateBankSoal.Body, header: AdminUpdateBankSoal.Header,  },
        logic
      ));
    }

    public adminDeleteBankSoal(logic: Logic.IAdminDeleteBankSoal) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteBankSoal.Endpoint.method, 
        AdminDeleteBankSoal.Endpoint.url, 
        { query: AdminDeleteBankSoal.Query, header: AdminDeleteBankSoal.Header,  },
        logic
      ));
    }

    public adminDetailBankSoal(logic: Logic.IAdminDetailBankSoal) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDetailBankSoal.Endpoint.method, 
        AdminDetailBankSoal.Endpoint.url, 
        { query: AdminDetailBankSoal.Query, header: AdminDetailBankSoal.Header,  },
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

    public adminGetTrainer(logic: Logic.IAdminGetTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminGetTrainer.Endpoint.method, 
        AdminGetTrainer.Endpoint.url, 
        { query: AdminGetTrainer.Query, header: AdminGetTrainer.Header,  },
        logic
      ));
    }

    public adminCreateTrainer(logic: Logic.IAdminCreateTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateTrainer.Endpoint.method, 
        AdminCreateTrainer.Endpoint.url, 
        { body: AdminCreateTrainer.Body, header: AdminCreateTrainer.Header,  },
        logic
      ));
    }

    public adminUpdateTrainer(logic: Logic.IAdminUpdateTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateTrainer.Endpoint.method, 
        AdminUpdateTrainer.Endpoint.url, 
        { body: AdminUpdateTrainer.Body, header: AdminUpdateTrainer.Header,  },
        logic
      ));
    }

    public adminDeleteTrainer(logic: Logic.IAdminDeleteTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteTrainer.Endpoint.method, 
        AdminDeleteTrainer.Endpoint.url, 
        { query: AdminDeleteTrainer.Query, header: AdminDeleteTrainer.Header,  },
        logic
      ));
    }

    public adminDetailTrainer(logic: Logic.IAdminDetailTrainer) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDetailTrainer.Endpoint.method, 
        AdminDetailTrainer.Endpoint.url, 
        { query: AdminDetailTrainer.Query, header: AdminDetailTrainer.Header,  },
        logic
      ));
    }

    public adminGetTrainingLocation(logic: Logic.IAdminGetTrainingLocation) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminGetTrainingLocation.Endpoint.method, 
        AdminGetTrainingLocation.Endpoint.url, 
        { query: AdminGetTrainingLocation.Query, header: AdminGetTrainingLocation.Header,  },
        logic
      ));
    }

    public adminDeleteTrainingLocation(logic: Logic.IAdminDeleteTrainingLocation) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteTrainingLocation.Endpoint.method, 
        AdminDeleteTrainingLocation.Endpoint.url, 
        { query: AdminDeleteTrainingLocation.Query, header: AdminDeleteTrainingLocation.Header,  },
        logic
      ));
    }

    public adminCreateTrainingLocation(logic: Logic.IAdminCreateTrainingLocation) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateTrainingLocation.Endpoint.method, 
        AdminCreateTrainingLocation.Endpoint.url, 
        { body: AdminCreateTrainingLocation.Body, header: AdminCreateTrainingLocation.Header,  },
        logic
      ));
    }

    public adminUpdateTrainingLocation(logic: Logic.IAdminUpdateTrainingLocation) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateTrainingLocation.Endpoint.method, 
        AdminUpdateTrainingLocation.Endpoint.url, 
        { body: AdminUpdateTrainingLocation.Body, header: AdminUpdateTrainingLocation.Header,  },
        logic
      ));
    }

    public adminDeleteTrainingLocationSchedule(logic: Logic.IAdminDeleteTrainingLocationSchedule) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteTrainingLocationSchedule.Endpoint.method, 
        AdminDeleteTrainingLocationSchedule.Endpoint.url, 
        { query: AdminDeleteTrainingLocationSchedule.Query, header: AdminDeleteTrainingLocationSchedule.Header,  },
        logic
      ));
    }

    public adminCreateTrainingLocationSchedule(logic: Logic.IAdminCreateTrainingLocationSchedule) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateTrainingLocationSchedule.Endpoint.method, 
        AdminCreateTrainingLocationSchedule.Endpoint.url, 
        { body: AdminCreateTrainingLocationSchedule.Body, header: AdminCreateTrainingLocationSchedule.Header,  },
        logic
      ));
    }

    public adminUpdateTrainingLocationSchedule(logic: Logic.IAdminUpdateTrainingLocationSchedule) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateTrainingLocationSchedule.Endpoint.method, 
        AdminUpdateTrainingLocationSchedule.Endpoint.url, 
        { body: AdminUpdateTrainingLocationSchedule.Body, header: AdminUpdateTrainingLocationSchedule.Header,  },
        logic
      ));
    }

    public adminGetTraining(logic: Logic.IAdminGetTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminGetTraining.Endpoint.method, 
        AdminGetTraining.Endpoint.url, 
        { query: AdminGetTraining.Query, header: AdminGetTraining.Header,  },
        logic
      ));
    }

    public adminCreateTraining(logic: Logic.IAdminCreateTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateTraining.Endpoint.method, 
        AdminCreateTraining.Endpoint.url, 
        { body: AdminCreateTraining.Body, header: AdminCreateTraining.Header,  },
        logic
      ));
    }

    public adminUpdateTraining(logic: Logic.IAdminUpdateTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateTraining.Endpoint.method, 
        AdminUpdateTraining.Endpoint.url, 
        { body: AdminUpdateTraining.Body, header: AdminUpdateTraining.Header,  },
        logic
      ));
    }

    public adminDeleteTraining(logic: Logic.IAdminDeleteTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteTraining.Endpoint.method, 
        AdminDeleteTraining.Endpoint.url, 
        { query: AdminDeleteTraining.Query, header: AdminDeleteTraining.Header,  },
        logic
      ));
    }

    public adminDetailTraining(logic: Logic.IAdminDetailTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDetailTraining.Endpoint.method, 
        AdminDetailTraining.Endpoint.url, 
        { query: AdminDetailTraining.Query, header: AdminDetailTraining.Header,  },
        logic
      ));
    }

    public adminGetVoucher(logic: Logic.IAdminGetVoucher) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminGetVoucher.Endpoint.method, 
        AdminGetVoucher.Endpoint.url, 
        { query: AdminGetVoucher.Query, header: AdminGetVoucher.Header,  },
        logic
      ));
    }

    public adminCreateVoucher(logic: Logic.IAdminCreateVoucher) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminCreateVoucher.Endpoint.method, 
        AdminCreateVoucher.Endpoint.url, 
        { body: AdminCreateVoucher.Body, header: AdminCreateVoucher.Header,  },
        logic
      ));
    }

    public adminUpdateVoucher(logic: Logic.IAdminUpdateVoucher) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminUpdateVoucher.Endpoint.method, 
        AdminUpdateVoucher.Endpoint.url, 
        { body: AdminUpdateVoucher.Body, header: AdminUpdateVoucher.Header,  },
        logic
      ));
    }

    public adminDeleteVoucher(logic: Logic.IAdminDeleteVoucher) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDeleteVoucher.Endpoint.method, 
        AdminDeleteVoucher.Endpoint.url, 
        { query: AdminDeleteVoucher.Query, header: AdminDeleteVoucher.Header,  },
        logic
      ));
    }

    public adminDetailVoucher(logic: Logic.IAdminDetailVoucher) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        AdminDetailVoucher.Endpoint.method, 
        AdminDetailVoucher.Endpoint.url, 
        { query: AdminDetailVoucher.Query, header: AdminDetailVoucher.Header,  },
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

    public getMyTrainingEnrollStatus(logic: Logic.IGetMyTrainingEnrollStatus) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingEnrollStatus.Endpoint.method, 
        GetMyTrainingEnrollStatus.Endpoint.url, 
        { query: GetMyTrainingEnrollStatus.Query, header: GetMyTrainingEnrollStatus.Header,  },
        logic
      ));
    }

    public enrollTraining(logic: Logic.IEnrollTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        EnrollTraining.Endpoint.method, 
        EnrollTraining.Endpoint.url, 
        { body: EnrollTraining.Body, header: EnrollTraining.Header,  },
        logic
      ));
    }

    public getMyTraining(logic: Logic.IGetMyTraining) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTraining.Endpoint.method, 
        GetMyTraining.Endpoint.url, 
        { query: GetMyTraining.Query, header: GetMyTraining.Header,  },
        logic
      ));
    }

    public getMyTrainingProgress(logic: Logic.IGetMyTrainingProgress) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingProgress.Endpoint.method, 
        GetMyTrainingProgress.Endpoint.url, 
        { query: GetMyTrainingProgress.Query, header: GetMyTrainingProgress.Header,  },
        logic
      ));
    }

    public getMyTrainingQuizData(logic: Logic.IGetMyTrainingQuizData) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingQuizData.Endpoint.method, 
        GetMyTrainingQuizData.Endpoint.url, 
        { query: GetMyTrainingQuizData.Query, header: GetMyTrainingQuizData.Header,  },
        logic
      ));
    }

    public getMyTrainingQuizResult(logic: Logic.IGetMyTrainingQuizResult) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingQuizResult.Endpoint.method, 
        GetMyTrainingQuizResult.Endpoint.url, 
        { query: GetMyTrainingQuizResult.Query, header: GetMyTrainingQuizResult.Header,  },
        logic
      ));
    }

    public getMyTrainingOnlineClassData(logic: Logic.IGetMyTrainingOnlineClassData) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingOnlineClassData.Endpoint.method, 
        GetMyTrainingOnlineClassData.Endpoint.url, 
        { query: GetMyTrainingOnlineClassData.Query, header: GetMyTrainingOnlineClassData.Header,  },
        logic
      ));
    }

    public getMyTrainingOfflineClassData(logic: Logic.IGetMyTrainingOfflineClassData) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingOfflineClassData.Endpoint.method, 
        GetMyTrainingOfflineClassData.Endpoint.url, 
        { query: GetMyTrainingOfflineClassData.Query, header: GetMyTrainingOfflineClassData.Header,  },
        logic
      ));
    }

    public getMyTrainingAssignmentData(logic: Logic.IGetMyTrainingAssignmentData) {
      if (!this.express) {
        throw new Error(`System have not initialized yet`);
      }
      this.express.use(this.createRoute(
        GetMyTrainingAssignmentData.Endpoint.method, 
        GetMyTrainingAssignmentData.Endpoint.url, 
        { query: GetMyTrainingAssignmentData.Query, header: GetMyTrainingAssignmentData.Header,  },
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
