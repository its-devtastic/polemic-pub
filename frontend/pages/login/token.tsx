import type { NextPage } from "next";
import { useRouter } from "next/router";
import Head from "next/head";
import { Formik, Field } from "formik";
import { TextInputField, Button } from "evergreen-ui";
import * as Schema from "yup";

import useAuth from "../../hooks/useAuth";

const validationSchema = Schema.object({
  token: Schema.string()
    .matches(/[a-zA-Z\d_-]/)
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
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-24">
          <img src="/logo.svg" alt="" className="h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-slate-700">Submit token</h1>
        <Formik
          initialValues={{ token: "" }}
          validationSchema={validationSchema}
          onSubmit={async ({ token }) => {
            await submitToken(token);
            await router.push("/");
          }}
        >
          {({ submitForm, errors, isValid, isSubmitting }) => (
            <div className="w-80 max-w-full bg-slate-50 p-8 rounded-md border border-slate-300 shadow-lg shadow-slate-900/5">
              <Field
                name="token"
                as={TextInputField}
                label="Your login token"
                description="Should be a 20 character string"
                validationMessage={errors.token}
                disabled={isSubmitting}
              />
              <Button
                appearance="primary"
                onClick={() => isValid && submitForm()}
                isLoading={isSubmitting}
              >
                Submit
              </Button>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Token;
