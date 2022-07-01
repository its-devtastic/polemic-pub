import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field } from "formik";
import * as Schema from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import useAuth from "../../hooks/useAuth";
import FormField from "../../components/FormField";

const validationSchema = Schema.object({
  email: Schema.string().email().required("This field is required"),
});

const Login: NextPage = () => {
  const { sendMagicLink } = useAuth();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Log in - PolemicPub</title>
      </Head>
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen bg-slate-100">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await sendMagicLink(values);
            await router.push("/login/token");
          }}
        >
          {({ submitForm, isValid, isSubmitting }) => (
            <div className="w-full max-w-md bg-white p-6 rounded-md shadow-lg shadow-slate-900/10 flex flex-col items-center">
              <div className="mb-2 inline">
                <img src="/icon.png" alt="" className="h-16" />
              </div>
              <h1 className="text-2xl font-normal mb-4">Welcome back</h1>
              <div className="text-sm mb-12">
                <span className="text-slate-500">
                  {"Don't have an account? "}
                </span>
                <Link href="/signup" legacyBehavior>
                  <a className="text-indigo-600">Create for free!</a>
                </Link>
              </div>
              <FormField label="Your email address" className="mb-2">
                <Field
                  name="email"
                  as={InputText}
                  type="email"
                  disabled={isSubmitting}
                  keyfilter="email"
                />
              </FormField>

              <Button
                onClick={() => isValid && submitForm()}
                loading={isSubmitting}
                label="Get login code"
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

export default Login;
