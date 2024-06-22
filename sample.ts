import createClient from "openapi-fetch";
import type { components, paths } from "./sample.openapi";

const client = createClient<paths>({
  baseUrl: "http://127.0.0.1:3658/m1/521257-481419-default",
});

async function normal() {
  const { data, error } = await client.GET("/normal", {});
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    if (data.type === "anonymouse") {
      console.log(data.foo);
    } else if (data.type === "user") {
      console.log(data.bar);
    }
  } else {
    console.log("data is undefined");
  }
}

function isIndividual(
  data:
    | components["schemas"]["IndividualUser"]
    | components["schemas"]["CorporateUser"],
) {
  return data.type === "Individual";
}

function isCorporate(
  data:
    | components["schemas"]["IndividualUser"]
    | components["schemas"]["CorporateUser"],
) {
  return data.type === "Corporate";
}

async function useSchema() {
  const { data, error } = await client.GET("/schema", {});
  if (error) {
    console.error(error);
    return;
  }

  if (data) {
    if (isIndividual(data)) {
      console.log(data.nickname);
    } else if (isCorporate(data)) {
      console.log(data.company_name);
    }
  } else {
    console.log("data is undefined");
  }
}
