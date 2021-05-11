import * as yup from "yup";
import { AnyObject, Maybe } from "yup/lib/types";


// TODO: fix mobile validator
const phoneUtil = require("google-libphonenumber").PhoneNumberUtil.getInstance();

const validateMobile = (value: number) =>
  phoneUtil.isValidNumberForRegion(phoneUtil.parse(value, "AU"), "AU");

yup.addMethod<yup.NumberSchema>(yup.number, "isMobile", function (message) {
  return this.test("isMobile", message, function (value) {

    if (value && typeof value === "number") {
      return validateMobile(value);
    }

    return false;
  });
});


declare module "yup" {
  interface NumberSchema<
    TType extends Maybe<number> = number | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends yup.BaseSchema<TType, TContext, TOut> {
    isMobile(message: string): NumberSchema<TType, TContext>;
  }
}

export default yup;