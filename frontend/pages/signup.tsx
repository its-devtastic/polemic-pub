import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field } from "formik";
import * as Schema from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import useAuth from "../hooks/useAuth";
import FormField from "../components/FormField";

const validationSchema = Schema.object({
  email: Schema.string().email().required("This field is required"),
  username: Schema.string()
    .matches(
      /^[a-zA-Z_\d]+$/,
      "Handle can only contain alphanumeric characters and underscores"
    )
    .min(3, "Minimal length is 3")
    .max(20, "Max length is 20")
    .required("This field is required"),
});

const Signup: NextPage = () => {
  const { sendMagicLink } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign up - PolemicPub</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Formik
          initialValues={{ email: "", username: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await sendMagicLink(values);
            await router.push("/login/token");
          }}
        >
          {({ submitForm, errors, touched, isValid, isSubmitting }) => (
            <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg shadow-slate-900/10 flex flex-col items-center">
              <div className="mb-2 inline">
                <img src="/icon.png" alt="" className="h-16" />
              </div>
              <h1 className="text-2xl font-normal mb-4">
                Start writing today!
              </h1>
              <div className="text-sm mb-12">
                <span className="text-slate-500">
                  {"Already have an account? "}
                </span>
                <Link href="/signup" legacyBehavior>
                  <a className="text-indigo-600">Log in</a>
                </Link>
              </div>
              <FormField
                label="Your email address"
                className="mb-6"
                error={touched.email && errors.email}
              >
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">
                    <i className="pi pi-envelope" />
                  </span>
                  <Field
                    name="email"
                    as={InputText}
                    type="email"
                    disabled={isSubmitting}
                    keyfilter="email"
                  />
                </div>
              </FormField>

              <FormField
                label="Your Polemic username"
                className="mb-12"
                error={touched.username && errors.username}
              >
                <div className="p-inputgroup">
                  <span className="p-inputgroup-addon">polemic.pub/@</span>
                  <Field
                    name="username"
                    as={InputText}
                    disabled={isSubmitting}
                    keyfilter={/^[a-zA-Z_\d]+$/}
                  />
                </div>
              </FormField>

              <Button
                onClick={() => isValid && submitForm()}
                loading={isSubmitting}
                label="Create account"
                icon="pi pi-send"
                className="w-full"
              />
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
