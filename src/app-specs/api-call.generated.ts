import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Register } from "./backend-specs/account-auth.design";
import { Login } from "./backend-specs/account-auth.design";
import { MyProfile } from "./backend-specs/account-data.design";
import { MyInvoice } from "./backend-specs/account-data.design";
import { GetInvoiceDetail } from "./backend-specs/account-data.design";
import { MyCertificate } from "./backend-specs/account-data.design";
import { GetCertificateDetail } from "./backend-specs/account-data.design";
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

  public static instance(parameters: APICallParameters): APICall {
    if (!APICall._instance) {
      APICall._instance = new APICall();
      APICall._instance.init(parameters);
    }

    return APICall._instance;
  }

  public init(parameters: APICallParameters) {
    this.axios_instance = axios.create({
      baseURL: parameters.base_url
    });
    if (parameters.intercept?.request) {
      this.addRequestLogInterceptor();
    }
    if (parameters.intercept?.response) {
      this.addResponseLogInterceptor();
    }
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
    return (await this.axios_instance?.post<Register.Output>(Register.Endpoint.url, body, {  }))!.data;
  }

  public async login(body: Login.Body, ): Promise<Login.Output> {
    return (await this.axios_instance?.post<Login.Output>(Login.Endpoint.url, body, {  }))!.data;
  }

  public async myProfile(query: MyProfile.Query, header: MyProfile.Header, ): Promise<MyProfile.Output> {
    return (await this.axios_instance?.get<MyProfile.Output>(MyProfile.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async myInvoice(query: MyInvoice.Query, header: MyInvoice.Header, ): Promise<MyInvoice.Output> {
    return (await this.axios_instance?.get<MyInvoice.Output>(MyInvoice.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async getInvoiceDetail(query: GetInvoiceDetail.Query, header: GetInvoiceDetail.Header, ): Promise<GetInvoiceDetail.Output> {
    return (await this.axios_instance?.get<GetInvoiceDetail.Output>(GetInvoiceDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async myCertificate(query: MyCertificate.Query, header: MyCertificate.Header, ): Promise<MyCertificate.Output> {
    return (await this.axios_instance?.get<MyCertificate.Output>(MyCertificate.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async getCertificateDetail(query: GetCertificateDetail.Query, header: GetCertificateDetail.Header, ): Promise<GetCertificateDetail.Output> {
    return (await this.axios_instance?.get<GetCertificateDetail.Output>(GetCertificateDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async uploadAssignment(body: UploadAssignment.Body, header: UploadAssignment.Header, ): Promise<UploadAssignment.Output> {
    return (await this.axios_instance?.post<UploadAssignment.Output>(UploadAssignment.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async checkInOutMaterialOfflineClass(body: CheckInOutMaterialOfflineClass.Body, header: CheckInOutMaterialOfflineClass.Header, ): Promise<CheckInOutMaterialOfflineClass.Output> {
    return (await this.axios_instance?.post<CheckInOutMaterialOfflineClass.Output>(CheckInOutMaterialOfflineClass.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async checkInOutMaterialOnlineClass(body: CheckInOutMaterialOnlineClass.Body, header: CheckInOutMaterialOnlineClass.Header, ): Promise<CheckInOutMaterialOnlineClass.Output> {
    return (await this.axios_instance?.post<CheckInOutMaterialOnlineClass.Output>(CheckInOutMaterialOnlineClass.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async submitQuizAnswer(body: SubmitQuizAnswer.Body, header: SubmitQuizAnswer.Header, ): Promise<SubmitQuizAnswer.Output> {
    return (await this.axios_instance?.post<SubmitQuizAnswer.Output>(SubmitQuizAnswer.Endpoint.url, body, { headers: header as any,  }))!.data;
  }

  public async getTraining(query: GetTraining.Query, ): Promise<GetTraining.Output> {
    return (await this.axios_instance?.get<GetTraining.Output>(GetTraining.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainingDetail(query: GetTrainingDetail.Query, ): Promise<GetTrainingDetail.Output> {
    return (await this.axios_instance?.get<GetTrainingDetail.Output>(GetTrainingDetail.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainer(query: GetTrainer.Query, ): Promise<GetTrainer.Output> {
    return (await this.axios_instance?.get<GetTrainer.Output>(GetTrainer.Endpoint.url, { params: query,  }))!.data;
  }

  public async getTrainerDetail(query: GetTrainerDetail.Query, ): Promise<GetTrainerDetail.Output> {
    return (await this.axios_instance?.get<GetTrainerDetail.Output>(GetTrainerDetail.Endpoint.url, { params: query,  }))!.data;
  }

  public async settingData(query: SettingData.Query, header: SettingData.Header, ): Promise<SettingData.Output> {
    return (await this.axios_instance?.get<SettingData.Output>(SettingData.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

  public async settingDetail(query: SettingDetail.Query, header: SettingDetail.Header, ): Promise<SettingDetail.Output> {
    return (await this.axios_instance?.get<SettingDetail.Output>(SettingDetail.Endpoint.url, { params: query, headers: header as any,  }))!.data;
  }

}
