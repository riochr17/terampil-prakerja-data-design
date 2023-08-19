import { UserGender } from "../entity/UserGender.enum";
import { APICall } from "./api-call.generated";
import { Register } from "./backend-specs/account-auth.design";

const register_body: Register.Body = {
  password: "123123",
  fullname: undefined as any,
  gender: UserGender.FEMALE
};

(async () => {
  try {
    const result = await new APICall({ base_url: 'http://localhost:8000' }).register(register_body);
    console.log('success', result);
  } catch (err: any) {
    console.error(err.response.data);
  }
})();
