import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field } from "formik";
import { TextInputField, Button } from "evergreen-ui";
import * as Schema from "yup";

import useAuth from "../../hooks/useAuth";

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
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-24">
          <img src="/logo.svg" alt="" className="h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-slate-700">Log in</h1>
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await sendMagicLink(values);
            await router.push("/login/token");
          }}
        >
          {({ submitForm, errors, isValid, isSubmitting }) => (
            <div className="w-80 max-w-full bg-slate-50 p-8 rounded-md border border-slate-300 shadow-lg shadow-slate-900/5">
              <Field
                name="email"
                as={TextInputField}
                label="Your email address"
                description="We will send you a login code"
                type="email"
                validationMessage={errors.email}
                disabled={isSubmitting}
              />

              <Button
                appearance="primary"
                onClick={() => isValid && submitForm()}
                isLoading={isSubmitting}
              >
                Send code
              </Button>

              <div className="mt-4">
                <Link href="/signup" legacyBehavior>
                  <a className="text-sm text-slate-700 hover:underline">
                    Create an account
                  </a>
                </Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Login;
