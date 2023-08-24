import "reflect-metadata";
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
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


export interface APICallParameters {
  base_url: string
  intercept?: {
    request?: boolean
    response?: boolean
  }
}

export class APICall {
  private static _instance?: APICall;
  private axios_instance?: AxiosInstance;

  public static instance(): APICall {
    if (!APICall._instance) {
      APICall._instance = new APICall();
    }

    return APICall._instance;
  }

  public init(parameters: APICallParameters): APICall {
    this.axios_instance = axios.create({
      baseURL: parameters.base_url
    });
    if (parameters.intercept?.request) {
      this.addRequestLogInterceptor();
    }
    if (parameters.intercept?.response) {
      this.addResponseLogInterceptor();
    }

    return this;
  }

  private async addRequestLogInterceptor() {
    this.axios_instance?.interceptors.request.use(async (original_request: InternalAxiosRequestConfig) => {
      console.log(original_request);
      return original_request;
    });
  }

  private async addResponseLogInterceptor() {
    this.axios_instance?.interceptors.response.use(async (original_response: AxiosResponse) => {
      console.log(original_response);
      return original_response;
    });
  }


  public async register(body: Register.Body, ): Promise<Register.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<Register.Output>(Register.Endpoint.url, body, {  }))!.data;
  }

  public async login(body: Login.Body, ): Promise<Login.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<Login.Output>(Login.Endpoint.url, body, {  }))!.data;
  }

  public async myProfile(query: MyProfile.Query, header: MyProfile.Header, ): Promise<MyProfile.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<MyProfile.Output>(MyProfile.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async myInvoice(query: MyInvoice.Query, header: MyInvoice.Header, ): Promise<MyInvoice.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<MyInvoice.Output>(MyInvoice.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async getInvoiceDetail(query: GetInvoiceDetail.Query, header: GetInvoiceDetail.Header, ): Promise<GetInvoiceDetail.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetInvoiceDetail.Output>(GetInvoiceDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async myCertificate(query: MyCertificate.Query, header: MyCertificate.Header, ): Promise<MyCertificate.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<MyCertificate.Output>(MyCertificate.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async getCertificateDetail(query: GetCertificateDetail.Query, header: GetCertificateDetail.Header, ): Promise<GetCertificateDetail.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetCertificateDetail.Output>(GetCertificateDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminGetBankSoal(query: AdminGetBankSoal.Query, header: AdminGetBankSoal.Header, ): Promise<AdminGetBankSoal.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminGetBankSoal.Output>(AdminGetBankSoal.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminCreateBankSoal(body: AdminCreateBankSoal.Body, header: AdminCreateBankSoal.Header, ): Promise<AdminCreateBankSoal.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminCreateBankSoal.Output>(AdminCreateBankSoal.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminUpdateBankSoal(body: AdminUpdateBankSoal.Body, header: AdminUpdateBankSoal.Header, ): Promise<AdminUpdateBankSoal.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.put<AdminUpdateBankSoal.Output>(AdminUpdateBankSoal.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminDeleteBankSoal(query: AdminDeleteBankSoal.Query, header: AdminDeleteBankSoal.Header, ): Promise<AdminDeleteBankSoal.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.delete<AdminDeleteBankSoal.Output>(AdminDeleteBankSoal.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminDetailBankSoal(query: AdminDetailBankSoal.Query, header: AdminDetailBankSoal.Header, ): Promise<AdminDetailBankSoal.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminDetailBankSoal.Output>(AdminDetailBankSoal.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminLogin(body: AdminLogin.Body, ): Promise<AdminLogin.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminLogin.Output>(AdminLogin.Endpoint.url, body, {  }))!.data;
  }

  public async adminGetTrainer(query: AdminGetTrainer.Query, header: AdminGetTrainer.Header, ): Promise<AdminGetTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminGetTrainer.Output>(AdminGetTrainer.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminCreateTrainer(body: AdminCreateTrainer.Body, header: AdminCreateTrainer.Header, ): Promise<AdminCreateTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminCreateTrainer.Output>(AdminCreateTrainer.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminUpdateTrainer(body: AdminUpdateTrainer.Body, header: AdminUpdateTrainer.Header, ): Promise<AdminUpdateTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.put<AdminUpdateTrainer.Output>(AdminUpdateTrainer.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminDeleteTrainer(query: AdminDeleteTrainer.Query, header: AdminDeleteTrainer.Header, ): Promise<AdminDeleteTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.delete<AdminDeleteTrainer.Output>(AdminDeleteTrainer.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminDetailTrainer(query: AdminDetailTrainer.Query, header: AdminDetailTrainer.Header, ): Promise<AdminDetailTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminDetailTrainer.Output>(AdminDetailTrainer.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminGetTrainingLocation(query: AdminGetTrainingLocation.Query, header: AdminGetTrainingLocation.Header, ): Promise<AdminGetTrainingLocation.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminGetTrainingLocation.Output>(AdminGetTrainingLocation.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminDeleteTrainingLocation(query: AdminDeleteTrainingLocation.Query, header: AdminDeleteTrainingLocation.Header, ): Promise<AdminDeleteTrainingLocation.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.delete<AdminDeleteTrainingLocation.Output>(AdminDeleteTrainingLocation.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminCreateTrainingLocation(body: AdminCreateTrainingLocation.Body, header: AdminCreateTrainingLocation.Header, ): Promise<AdminCreateTrainingLocation.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminCreateTrainingLocation.Output>(AdminCreateTrainingLocation.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminUpdateTrainingLocation(body: AdminUpdateTrainingLocation.Body, header: AdminUpdateTrainingLocation.Header, ): Promise<AdminUpdateTrainingLocation.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.put<AdminUpdateTrainingLocation.Output>(AdminUpdateTrainingLocation.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminDeleteTrainingLocationSchedule(query: AdminDeleteTrainingLocationSchedule.Query, header: AdminDeleteTrainingLocationSchedule.Header, ): Promise<AdminDeleteTrainingLocationSchedule.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.delete<AdminDeleteTrainingLocationSchedule.Output>(AdminDeleteTrainingLocationSchedule.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminCreateTrainingLocationSchedule(body: AdminCreateTrainingLocationSchedule.Body, header: AdminCreateTrainingLocationSchedule.Header, ): Promise<AdminCreateTrainingLocationSchedule.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminCreateTrainingLocationSchedule.Output>(AdminCreateTrainingLocationSchedule.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminUpdateTrainingLocationSchedule(body: AdminUpdateTrainingLocationSchedule.Body, header: AdminUpdateTrainingLocationSchedule.Header, ): Promise<AdminUpdateTrainingLocationSchedule.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.put<AdminUpdateTrainingLocationSchedule.Output>(AdminUpdateTrainingLocationSchedule.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminGetTraining(query: AdminGetTraining.Query, header: AdminGetTraining.Header, ): Promise<AdminGetTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminGetTraining.Output>(AdminGetTraining.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminCreateTraining(body: AdminCreateTraining.Body, header: AdminCreateTraining.Header, ): Promise<AdminCreateTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<AdminCreateTraining.Output>(AdminCreateTraining.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminUpdateTraining(body: AdminUpdateTraining.Body, header: AdminUpdateTraining.Header, ): Promise<AdminUpdateTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.put<AdminUpdateTraining.Output>(AdminUpdateTraining.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async adminDeleteTraining(query: AdminDeleteTraining.Query, header: AdminDeleteTraining.Header, ): Promise<AdminDeleteTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.delete<AdminDeleteTraining.Output>(AdminDeleteTraining.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async adminDetailTraining(query: AdminDetailTraining.Query, header: AdminDetailTraining.Header, ): Promise<AdminDetailTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<AdminDetailTraining.Output>(AdminDetailTraining.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async uploadAssignment(body: UploadAssignment.Body, header: UploadAssignment.Header, ): Promise<UploadAssignment.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<UploadAssignment.Output>(UploadAssignment.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async checkInOutMaterialOfflineClass(body: CheckInOutMaterialOfflineClass.Body, header: CheckInOutMaterialOfflineClass.Header, ): Promise<CheckInOutMaterialOfflineClass.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<CheckInOutMaterialOfflineClass.Output>(CheckInOutMaterialOfflineClass.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async checkInOutMaterialOnlineClass(body: CheckInOutMaterialOnlineClass.Body, header: CheckInOutMaterialOnlineClass.Header, ): Promise<CheckInOutMaterialOnlineClass.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<CheckInOutMaterialOnlineClass.Output>(CheckInOutMaterialOnlineClass.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async submitQuizAnswer(body: SubmitQuizAnswer.Body, header: SubmitQuizAnswer.Header, ): Promise<SubmitQuizAnswer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.post<SubmitQuizAnswer.Output>(SubmitQuizAnswer.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async getTraining(query: GetTraining.Query, ): Promise<GetTraining.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetTraining.Output>(GetTraining.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainingDetail(query: GetTrainingDetail.Query, ): Promise<GetTrainingDetail.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetTrainingDetail.Output>(GetTrainingDetail.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainer(query: GetTrainer.Query, ): Promise<GetTrainer.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetTrainer.Output>(GetTrainer.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainerDetail(query: GetTrainerDetail.Query, ): Promise<GetTrainerDetail.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<GetTrainerDetail.Output>(GetTrainerDetail.Endpoint.url, { params: query,  }))!.data;
  }

  public async settingData(query: SettingData.Query, header: SettingData.Header, ): Promise<SettingData.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<SettingData.Output>(SettingData.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async settingDetail(query: SettingDetail.Query, header: SettingDetail.Header, ): Promise<SettingDetail.Output> {
    if (!this.axios_instance) {
      throw new Error(`Axios have not initialized yet`)
    }
    return (await this.axios_instance?.get<SettingDetail.Output>(SettingDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

}
