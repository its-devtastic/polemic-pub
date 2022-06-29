import * as R from "ramda";

// Just for syntax highlighting
export const gql = ([query]: TemplateStringsArray) => query;

interface FetchGraphqlFn {
  (
    { query, mutation }: { query?: string; mutation?: string },
    opts?: { variables?: Record<string, any> }
  ): Promise<any>;
}
export const fetchGraphql: FetchGraphqlFn = async (
  { query, mutation },
  { variables } = {}
) => {
  if (!process.env.NEXT_PUBLIC_STRAPI_API_URL) {
    console.error(
      "NEXT_PUBLIC_STRAPI_API_URL environment variable is not set!"
    );
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: "POST",
    headers: R.unless(
      () => R.isNil(process.env.STRAPI_API_KEY),
      (headers) =>
        R.assoc(
          "Authorization",
          `Bearer ${process.env.STRAPI_API_KEY}`,
          headers
        )
    )({
      "Content-Type": "application/json",
    }) as Record<string, string>,
    body: JSON.stringify({
      query,
      mutation,
      variables,
    }),
  });

  if (!res.ok) {
    console.error(await res.text());
  }

  return res.json();
};
