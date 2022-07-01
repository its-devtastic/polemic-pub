import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { Formik, Field } from "formik";
import * as Schema from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import useAuth from "../../hooks/useAuth";
import FormField from "../../components/FormField";

const validationSchema = Schema.object({
  token: Schema.string()
    .matches(/^[a-zA-Z\d_-]+$/, "Token looks invalid")
    .length(20)
    .required("This field is required"),
});

const Token: NextPage = () => {
  const { submitToken } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Submit login token - PolemicPub</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Formik
          initialValues={{ token: "" }}
          validationSchema={validationSchema}
          onSubmit={async ({ token }) => {
            await submitToken(token);
            await router.push("/");
          }}
        >
          {({ submitForm, isValid, isSubmitting }) => (
            <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg shadow-slate-900/10 flex flex-col items-center">
              <div className="mb-2 inline">
                <img src="/icon.png" alt="" className="h-16" />
              </div>
              <h1 className="text-2xl font-normal mb-4">
                {"You've got a message!"}
              </h1>
              <div className="text-sm mb-12 text-center">
                <span className="text-slate-500">
                  {"Didn't receive an email? Check your spam folder or "}
                </span>
                <Link href="/login" legacyBehavior>
                  <a className="text-indigo-600">Request a new code</a>
                </Link>
              </div>
              <FormField label="Your login token" className="mb-4">
                <div className="p-inputgroup">
                  <Field
                    name="token"
                    as={InputText}
                    disabled={isSubmitting}
                    keyfilter={/^[a-zA-Z\d_-]+$/}
                  />

                  <Button
                    onClick={() => isValid && submitForm()}
                    loading={isSubmitting}
                    icon="pi pi-arrow-right"
                  />
                </div>
              </FormField>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Token;
