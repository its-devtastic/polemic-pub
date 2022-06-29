import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { Formik, Field } from "formik";
import { TextInputField, Button } from "evergreen-ui";
import * as Schema from "yup";

import useAuth from "../hooks/useAuth";

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
      <div className="font-sans text-slate-900 flex flex-col items-center justify-center min-h-screen">
        <div className="mb-24">
          <img src="/logo.svg" alt="" className="h-8" />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-slate-700">
          Create account
        </h1>
        <Formik
          initialValues={{ email: "", username: "" }}
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
                description="This is used to send you a login link"
                type="email"
                validationMessage={errors.email}
                disabled={isSubmitting}
              />
              <Field
                name="username"
                as={TextInputField}
                label="Your Polemic handle"
                maxLength={20}
                validationMessage={errors.username}
                disabled={isSubmitting}
              />
              <Button
                appearance="primary"
                onClick={() => isValid && submitForm()}
                isLoading={isSubmitting}
              >
                Create account
              </Button>
              <div className="text-sm text-slate-700 mt-4">
                {"or "}
                <Link href="/login" legacyBehavior>
                  <a className="hover:underline">log in</a>
                </Link>
              </div>
            </div>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signup;
