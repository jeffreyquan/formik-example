import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";

const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

const validateMobile = (value: string) => {
  try {
    return phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "AU"), "AU");
  } catch (error) {
    return false;
  }
}


yup.addMethod<yup.StringSchema>(yup.string, "isMobile", function (message) {
  return this.test("isMobile", message, function (value) {

    if (value && typeof value === "string") {
      return validateMobile(value);
    }

    return false;
  });
});


declare module "yup" {
  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isMobile(message: string): StringSchema<TType, TContext>;
  }
}

export default yup;