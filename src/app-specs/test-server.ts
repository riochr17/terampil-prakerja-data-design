import { Register } from "./backend-specs/account-auth.design";
import { MyCertificate } from "./backend-specs/account-data.design";
import { BackendSystem } from "./backend-system.generated";

const registerLogic: BackendSystem.Logic.IRegister = async (param: { body: Register.Body }): Promise<Register.Output> => {
  console.log(param);
  return true;
}

const myCertificateLogic: BackendSystem.Logic.IMyCertificate = async (param: { query: MyCertificate.Query, header: MyCertificate.Header,  }): Promise<MyCertificate.Output> => {
  console.log(param);
  return {
    total: 12,
    data: []
  };
}

new BackendSystem.Engine().init({ port: 8000 })
.then((engine: BackendSystem.Engine) => {
  engine.register(registerLogic);
  engine.myCertificate(myCertificateLogic);
})
.catch((error: any) => {
  console.error(error);
});
